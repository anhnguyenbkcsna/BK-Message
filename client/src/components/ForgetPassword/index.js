import React, { useState } from 'react'
import { makeStyles } from "@mui/styles";
import { Button, TextField, FormControl } from '@mui/material'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    postion: 'relative',
    backgroundImage: "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
  },
  formContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  title: {
    color: "#0097FF",
    margin: "20px",
  },
  form: {
    backgroundColor: '#fff',
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    gap: "20px",
    justifyContent:"center",
    width: "500px",
    borderRadius: "25px",
    height: "300px",
  },
  input: {
    width: "70%",
  },
  button: {
    width: "100px",
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
    <div className={styles.formContainer}>
      <FormControl
        className = {styles.form}
          onSubmit={handleSubmit}
      >
      <h1 className={styles.title}>Forget Password</h1>
      <TextField
        className={styles.input}
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
  </div>
  )
}

export default ForgetPass