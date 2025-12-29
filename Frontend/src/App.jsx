import './App.css';
import { MyContext } from './MyContext.jsx';
import { useState } from 'react';
import { v1 as uuidv1 } from "uuid";
import AppRoutes from "./Routes.jsx";
import RefreshHandler from "./RefreshHandler.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setcurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(false);
  const [allThreads, setAllThreads] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setcurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
    isAuthenticated, setIsAuthenticated,
  };

  return (
    <div className="app">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <MyContext.Provider value={providerValues}>
          <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
          <AppRoutes />
        </MyContext.Provider>
      </GoogleOAuthProvider>
    </div>
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
