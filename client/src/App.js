import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Chat/Home';
import ChatPage from './components/Chat/ChatPage';
// import socketIO from 'socket.io-client';

// const socket = socketIO.connect('http://localhost:4000');
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/chat" element={<ChatPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;