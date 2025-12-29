import './App.css';
import { MyContext } from './MyContext.jsx';
import { useState } from 'react';
import { v1 as uuidv1 } from "uuid";
import AppRoutes from "./Routes.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [allThreads, setAllThreads] = useState([]);
  const [prevChats, setPrevChats] = useState([]);
  const [currThreadId, setcurrThreadId] = useState(uuidv1());
  const [newChat, setNewChat] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);

  const providerValues = {
    isAuthenticated,
    setIsAuthenticated,

    allThreads,
    setAllThreads,

    prevChats,
    setPrevChats,

    currThreadId,
    setcurrThreadId,

    newChat,
    setNewChat,

    prompt,
    setPrompt,

    reply,
    setReply,
  };

  return (
    <MyContext.Provider value={providerValues}>
      <AppRoutes />
    </MyContext.Provider>
  );
}

export default App;


// import "./App.css";
// import { useState } from "react";
// import { v1 as uuidv1 } from "uuid";
// import AppRoutes from "./Routes.jsx";
// import { MyContext } from "./MyContext.jsx";
// import RefreshHandler from "./RefreshHandler.jsx";

// function App() {
//   const [prompt, setPrompt] = useState("");
//   const [reply, setReply] = useState(null);
//   const [currThreadId, setCurrThreadId] = useState(uuidv1());
//   const [prevChats, setPrevChats] = useState([]);
//   const [newChat, setNewChat] = useState(true);
//   const [allThreads, setAllThreads] = useState([]);

//   const providerValues = {
//     prompt,
//     setPrompt,
//     reply,
//     setReply,
//     currThreadId,
//     setCurrThreadId,
//     newChat,
//     setNewChat,
//     prevChats,
//     setPrevChats,
//     allThreads,
//     setAllThreads,
//   };

//   return (
//     <>
//       {/* Handles refresh + redirect */}
//       <RefreshHandler />

//       {/* Context available to routes */}
//       <MyContext.Provider value={providerValues}>
//         <AppRoutes />
//       </MyContext.Provider>
//     </>
//   );
// }

// export default App;
