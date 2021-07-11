import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const AuthState = (props) => {
  const [userAuth, setUserAuth] = useState("");
  const [token, setToken] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  const login = async (user) => {
    setIsLoaded(false);
    const res = await axios.post(
     "https://oceanicadeseguros.com/asg-api/login",
      // "https://segurospiramide.com/asg-api/login",
      user
    );
    await sessionStorage.setItem("DATA_DASH", JSON.stringify(res.data));     
    setUserAuth(JSON.parse(sessionStorage.getItem("DATA_DASH")).user.PORTAL_USERNAME);
    setIsLoaded(true);
    console.log(res);
  };

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("DATA_DASH"))) {
      setUserAuth(
        JSON.parse(sessionStorage.getItem("DATA_DASH")).user.PORTAL_USERNAME
      );
      setIsLoaded(true);
    }
  }, [userAuth]);

  return (
    <div>
      {!isLoaded ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "80vh",
            alignItems: "center",
          }}
      
        >
          <CircularProgress
            style={{
              color: "#47c0b6"
            }} />
        </div>
      ) : (
        <AuthContext.Provider
          value={{
            login,
            userAuth,
            setUserAuth,
            token,
          }}
        >
          {props.children}
        </AuthContext.Provider>
      )}
    </div>
  );
};

export default AuthState;
