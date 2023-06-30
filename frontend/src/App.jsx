import { useContext } from "react";
import Firstpage from "./pages/Firstpage.jsx";
import Chatpage from "./pages/Chatpage.jsx";
import MyContext from "../context/AuthContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const { username } = useContext(MyContext);
  // console.log("username : " + username);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={username ? <Chatpage /> : <Firstpage/>} />
          <Route path="/chatpage" element={<Chatpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
