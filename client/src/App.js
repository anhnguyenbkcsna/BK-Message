import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Chat/Home';
import ChatPage from './components/Chat/ChatPage';
// import socketIO from 'socket.io-client';
import Login from './components/SignIn/index'
// const socket = socketIO.connect('http://localhost:4000');
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/chat" element={<ChatPage />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;