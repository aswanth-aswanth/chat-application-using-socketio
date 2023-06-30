import { useContext, useState, createContext } from "react";
// const username="";
const MyContext=createContext("");
export const MyContextProvider=({children})=>{
    const [username,setUsername]=useState("");
    const [socket, setSocket] = useState(null);
    return(
        <MyContext.Provider value={{username,setUsername,socket,setSocket}}>
            {children}
        </MyContext.Provider>
    );
};
export default MyContext;