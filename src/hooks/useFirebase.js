import initializeAuthentication from "../firebase/firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(false);

  const auth = getAuth();
  const handlePasswordLogin = (name, email, password, history) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setError("");

        const newUser = { email, name: name };
        setUser(newUser);
        addUserToDB(email, name);

        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {
            setError(error.mesage);
          });
        history.push("/login");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogIn = (email, password, history, location) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        history.replace(location?.state?.from || "/home");
        setUser(user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleLogOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setError(error.mesage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const addUserToDB = (email, name) => {
    const currentUser = { email, name };
    fetch(`https://car-house-server-side.herokuapp.com/adduser`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(currentUser),
    });
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, []);

  useEffect(() => {
    fetch(`https://car-house-server-side.herokuapp.com/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data?.role);
      });
  }, [user.email]);

  return {
    handlePasswordLogin,
    isLoading,
    user,
    handleLogOut,
    error,
    setError,
    handleLogIn,
    admin,
  };
};

export default useFirebase;
