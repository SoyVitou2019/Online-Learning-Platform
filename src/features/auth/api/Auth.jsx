import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./client";
import { Spinner } from "../../../components/Spinner";
import END_POINTS from "../../../constants/endpoints";
import axios from "axios";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = async (email, password) =>
  await supabase.auth.signInWithPassword({ email, password });

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
    // setLoading(true);
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
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setRole("");
      }
    };
    getUser();

    let isCallbackExecuted = false;
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (isCallbackExecuted) {
        return;
      }
      isCallbackExecuted = true;
      console.log(event);
      console.log(session);

      if (event === "SIGNED_IN") {
        console.log("sign in");
        // setX(x + 1);

        let userDataFromSup = session.user?.user_metadata ?? {};
        if (Object.keys(userDataFromSup).length !== 0) {
          userDataFromSup.about = "";
          userDataFromSup.uid = session.user.id;
          userDataFromSup.created_at = session.user.created_at;
        }

        axios
          .get(END_POINTS.USER + `?uid=${session.user.id}`)
          .then((response) => {
            // Check if the response has user data

            //check if user not exist in json
            if (response.data.length === 0) {
              setRole(session.user?.user_metadata?.role);
              axios.post(END_POINTS.USER, userDataFromSup).catch((error) => {
                console.log("error post data", error);
              });
            } else {
              //user exist
              setRole(response.data[0].role);
            }
            setUser(session.user);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
        console.log("updated");

        //if not exist than add it to the json server
      } else if (event === "SIGNED_OUT") {
        setRole("");
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ role, user, setUser, login, updatePassword }}
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
