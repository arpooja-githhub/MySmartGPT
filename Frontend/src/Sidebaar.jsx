const API_URL = import.meta.env.VITE_API_URL;
import './Sidebar.css';
import { useContext,useEffect } from 'react';
import { MyContext } from './MyContext.jsx';
import {v1 as uuidv1} from "uuid";

const user = JSON.parse(localStorage.getItem("user-info"));

function Sidebar(){
    const {allThreads,setAllThreads,currThreadId,setNewChat,setPrompt,setReply,setcurrThreadId,setPrevChats} = useContext(MyContext);
    // const getAllThreads = async()=>{
    //     try{
    //         // const response = await fetch("http://localhost:8080/api/thread");
    //         const response = await fetch(
    //          `http://localhost:8080/api/thread/${newthreadId}`,
    //         {
    //             headers: {
    //             Authorization: `Bearer ${user.token}`,
    //                     },
    //         }
    //         );

    //     if (!response.ok) {
    //         console.error("Failed to fetch threads. Status:", response.status);
    //         return;
    //     }




    //         const res  =await response.json();
    //         const filteredData  = res.map(thread=>({threadId:thread.threadId,title:thread.title}));
    //         //console.log(filteredData);
    //         setAllThreads(filteredData);
    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    // };



    const getAllThreads = async () => {
  try {
    const response = await fetch(`${API_URL}/api/thread`);

    if (!response.ok) {
      console.error("Failed to fetch threads");
      return;
    }

    const res = await response.json();

    const filteredData = res.map(thread => ({
      threadId: thread.threadId,
      title: thread.title
    }));

    setAllThreads(filteredData); // ✅ ONLY THIS
  } catch (err) {
    console.log(err);
  }
};


    useEffect(()=>{
        getAllThreads();
    },[]);

    const createNewChat = ()=>{
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setcurrThreadId(uuidv1());
        setPrevChats([]);
        
    }


    const changeThread = async(newthreadId)=>{
        setcurrThreadId(newthreadId);
        try{
            const response = await fetch(`${API_URL}/api/thread/${newthreadId}`);
            const res = await response.json();
            console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);

        }catch(err){
            console.log(err);
        }

    }
    
       const deleteThread = async(threadId)=>{
            try{
                // const response = await fetch(`http://localhost:8080/api/thread/${threadId}`,{method:"DELETE"});
                const response = await fetch(`${API_URL}/api/thread/${threadId}`,
                {
                    method: "DELETE",
                    headers: {
                    Authorization: `Bearer ${user.token}`,
                    },
                }
);

                const res = await response.json();
                console.log(res);
                //updated all threads
                setAllThreads(prev=>prev.filter(thread=>thread.threadId!==threadId));
                if(threadId ===currThreadId){
                    createNewChat();
                }
            }catch(err){
                console.log(err);
            }
        }
    return (
       <section className='sidebar'>
        <button  onClick={createNewChat}>
            <img src='src/assets/blacklogo.png' alt='gpt-logo' className='logo'></img>
           <span> <i className="fa-solid fa-pen-to-square"></i></span>
        </button>
      <div>
          <ul className='history'>
            {
                allThreads?.map((thread,idx)=>(
                    <li key={idx} onClick={(e)=>changeThread(thread.threadId)}
                    className={thread.threadId===currThreadId?"highlighted":" "}>
                        {thread.title}
                    <i className="fa-solid fa-trash" onClick={(e)=>{
                        e.stopPropagation();
                        deleteThread(thread.threadId);
                    }}></i></li>
                ))
            }
        </ul>
      </div>
      
        <div className="sign">
            <p> By Pooja AR&hearts;</p>
        </div>

       </section>
    )
}

export default Sidebar;