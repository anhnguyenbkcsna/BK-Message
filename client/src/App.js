import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './components/Chat/ChatPage';
// import socketIO from 'socket.io-client';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import ForgetPass from './components/ForgetPassword';
import UserList from './components/Chat/UserList';
import VideoCall from './components/Chat/VideoCall';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// const socket = socketIO.connect('http://localhost:4000');
// const theme = createTheme({
//   palette: {
//     primary: "#FFF",
//   },
// });
function App() {
  return (
    // <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/home" element={<UserList />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:username" element={<ChatPage />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/ForgetPassword' element={<ForgetPass />} />
          <Route path='/call' element={<VideoCall />} />
        </Routes>
      </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;