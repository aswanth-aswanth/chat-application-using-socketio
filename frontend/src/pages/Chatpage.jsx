import { useRef, useState, useEffect, useContext } from "react";
import "./Chatpage.css";
import MyContext from "../../context/AuthContext";
import SendIcon from "@mui/icons-material/Send";

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
      // console.log(samplemsg);
      // console.log(roomID);
      console.log(activeUser);
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
      {true ? (
        <div className="padded-container">
          <div className="chat-container">
            <div className="leftbar"></div>
            <div className="groups">
              <h1 className="group-heading">Groups</h1>
              <div className="group3" onClick={() => handleClick(1)}>
                <img src="" alt="" className="group-img" />
                <div className="group-description-container">
                  <h3 className="groupname">Group 1</h3>
                  <p className="group-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Unde
                  </p>
                </div>
              </div>
              <div className="group3" onClick={() => handleClick(2)}>
                <img src="" alt="" className="group-img" />
                <div className="group-description-container">
                  <h3 className="groupname">Group 2</h3>
                  <p className="group-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Unde
                  </p>
                </div>
              </div>
              <div className="group3" onClick={() => handleClick(3)}>
                <img src="" alt="" className="group-img" />
                <div className="group-description-container">
                  <h3 className="groupname">Group 3</h3>
                  <p className="group-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Unde
                  </p>
                </div>
              </div>
              <div className="group3" onClick={() => handleClick(4)}>
                <img src="" alt="" className="group-img" />
                <div className="group-description-container">
                  <h3 className="groupname">Group 4</h3>
                  <p className="group-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Unde
                  </p>
                </div>
              </div>
              <div className="group3" onClick={() => handleClick(5)}>
                <img src="" alt="" className="group-img" />
                <div className="group-description-container">
                  <h3 className="groupname">Group 5</h3>
                  <p className="group-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Unde
                  </p>
                </div>
              </div>
            </div>
            <div className="chatscreen-container1">
              <div className="chatscreen_container">
                <div className="chatscreen">
                  <div className="chatscreen2">
                    <div className="activegroup">
                      <img src="" alt="" className="group-img2" />
                      <div className="group-description-container2">
                        <h3 className="groupname2">Group 1</h3>
                        <p className="group-description2">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Unde
                        </p>
                      </div>
                    </div>
                    <ul className="chatbox">
                      {messages[roomID]?.map((data, id) => (
                        <div key={id} className="eachchat">
                          <img src="" alt="" className="chatimg" />
                          <div>
                            <div className="currentUser">{currentUser}</div>
                            <li>{data}</li>
                          </div>
                        </div>
                      ))}
                    </ul>
                    <div className="chatscreen-input-container">
                      <input
                        type="text"
                        className="chatscreen_input"
                        ref={message}
                        placeholder="Type your message here"
                      />
                      <button
                        className="chatscreen_btn"
                        onClick={handleMessage}
                      >
                        <SendIcon style={{ width: "18px", height: "18px" }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
