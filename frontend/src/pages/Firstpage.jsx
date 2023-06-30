import { useContext, useRef, useEffect, useState } from "react";
import MyContext from "../../context/AuthContext";
import { io } from "socket.io-client";

function Firstpage() {
  const { username, setUsername, socket, setSocket } = useContext(MyContext);
  const [uname, setUname] = useState();
  const user = useRef();
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
  }, []);

  function handleClick() {
    setUsername(user.current.value);
    socket.emit("newClient", user.current.value);
  }

  return (
    <>
      <input type="text" ref={user} />
      <button onClick={handleClick}>Enter</button>
    </>
  );
}

export default Firstpage;
