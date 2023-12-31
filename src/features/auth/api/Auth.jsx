import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./client";
import { Spinner } from "../../../components/Spinner";

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
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
      setLoading(false);
    };
    getUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);
      if (event == "PASSWORD_RECOVERY") {
        setAuth(false);
      } else if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setAuth(false);
        setUser(null);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, user, login, updatePassword }}>
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
