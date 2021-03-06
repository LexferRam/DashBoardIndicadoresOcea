import React, { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext/AuthContext";
import Paper from "@material-ui/core/Paper";
import Logo from "../img.png";
import HttpsIcon from "@material-ui/icons/Https";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Alert from "./Alerta"
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
    width: "100%",
  },
  text: {
    marginBottom: 25,
  },
  btn: {
    // marginBottom: 30,
    borderRadius: "50px !important",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const { login, userAuth,setUserAuth } = useContext(AuthContext);
  const [user, setUser] = useState({ p_portal_username: "", p_pwd: "" });
  const [open, setOpen] = React.useState(false); 
  const [msn, setMsn] = React.useState(""); 

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
     // login(user);
      // props.history.push("/app");

      try{
        // setIsLoaded(false);
        const res = await axios.post(
          "https://segurospiramide.com/asg-api/login",
          user
        );
      await sessionStorage.setItem("DATA_DASH", JSON.stringify(res.data));
      setUserAuth(JSON.parse(sessionStorage.getItem("DATA_DASH")).user.PORTAL_USERNAME);
      // setIsLoaded(true);
      props.history.push("/app")
    } catch (error) {
      if (error.response) {
        if (error.response.status == 400) {
          setOpen(true);
          setMsn("Usuario o Contraseña incorrecta")
          props.history.push("/");
        } else {
          // props.history.push("/app");
          console.log(error)
        }
      } else if (error.request) {
        return error.request
      } else {
        return error.message
      }
    };

  };

  return (
    <div className="fondo">
      <Alert open={open} setOpen={setOpen} handleClose={handleClose} msn={msn}/>
      <Fade in={true} timeout={2000}>
      <div id="formLogin" style={{ display: "grid", placeItems:"center", marginTop:"9%"}}>
     
         
          <form onSubmit={onSubmit} noValidate style={{ display: "flex", justifyContent: "center",alignItems:"center", flexDirection:"column", width:"330px" }} >
            

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%"
              }}
            >
            <div style={{ display: "grid", placeItems: "center" }}>
              <HttpsIcon fontSize="large" style={{ color: "#47c0b6" }} />
              <img src={Logo} style={{ width: 180, marginTop: 10,marginLeft: -15 }} />
            </div>
              <div  style={{ marginTop: "35px", width: "100%", }}>
              <TextField
                label="Nombre de Usuario"
                type="text"
                variant="outlined"
                name="p_portal_username"
                onChange={onChange}
                // color="primary"
                // className={classes.root}
                style={{ width: "100%" }}
              />
              </div>
              <div style={{ marginTop: "20px", marginBottom: 30,width: "100%", }}>
              <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                name="p_pwd"
                // color="primary"
                onChange={onChange}
                // className={`${classes.root} ${classes.text}`}
                style={{ width: "100%" }}
              />
              </div>
              <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.btn}
                 style={{backgroundColor:"#47c0b6" , marginBottom: 30, borderRadius: "50% !important",width: "100%"}}
              >
                Ingresar
              </Button>
              </div>
            </div>
          </form>
      </div>
      </Fade>
    </div>
  );
};

export default Login;
