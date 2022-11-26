import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { socket } from '../../services/socket';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    backgroundImage: "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
  },
  userlist: {
    position: 'absolute',
    backgroundColor: "#fff",
    width: "30%",
    height: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: "25px",
  },
  title: {
    color: "#0097FF",
    margin: "20px",
  },
  user: {
    padding: "5px",
  },
  yourname: {
    fontSize: "1.5em",
    color: "#75C8AE",
  },
}))

const UserList = () => {
  const styles = useStyles()
  const [users, setUsers] = useState([])
  // const [isJoined, setIsJoined] = useState(false)
  
  // useEffect(() => {
  //   socket.emit('joined', localStorage.getItem('userName'))
  // }, [isJoined])
  
  // useEffect(() => {
  //   socket.on('joined', data => setUsers(data))
  // }, [])

  useEffect(() => {
      socket.on("newUserResponse", data => setUsers(data))
      // eslint-disable-next-line
  }, [socket, users])

  return (
    <div className={styles.container}>
      <div className={styles.userlist}>
        <h1 className={styles.title}>User List</h1>
        {users.map(user => user.userName !== localStorage.getItem("userName") ?
          <div
            key={user.userName}
            className={styles.user}
          >
            {/* <Button  
              onClick={() => setIsJoined(true)}
            > */}
              <Link to={`/chat/${user.userName}`} style={{textDecoration: "none"}}>
                {user.userName}
              </Link>
          </div> : <div className={styles.you}>
            <p className={styles.yourname}>{user.userName} (you)</p>
          </div>
        )}  
      </div>
    </div>
  )
}

export default UserList;