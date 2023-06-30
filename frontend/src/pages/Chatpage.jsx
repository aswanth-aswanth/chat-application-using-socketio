import { useRef, useState, useEffect, useContext } from "react";
import "./Chatpage.css";
import MyContext from "../../context/AuthContext";

function Chatpage() {
  const message = useRef();
  const [state, setState] = useState(false);
  const { socket } = useContext(MyContext);
  const [messages, setMessages] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  const [roomID, setRoomID] = useState(null);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("recieveroom", ({ samplemsg, activeUser }) => {
      console.log("inside receive room msg");
      console.log(samplemsg);
      console.log(roomID);

      // Get the current messages for the room or initialize it as an empty array
      const currentRoomMessages = messages[roomID] || [];

      // Push the new message into the array for the specific room
      const newRoomMessages = [...currentRoomMessages, samplemsg];
      console.log(newRoomMessages);

      // Update the state with the new messages object
      setMessages((prevMessages) => ({
        ...prevMessages,
        [roomID]: newRoomMessages,
      }));
      setCurrentUser(activeUser);
    });
  }, [socket, messages, roomID]);

  function handleClick(roomID) {
    setState(true);
    socket.emit("joinRoom", roomID);
    setRoomID(roomID);
    setRoomMessages([]); // Reset roomMessages when joining a new room
  }

  function handleMessage() {
    const msg = message.current.value;
    socket.emit("chatmessage", msg);
    message.current.value = "";
  }

  return (
    <>
      {state ? (
        <div className="chatscreen_container">
          <div className="Chatscreen">
            <ul>
              {messages[roomID]?.map((data, id) => (
                <div key={id}>
                  <div className="currentUser">{currentUser}</div>
                  <li>{data}</li>
                </div>
              ))}
            </ul>
          </div>
          <input type="text" ref={message} />
          <button onClick={handleMessage}>send</button>
        </div>
      ) : (
        <>
          <h1>Chatpage</h1>
          <button onClick={() => handleClick(1)}>Join room1</button>
          <button onClick={() => handleClick(2)}>Join room2</button>
          <button onClick={() => handleClick(3)}>Join room3</button>
          <button onClick={() => handleClick(4)}>Join room4</button>
          <button onClick={() => handleClick(5)}>Join room5</button>
        </>
      )}
    </>
  );
}

export default Chatpage;

// import { useRef, useState, useEffect, useContext } from "react";
// import "./Chatpage.css";
// import MyContext from "../../context/AuthContext";
// function Chatpage() {
//   const message = useRef();
//   const [state, setState] = useState(false);
//   const { socket } = useContext(MyContext);
//   const [messages, setMessages] = useState({});
//   const [currentUser, setCurrentUser] = useState("");
//   // const [RoomID,setRoomID]=useState(null);
//   let roomMessages, RoomID;
//   useEffect(() => {
//     if (!socket) {
//       return;
//     }

//     socket.on("recieveroom", ({ samplemsg, activeUser }) => {
//       console.log("inside receive room msg");
//       console.log(samplemsg);
//       console.log(RoomID);

//       // Get the current messages for the room or initialize it as an empty array
//       roomMessages = messages[RoomID] || [];

//       // Push the new message into the array for the specific room
//       roomMessages.push(samplemsg);
//       console.log(roomMessages);

//       // Update the state with the new messages object
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [RoomID]: roomMessages,
//       }));
//       setCurrentUser(activeUser);
//     });
//   }, [socket, messages, roomMessages]);
//   function handleClick(roomID) {
//     setState(() => !state);
//     socket.emit("joinRoom", roomID);
//     RoomID = roomID;
//   }
//   function handleMessage() {
//     const msg = message.current.value;
//     socket.emit("chatmessage", msg);
//     message.current.value = "";
//   }
//   return (
//     <>
//       {state ? (
//         <div className="chatscreen_container">
//           <div className="Chatscreen">
//             <ul>
//               {messages[RoomID]?.map((data, id) => {
//                 console.log(currentUser);
//                 return (
//                   <div key={id}>
//                     <div className="currentUser">{currentUser}</div>
//                     <li>{data}</li>
//                   </div>
//                 );
//               })}
//               {/* {messages.map((data, id) => {
//                 console.log(currentUser);
//                 return (
//                   <div key={id}>
//                     <div className="currentUser">{currentUser}</div>
//                     <li>{data}</li>
//                   </div>
//                 );
//               })} */}
//             </ul>
//           </div>
//           <input type="text" ref={message} />
//           <button onClick={handleMessage}>send</button>
//         </div>
//       ) : (
//         <>
//           <h1>Chatpage</h1>
//           <button onClick={() => handleClick(1)}>Join room1</button>
//           <button onClick={() => handleClick(2)}>Join room2</button>
//           <button onClick={() => handleClick(3)}>Join room3</button>
//           <button onClick={() => handleClick(4)}>Join room4</button>
//           <button onClick={() => handleClick(5)}>Join room5</button>
//         </>
//       )}
//     </>
//   );
// }

// export default Chatpage;
