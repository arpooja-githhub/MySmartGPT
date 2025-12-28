import { Routes, Route, Navigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin.jsx";
import NotFound from "./NotFound.jsx";
import Layout from "./Layout.jsx";
import { useContext } from "react";
import { MyContext } from "./MyContext.jsx";
import OAuthSuccess from "./0AuthSuccess.jsx";

function AppRoutes() {
  const { isAuthenticated } = useContext(MyContext);

  return (
    <Routes>
      <Route path="/login" element={<GoogleLogin />} />

      <Route
        path="/thread"
        element={
          isAuthenticated ? <Layout /> : <Navigate to="/login" />
        }
      />
    <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;















// import { Routes, Route } from "react-router-dom";
// import GoogleLogin from "./GoogleLogin.jsx";
// import ChatPage from "./ChatPage.jsx";
// import NotFound from "./NotFound.jsx";

// function AppRoutes() {
//   return (
//     <Routes>
      
//       <Route path="/login" element={<GoogleLogin />} />
//       <Route path="/thread"  element={<ChatPage /> } />
//       <Route path='*' element={<NotFound/>}/>
//     </Routes>
//   );
// }

// export default AppRoutes;
