import { useAuth } from "../features/auth/api/Auth";

const SignOut = () => {
  const { signOut } = useAuth();

  return (
    <div className="rounded-full overflow-hidden text-center">
      <div className="bg-red-100 text-gray-700 p-2 px-4">
        <i className="bi bi-box-arrow-left pr-2"></i>
        <button onClick={signOut}>Sign out</button>
      </div>
    </div>
  );
};
export default SignOut;
