import { useRef, useState, useEffect, useContext } from "react";
import "./Chatpage.css";
import MyContext from "../context/AuthContext";
import SendIcon from "@mui/icons-material/Send";
import { groupsDetails } from "../data/groupsDetails";
import useChatActions from "../hooks/useChatActions"; // custom hook

function Chatpage() {
  const message = useRef();
  const { socket, username } = useContext(MyContext);
  const [messages, setMessages] = useState({});
  const [roomID, setRoomID] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const { handleKeyPress, handleGroupClick, handleMessage } = useChatActions(
    message,
    socket,
    isActive,
    setIsActive,
    setRoomID,
    messages,
    setMessages,
    roomID
  );
  // If the user clicks on any group, then the input will be focused :- for better user experience
  useEffect(() => {
    if (isActive) {
      message.current.focus();
    }
  }, [isActive]);

  return (
    <>
      <div className="padded-container">
        <div className="chat-container">
          <div className="flex-item1">
            {/* Black bar on the left most side */}
            <div className="leftbar"></div>
            {/* Left group lists section */}
            <div className="groups">
              <h1 className="group-heading">Groups</h1>
              {groupsDetails.map((item) => (
                <div
                  className={`group3 ${isActive === item.id ? "active" : ""}`}
                  key={item.id}
                  onClick={(e) => handleGroupClick(item.id)}
                >
                  <img
                    src={`/assets/${item.img}`}
                    alt=""
                    className="group-img"
                  />
                  <div className="group-description-container">
                    <h3 className="groupname">{item.name}</h3>
                    <p className="group-description">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Main chat screen section  */}
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
              {/* If the user didn't click any group, then display this */}
              {!isActive && (
                <div className="start_typing">
                  Enter into a group and start typing
                </div>
              )}
              {/* Each group conversation */}
              <ul className="chatbox">
                {/* User is only allowed to send messages if he clicked on any group */}
                {isActive &&
                  messages[roomID]?.map((data, id) =>
                    // Here the current user messages is show on right and other user messages will be shown on left with images and name
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
                {/* If the user didn't click any group, then the input is disabled */}
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
    </>
  );
}

export default Chatpage;
