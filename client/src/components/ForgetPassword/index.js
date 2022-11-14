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
}))

const ForgetPass = () => {
  const styles = useStyles();
  const [userName, setUserName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!userName.includes('@')){
      alert("Please use valid email address")
    }
    else 
    alert(`New password have been sent to ${userName}` )
  }
return (
  <div className={styles.container}>
    <FormControl
      className = {styles.form}
        onSubmit={handleSubmit}
    >
    <h1 >Forget Password</h1>
    <TextField
      type="text"
      id="username"
      name="username"
      value={userName}
      label="Your gmail"
      variant="outlined"
      onChange={e => setUserName(e.target.value)}
    />
      <Button variant="contained" color="success" onClick={handleSubmit}>Enter</Button>
    </FormControl>
  </div>
  )
}

export default ForgetPass