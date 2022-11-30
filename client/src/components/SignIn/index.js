import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Button, TextField, FormControl, Link } from "@mui/material";
import { socket } from "../../services/socket";
import Logo from "../../assets/BKMessenger.png";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    postion: "relative",
    backgroundImage:
      "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
  },
  formContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  logo: {
    maxWidth: "100px",
    marginTop: "25px",
  },
  title: {
    color: "#0097FF",
    marginBottom: "10px",
  },
  form: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    justifyContent: "center",
    width: "500px",
    borderRadius: "25px",
  },
  input: {
    width: "70%",
  },
  button: {
    width: "100px",
  },
}));

const SignIn = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.length > 0) {
      localStorage.setItem("userName", userName);
      socket.emit("newUser", { userName, socketID: socket.id });
      navigate("/home");
    }
  };
  return (
    <div className={styles.container}>
      {/* <div className={styles.formContainer}>dawd</div> */}
      <div className={styles.formContainer}>
        <FormControl className={styles.form} onSubmit={handleSubmit}>
          <img className={styles.logo} src={Logo} alt="logo" />
          <h1 className={styles.title}> BK Message</h1>
          <TextField
            className={styles.input}
            type="text"
            id="username"
            name="username"
            value={userName}
            label="Username"
            variant="outlined"
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            className={styles.input}
            type="password"
            id="password"
            name="password"
            value={passWord}
            label="Password"
            variant="outlined"
            onChange={(e) => setPassWord(e.target.value)}
          />
          <Button
            className={styles.button}
            variant="contained"
            color="success"
            onClick={handleSubmit}
          >
            Enter
          </Button>
          <Link href="signup" underline="hover" className={styles.link}>
            Create account
          </Link>
          <Link
            href="forgetpassword"
            underline="hover"
            className={styles.link}
            sx={{ marginBottom: "25px" }}
          >
            Forget Password
          </Link>
        </FormControl>
      </div>
    </div>
  );
};

export default SignIn;
