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
  const [loading, setLoading] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;

      setUser(currentUser ?? null);

      //if user exist set role state
      if (user) {
        try {
          const response = await axios.get(END_POINTS.USER + `?uid=${user.id}`);
          setRole(response.data[0].role);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setRole("");
      }

      setLoading(false);
    };
    getUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);

        let userDataFromSup = session.user?.user_metadata ?? {};
        if (Object.keys(userDataFromSup).length !== 0) {
          userDataFromSup.uid = session.user.id;
        }
        console.log(userDataFromSup);

        axios
          .get(END_POINTS.USER + `?uid=${session.user.id}`)
          .then((response) => {
            // Check if the response has user data

            //check if user not exist in json
            if (Object.keys(response.data).length === 0) {
              axios.post(END_POINTS.USER, userDataFromSup).catch((error) => {
                console.log("error post data", error);
              });
              setRole(session.user?.user_metadata?.role);
            } else {
              //user exist

              setRole(response.data[0].role);
            }
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
    <AuthContext.Provider value={{ role, user, login, updatePassword }}>
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
