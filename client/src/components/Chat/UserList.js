import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { socket } from '../../services/socket';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  user: {
    padding: "10px",
    backgroundColor: '#daadaa',
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
      <h1>User List</h1>
      {users.map(user => user.userName !== localStorage.getItem("userName") ?
        <div
          key={user.userName}
          className={styles.user}
        >
          {/* <Button  
            onClick={() => setIsJoined(true)}
          > */}
            <Link to={`/chat/${user.userName}`}>
              {user.userName}
            </Link>
          {/* </Button> */}
        </div> : null
      )}  
    </div>
  )
}

export default UserList;