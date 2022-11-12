import React, { useState } from 'react';
// import makeStyle from '@mui/styles';
import { Avatar } from '@mui/material';

// const useStyles = makeStyle(() => {

// });

const stringToColor = (string) => {
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
const stringAvatar = (name) => {
  return {
      sx: {
          bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}`,
  };
}
const UserAvatar = (props) => {
  // const styles = useStyles(); 

  return (
    <Avatar
      {...stringAvatar(props.name)}
    />
  )
}

export default UserAvatar;