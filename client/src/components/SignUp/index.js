import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Button, TextField, FormControl, Link } from "@mui/material";
import { socket } from "../../services/socket";

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
    margin: "20px",
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
    height: "550px",
  },
  input: {
    width: "70%",
  },
  button: {
    width: "100px",
  },
}));

const SignUp = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [userName, setUserName] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (password !== confirmPassword && confirmPassword) setError(true);
    else setError(false);
  }, [password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gmail.includes("@")) {
      alert("Please use valid email address");
    } else if (password !== confirmPassword) {
      alert("Please confirm your password");
    } else if (userName.length > 0) {
      localStorage.setItem("userName", userName);
      socket.emit("newUser", { userName, socketID: socket.id });
      navigate("/chat");
    }
    setUserName("");
    setGmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <FormControl className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Sign Up</h1>
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
            type="text"
            id="gmail"
            name="gmail"
            value={gmail}
            label="Gmail"
            variant="outlined"
            onChange={(e) => setGmail(e.target.value)}
          />
          <TextField
            className={styles.input}
            type="password"
            id="password"
            name="password"
            value={password}
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            className={styles.input}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            label="Password"
            variant="outlined"
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error}
          />
          <Button
            className={styles.button}
            variant="contained"
            color="success"
            onClick={handleSubmit}
          >
            Enter
          </Button>
        </FormControl>
      </div>
    </div>
  );
};

export default SignUp;
