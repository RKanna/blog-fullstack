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
  const [userId, setUserId] = useState();
  const router = useRouter();

  // useEffect(() => {
  //   const storedUserEmail = localStorage.getItem("userEmail");
  //   if (storedUserEmail) {
  //     setUserEmail(storedUserEmail);
  //   }
  // }, []);

  // const updateUserEmail = (newEmail) => {
  //   localStorage.setItem("userEmail", newEmail);
  //   setUserEmail(newEmail);
  // };

  const updateUser = (userId, newEmail) => {
    localStorage.setItem("userId", userId);
    setUserId(userId);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch("http://localhost:3001/login", {
      const response = await fetch("http://13.60.12.79:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      console.log(result);

      if (result.success) {
        const { _id, userEmail } = result;
        updateUser(_id, userEmail);
        router.push("/");
        toast("Login Success");
      } else if (result.error === "The password is incorrect") {
        window.alert("Password is incorrect");
      } else if (result.error === "The Email is not Registered with us") {
        window.alert("Email is Not Registered");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
    router.push("/Login");
    toast("Logout Done");
  };

  //for getting UserName using UserId
  const fetchUserName = async (userId) => {
    try {
      const response = await fetch(
        // `http://localhost:3001/api/v1/users/${userId}`
        `http://13.60.12.79:3001/api/v1/users/${userId}`
      );
      const result = await response.json();

      if (result.success) {
        const { userName } = result.data;
        setUserName(userName);
        console.log("User Name:", userName);
      } else {
        console.error("Error fetching user:", result.message);
      }
    } catch (error) {
      // console.error("Fetch error:", error);
    }
  };
  fetchUserName(userId);

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
        handleLogout,
        encryptedPassword,
        setEncryptedPassword,
        handleSignIn,
        userId,
        setUserId,
        fetchUserName,
        userName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
