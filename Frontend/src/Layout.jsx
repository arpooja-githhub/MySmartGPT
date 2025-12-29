import Sidebar from "./Sidebaar";
import ChatWindow from "./ChatWindow";
import "./Layout.css";

function Layout() {
  return (
    <div style={{ display: "flex" }} className="appLayout">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default Layout;
