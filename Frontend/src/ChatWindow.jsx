const API_URL = import.meta.env.VITE_API_URL;
import './ChatWindow.css';
import Chat from './Chat.jsx';
import { MyContext } from './MyContext.jsx';
import { useContext,useState,useEffect } from 'react';

import {ScaleLoader} from 'react-spinners';

import SpeechRecognition,{useSpeechRecognition} from 'react-speech-recognition';

import { useNavigate } from "react-router-dom";





function ChatWindow(){
    const {prompt,setPrompt,reply,setReply,currThreadId,setPrevChats,setNewChat, isAuthenticated, setIsAuthenticated,} = useContext(MyContext);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const [isOpen,setIsOpen] = useState(false); //set default false
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/", { replace: true });
        }
        }, [navigate]);




        const handleLogout = () => {
            localStorage.removeItem("token");

            setPrevChats([]);
            setPrompt("");
            setReply("");
            setNewChat(true);

            setIsAuthenticated(false);
            navigate("/login", { replace: true });
            };


     
    const getReply = async() =>{
        setLoading(true);
        setNewChat(false);
        console.log("message : ",prompt," threadId ",currThreadId);
        const options = {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
            body:JSON.stringify({
                message:prompt,
                threadId:currThreadId
            })
        };

        try{
    
            const response = await fetch(`${API_URL}/api/chat`,options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        }catch(err){
            console.log(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!prompt || !reply) return;

        setPrevChats(prev => [
            ...prev,
            {
            role: "user",
            content: prompt,
            },
            {
            role: "assistant",
            content: reply,
            },
        ]);

        setPrompt("");
        }, [reply]);

   


    const handleProfileClick = ()=>{
        setIsOpen(!isOpen);
    }

    
  const getText = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    }
  };

  
  useEffect(() => {
    if (transcript) {
      setPrompt(transcript);
    }
  }, [transcript]);

  const stopMic = () => {
  SpeechRecognition.stopListening();
  resetTranscript();
  setPrompt(""); // optional: also clear your input box
};




    return (
       <div className='chatWindow'>
        <div className="navbar">
            <span>SmartGPT &nbsp; <i className="fa-solid fa-chevron-down"></i></span>
            <div className="userIcondiv" onClick={handleProfileClick}>
               <span className='userIcon'> <i className="fa-solid fa-user"></i></span>
            </div>
        </div>
        {
            isOpen &&
            <div className="dropDown">
               
                <div className="dropDownItem"><i className="fa-solid fa-gear"></i>Settings</div>
                 
                <div className="dropDownUser"> <div className="userName">User</div>
                    <div className="userEmail"></div>
                </div>  
                <div className="dropDownItem" onClick={handleLogout}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
                </div>
                
            </div>
        }

        <Chat></Chat>
        <ScaleLoader color='#fff' loading={loading}></ScaleLoader>

        <div className="chatInput">
            <div className="inputBox">
                <input placeholder='Ask anything' value={prompt} 
                onChange={(e)=> setPrompt(e.target.value)}
                onKeyDown={(e)=>e.key ==='Enter'?getReply():''}/>
                
                 
                <div id="mic" onClick={getText}><i className={`fa-solid fa-microphone ${listening ? "listening" : ""}`}></i></div>
                {/* Stop mic button */}
                    {listening && (
                    <div id="stopMic" onClick={stopMic}>
                        <i className="fa-solid fa-square"></i>
                    </div>
                    )}
                <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
            </div>
            

            <p className='info'>SmartGPT can make mistakes.Check important info.See Cookie Preferences.</p>
        </div>
       </div>
    )
}

export default ChatWindow;