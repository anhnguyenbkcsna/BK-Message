import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  FormControl,
  Link,
  Card,
  title,
  Box,
  Grid,
} from "@mui/material";
import { socket } from "../../services/socket";
import { Container } from "@mui/system";

const useStyles = makeStyles(() => ({}));

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
      navigate("/chat");
    }
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={6} md={8}>
          <Item>xs=6 md=8</Item>
        </Grid>
      </Grid>
    </div>
    // <div className={styles.container}>
    //   <Card>

    //   </Card>
    //   <FormControl onSubmit={handleSubmit}>
    //     <h1>LOGIN</h1>
    //     <TextField
    //       type="text"
    //       id="username"
    //       name="username"
    //       value={userName}
    //       label="Username"
    //       variant="outlined"
    //       onChange={(e) => setUserName(e.target.value)}
    //     />
    //     <TextField
    //       type="password"
    //       id="password"
    //       name="password"
    //       value={passWord}
    //       label="Password"
    //       variant="outlined"
    //       onChange={(e) => setPassWord(e.target.value)}
    //     />
    //     <div>
    //       <Link href="signup" underline="hover">
    //         Create account
    //       </Link>
    //       <Link href="forgetpassword" underline="hover">
    //         Forget Password
    //       </Link>
    //     </div>
    //     <Button variant="contained" color="success" onClick={handleSubmit}>
    //       Enter
    //     </Button>
    //   </FormControl>
    // </div>
  );
};

export default SignIn;
