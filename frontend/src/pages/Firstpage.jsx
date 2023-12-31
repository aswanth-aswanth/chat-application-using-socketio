import { useContext, useRef, useEffect } from "react";
import MyContext from "../context/AuthContext";
import { io } from "socket.io-client";
import "./firstpage.css";
function Firstpage() {
  const { setUsername, socket, setSocket } = useContext(MyContext);
  const user = useRef();
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    user.current.focus();
  }, []);
  // Here, when user presses Enter key, handleClick function is invoked
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };
  function handleClick() {
    setUsername(user.current.value);
    socket.emit("newClient", user.current.value);
  }

  return (
    <>
      <div className="firstpage-container">
        <div className="firstpage">
          <input
            className="firstpage_input"
            placeholder="Enter your name"
            onKeyDown={handleKeyPress}
            type="text"
            ref={user}
            required
          />
          <button className="firstpage_button" onClick={handleClick}>
            Enter
          </button>
        </div>
      </div>
    </>
  );
}

export default Firstpage;
