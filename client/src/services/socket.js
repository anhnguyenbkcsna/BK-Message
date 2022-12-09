import io from "socket.io-client";

// const SOCKET_URL = `http://localhost:4000`;
const SOCKET_URL = `http://localhost:4000/`

// const SOCKET_URL = `http://10.9.9.217:2021`;

export const socket = io(SOCKET_URL);