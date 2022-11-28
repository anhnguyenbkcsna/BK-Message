import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './components/Chat/ChatPage';
// import socketIO from 'socket.io-client';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import ForgetPass from './components/ForgetPassword';
import UserList from './components/Chat/UserList';
// const socket = socketIO.connect('http://localhost:4000');
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/home" element={<UserList />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:username" element={<ChatPage />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/ForgetPassword' element={<ForgetPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;