import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}`,
    };
}

const ChatBar = ({ socket }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])

    return (
        <div className='chat__sidebar'>
            <h2>Open Chat</h2>
            <Stack direction='row' spacing={2}>
                {users.map(user => {
                    <StyledBadge
                        key={user.socketID}
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar {...stringAvatar(String(user.userName))} />
                    </StyledBadge>
                })}
                <Avatar {...stringAvatar('Cu Son')} />
                <Avatar {...stringAvatar('Chung Tu')} />
                <Avatar  {...stringAvatar('Nhat Anh')} />
            </Stack>
            <div>
                <h4 className='chat__header'>ACTIVE USERS</h4>

                <div className='chat__users'>
                    {users.map(user => <p key={user.socketID}>{user.userName}</p>)}
                </div>

            </div>
        </div>
    )
}

export default ChatBar