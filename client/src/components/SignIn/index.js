import React, { useState } from 'react'
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom"
import { Button, TextField, FormControl, Link } from '@mui/material'
import { socket } from '../../services/socket';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
  },
  form: {
    margin: "0 auto",
    backgroundColor:"#AEBDCA",
    alignItems: 'center',
    display: "flex",
    justifyContent:"center",
    minHeight:"50vh",
    width: "50vw",
    flexDirection: 'column',
    gap: "20px",
  },
  accountProblems: {
    width: "35%",
    display: "flex",
    gap: "20%",
  },
}))

const SignIn = () => {
  const styles = useStyles();
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [passWord, setPassWord] = useState("")
const handleSubmit = (e) => {
    e.preventDefault()
    if (userName.length > 0) {
        localStorage.setItem("userName", userName)
        socket.emit("newUser", { userName, socketID: socket.id })
        navigate("/home")
    }
}
return (
  <div className={styles.container}>
    <FormControl
      className = {styles.form}
        onSubmit={handleSubmit}
    >
    <h1 > Sign In Chat App chua co cai password</h1>
    <TextField
        type="text"
        id="username"
        name="username"
        value={userName}
        label="Username"
        variant="outlined"
        onChange={e => setUserName(e.target.value)}
    />
      <TextField
          type="password"
          id="password"
          name="password"
          value={passWord}
          label="Password"
          variant="outlined"
          onChange={e => setPassWord(e.target.value)}
      />
      <div className={styles.accountProblems}>
      <Link href="signup" underline="hover">
        Create account
      </Link>
      <Link href="forgetpassword" underline="hover">
        Forget Password
      </Link>
      </div>
      <Button variant="contained" color="success" onClick={handleSubmit}>Enter</Button>
    </FormControl>
  </div>
  )
}

export default SignIn