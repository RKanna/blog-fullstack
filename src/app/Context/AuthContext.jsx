import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [userEmail, setUserEmail] = useState();
  const router = useRouter();

  // useEffect(() => {
  //   const storedUserEmail = localStorage.getItem("userEmail");
  //   if (storedUserEmail) {
  //     setUserEmail(storedUserEmail);
  //   }
  // }, []);

  const updateUserEmail = (newEmail) => {
    localStorage.setItem("userEmail", newEmail);
    setUserEmail(newEmail);
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    router.push("/Login");
    toast("Logout Done");
  };

  return (
    <AuthContext.Provider
      value={{
        userName,
        setUserName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        userEmail,
        setUserEmail,
        updateUserEmail,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
