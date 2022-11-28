import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import UserAvatar from './UserAvatar';
import { socket } from '../../services/socket';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
            key: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const ChatBar = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        socket.on('availableUser', data => {
            // users.push(data)
            // console.log(window.localStorage.getItem('users'));
        })
    }, [])

    useEffect(() => {
        socket.on("newUserResponse", data => setUsers(data))
        // eslint-disable-next-line
    }, [socket, users])


    return (
        <div className='chat__sidebar'>
            <h2>Online</h2>
            <Stack direction='row' spacing={2}>
                {users.map(user =>
                    <>
                        <StyledBadge
                            key={user.socketID}
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <UserAvatar name={user.userName} />
                        </StyledBadge>
                    </>
                )}
            </Stack>
            {/* <div>
                <h4 className='chat__header'>Offline</h4>
                <div className='chat__users'>
                {users.map(user => user.userName !== localStorage.getItem("userName") ?
                    <div
                        key={user.userName}
                        >
                        <Link to={`/chat/${user.userName}`}>{user.userName}</Link>
                    </div> : null
                )}
                </div>
            </div> */}
        </div>
    )
}

export default ChatBar