import React, { useState, useEffect } from 'react'
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
  input: {},
  accountProblems: {
    width: "40%",
    display: "flex",
    gap: "50px",
  },
}))

const SignUp = () => {
  const styles = useStyles();
  const navigate = useNavigate()
  const [error, setError] = useState(false); 
  const [userName, setUserName] = useState("")
  const [gmail, setGmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    if(password !== confirmPassword && confirmPassword) setError(true)
    else setError(false)
  }, [password, confirmPassword])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!gmail.includes('@')){
      alert("Please use valid email address")
    }
    else if(password !== confirmPassword){
      alert("Please confirm your password");
    }
    else if (userName.length > 0) {
        localStorage.setItem("userName", userName)
        socket.emit("newUser", { userName, socketID: socket.id })
        navigate("/chat")
    }
    setUserName("");
    setGmail("")
    setPassword("")
    setConfirmPassword("")
  }
  return (
    <div className={styles.container}>
      <FormControl
        className = {styles.form}
        onSubmit={handleSubmit}
      >
        <h1 >Sign Up</h1>
        <TextField
          className={styles.input}
          type="text"
          id="username"
          name="username"
          value={userName}
          label="Username"
          variant="outlined"
          onChange={e => setUserName(e.target.value)}
        />
        <TextField
          className={styles.input}
          type="text"
          id="gmail"
          name="gmail"
          value={gmail}
          label="Gmail"
          variant="outlined"
          onChange={e => setGmail(e.target.value)}
        />
        <TextField
            className={styles.input}
            type="password"
            id="password"
            name="password"
            value={password}
            label="Password"
            variant="outlined"
            onChange={e => setPassword(e.target.value)}
            />
        <TextField
            className={styles.input}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            label="Password"
            variant="outlined"
            onChange={e => setConfirmPassword(e.target.value)}
            error={error}
        />
        <Button variant="contained" color="success" onClick={handleSubmit}>Enter</Button>
      </FormControl>
    </div>
  )
}

export default SignUp