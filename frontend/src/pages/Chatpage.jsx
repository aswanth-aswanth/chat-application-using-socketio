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
  let currentUser2;

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("recieveroom", ({ samplemsg, activeUser }) => {
      console.log("inside receive room msg");
      console.log(activeUser);
      const currentRoomMessages = messages[roomID] || [];
      const newRoomMessages = [
        ...currentRoomMessages,
        {
          user: activeUser,
          msg: samplemsg,
        },
      ];
      console.log(newRoomMessages);
      currentUser2 = activeUser;
      console.log(currentUser2);
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
            <div className="flex-item1">
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
            </div>
            <div className="flex-item2">
              {/* <div className="chatscreen-container1"> */}
                {/* <div className="chatscreen_container"> */}
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
                              <div className="currentUser">{data.user}</div>
                              <li>{data.msg}</li>
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
                  {/* </div> */}
                {/* </div> */}
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