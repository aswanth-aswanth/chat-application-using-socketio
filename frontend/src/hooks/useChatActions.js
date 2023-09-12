import { useState, useContext, useEffect } from "react";
import MyContext from "../context/AuthContext";

function useChatActions(
  messageRef,
  socket,
  isActive,
  setIsActive,
  setRoomID,
  messages,
  setMessages,
  roomID
) {
  const { username } = useContext(MyContext);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleMessage();
    }
  };

  const handleGroupClick = (roomID) => {
    setIsActive(roomID === isActive ? false : roomID);
    socket.emit("joinRoom", roomID);
    setRoomID(roomID);
  };

  const handleMessage = () => {
    if (messageRef.current.value.trim() !== "" && isActive) {
      const msg = messageRef.current.value;
      socket.emit("chatmessage", msg);
      messageRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("recieveroom", ({ samplemsg, activeUser }) => {
      console.log("inside receive room msg");
      console.log(username);
      const currentRoomMessages = messages[roomID] || [];
      const newRoomMessages = [
        ...currentRoomMessages,
        {
          user: activeUser,
          msg: samplemsg,
        },
      ];
      setMessages((prevMessages) => ({
        ...prevMessages,
        [roomID]: newRoomMessages,
      }));
    });
  }, [socket, messages, roomID]);

  return { handleKeyPress, handleGroupClick, handleMessage };
}

export default useChatActions;
