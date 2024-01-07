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
  const [encryptedPassword, setEncryptedPassword] = useState();
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

  const updateUserName = async (newName) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/users?email=${email}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const userData = await response.json();

      if (userData && userData.userName) {
        localStorage.setItem("userName", userData.userName);
        setUserName(userData.userName);
      } else {
        console.error("User not found or missing userName in response");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
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
        encryptedPassword,
        setEncryptedPassword,
        updateUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
