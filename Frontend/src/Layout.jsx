import Sidebar from "./Sidebaar";
import ChatWindow from "./ChatWindow";

function Layout() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default Layout;
