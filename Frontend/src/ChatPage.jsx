import Sidebar from "./Sidebaar.jsx";
import ChatWindow from "./ChatWindow.jsx";

function ChatPage({ setIsAuthenticated }) {
  return (
    <div className="app">
      <Sidebar />
      <ChatWindow setIsAuthenticated={setIsAuthenticated}/>
    </div>
  );
}

export default ChatPage;
