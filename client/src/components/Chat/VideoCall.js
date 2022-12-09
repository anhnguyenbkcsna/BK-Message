import React, { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import { socket } from '../../services/socket';
import { Grid, Typography, Paper, makeStyles } from '@mui/material';

const VideoCall = () => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };
  return (
    
    <div style={{display: "grid", gridTemplateColumns: '2fr 1fr',
    margin: "0 auto",
    top: '10%',}}>
      <div style={{border: "2px solid #ddd", width: "700px", height: "700px", textAlign: 'center'}}>
        <Grid container >
        {callAccepted && !callEnded && (
        <Paper >
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>Your Friend</Typography>
            <video playsInline ref={userVideo} autoPlay  />
          </Grid>
        </Paper>
      )}
    </Grid>
      </div>
      <div style={{border: "1px solid #ddd", width: "400px", height: "400px", textAlign: 'center'}}>
        {stream && (
          <Paper >
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>{name || 'You'}</Typography>
              <video playsInline muted ref={myVideo} autoPlay />
            </Grid>
          </Paper>
        )}
      </div>
    </div>
  )
}
export default VideoCall