import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./client";
import { Spinner } from "../../../components/Spinner";
import END_POINTS from "../../../constants/endpoints";
import axios from "axios";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = async (email, password) =>
  await supabase.auth.signInWithPassword({ email, password });

const signOut = async () => {
  await supabase.auth.signOut();
};

const updatePassword = async (new_password) =>
  await supabase.auth.updateUser({
    password: new_password,
  });

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  // const [x, setX] = useState(0);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;

      setUser(currentUser ?? null);

      //if user exist set role state
      if (currentUser) {
        try {
          const response = await axios.get(
            END_POINTS.USER + `?uid=${currentUser.id}`
          );
          setRole(response.data[0].role);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setRole("");
        setLoading(false);
      }
    };
    getUser();

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        // setX(x + 1);

        let userDataFromSup = session.user?.user_metadata ?? {};
        if (Object.keys(userDataFromSup).length !== 0) {
          userDataFromSup.about = "";
          userDataFromSup.uid = session.user.id;
          userDataFromSup.created_at = session.user.created_at;
        }

        await axios
          .get(END_POINTS.USER + `?uid=${session.user.id}`)
          .then(async (response) => {
            // Check if the response has user data

            //check if user not exist in json
            if (response.data.length === 0) {
              setLoading(true);
              setRole(session.user?.user_metadata?.role);
              await axios
                .post(END_POINTS.USER, userDataFromSup)
                .catch((error) => {
                  console.log("error post data", error);
                });
              setLoading(false);
            } else {
              setRole(response.data[0].role);
              // Check if there are duplicate records
              setLoading(true);
              while (response.data.length > 1) {
                // Get the id of the duplicate record
                const duplicateUserId = response.data[1].id;

                // Call the delete method from the API
                await axios
                  .delete(`${END_POINTS.USER}/${duplicateUserId}`)
                  .catch((error) => {
                    console.log(
                      `Error deleting user with id ${duplicateUserId}`,
                      error
                    );
                  });

                // Fetch the updated user data
                const updatedResponse = await axios.get(
                  END_POINTS.USER + `?uid=${session.user.id}`
                );
                response = updatedResponse;
              }
              setLoading(false);
            }
            setUser(session.user);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });

        //if not exist than add it to the json server
      } else if (event === "SIGNED_OUT") {
        setRole("");
        setUser(null);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ role, user, setUser, login, updatePassword, signOut }}
    >
      {loading ? (
        <div className="flex justify-center h-screen flex-col items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
