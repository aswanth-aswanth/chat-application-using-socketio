import { useRef, useState, useEffect, useContext } from "react";
import "./Chatpage.css";
import MyContext from "../../context/AuthContext";
import LeftSection from "../components/LeftSection";
import SendIcon from "@mui/icons-material/Send";

function Chatpage() {
  const message = useRef();
  const { socket, username } = useContext(MyContext);
  const [messages, setMessages] = useState({});
  const [roomID, setRoomID] = useState(null);
  const [isActive, setIsActive] = useState(false);

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
  useEffect(() => {
    if (isActive) {
      message.current.focus();
    }
  }, [isActive]);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleMessage();
    }
  };

  function handleClick(roomID) {
    setIsActive(roomID === isActive ? false : roomID);
    socket.emit("joinRoom", roomID);
    setRoomID(roomID);
  }
  function handleMessage() {
    if (message.current.value.trim() !== "" && isActive) {
      const msg = message.current.value;
      socket.emit("chatmessage", msg);
      message.current.value = "";
    }
  }
  return (
    <>
      {true && (
        <div className="padded-container">
          <div className="chat-container">
            <div className="flex-item1">
              <div className="leftbar"></div>
              <div className="groups">
                <h1 className="group-heading">Groups</h1>
                <div
                  className={`group3 ${isActive === 1 ? "active" : ""}`}
                  onClick={(e) => handleClick(1)}
                >
                  <img src="/assets/group1.jpg" alt="" className="group-img" />
                  <div className="group-description-container">
                    <h3 className="groupname">Tech Gurus</h3>
                    <p className="group-description">
                      Connect with tech enthusiasts to discuss the latest trends
                      and innovations
                    </p>
                  </div>
                </div>
                <div
                  className={`group3 ${isActive === 2 ? "active" : ""}`}
                  onClick={() => handleClick(2)}
                >
                  <img src="/assets/group2.jpg" alt="" className="group-img" />
                  <div className="group-description-container">
                    <h3 className="groupname">Wanderlust</h3>
                    <p className="group-description">
                      Join fellow travel enthusiasts to share stories and tips
                      from your adventures
                    </p>
                  </div>
                </div>
                <div
                  className={`group3 ${isActive === 3 ? "active" : ""}`}
                  onClick={() => handleClick(3)}
                >
                  <img src="/assets/group3.jpg" alt="" className="group-img" />
                  <div className="group-description-container">
                    <h3 className="groupname">FitFam</h3>
                    <p className="group-description">
                      Stay motivated and share fitness tips with a community of
                      health enthusiasts
                    </p>
                  </div>
                </div>
                <div
                  className={`group3 ${isActive === 4 ? "active" : ""}`}
                  onClick={() => handleClick(4)}
                >
                  <img src="/assets/group4.jpg" alt="" className="group-img" />
                  <div className="group-description-container">
                    <h3 className="groupname">Book Club</h3>
                    <p className="group-description">
                      Dive into the world of literature with fellow bookworms
                      and discuss your favorite reads
                    </p>
                  </div>
                </div>
                <div
                  className={`group3 ${isActive === 5 ? "active" : ""}`}
                  onClick={() => handleClick(5)}
                >
                  <img src="/assets/group5.jpg" alt="" className="group-img" />
                  <div className="group-description-container">
                    <h3 className="groupname">Creative Hub</h3>
                    <p className="group-description">
                      Connect with artists and writers to share and collaborate
                      on creative projects
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-item2">
              <div className="chatscreen2">
                <div className="activegroup">
                  <img src="/assets/group.png" alt="" className="group-img2" />
                  <div className="group-description-container2">
                    <h3 className="groupname2">Start chatting</h3>
                    <p className="group-description2">
                      Let's kickstart the conversation and start chatting away!
                    </p>
                  </div>
                </div>
                {!isActive && (
                  <div className="start_typing">
                    Enter into a group and start typing
                  </div>
                )}
                <ul className="chatbox">
                  {isActive &&
                    messages[roomID]?.map((data, id) =>
                      username === data.user ? (
                        <div key={id} className="eachchatright">
                          <div>
                            <li className="currentli">{data.msg}</li>
                          </div>
                        </div>
                      ) : (
                        <div key={id} className="eachchat ">
                          <div className="chatimg">
                            {data.user.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="currentUser">{data.user}</div>
                            <li>{data.msg}</li>
                          </div>
                        </div>
                      )
                    )}
                </ul>
                <div className="chatscreen-input-container">
                  <input
                    type="text"
                    className="chatscreen_input"
                    ref={message}
                    placeholder="Type your message here"
                    onKeyDown={handleKeyPress}
                    disabled={!isActive}
                  />
                  <button className="chatscreen_btn" onClick={handleMessage}>
                    <SendIcon style={{ width: "18px", height: "18px" }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatpage;
