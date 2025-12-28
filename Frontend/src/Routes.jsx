import { Routes, Route, Navigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin.jsx";
import NotFound from "./NotFound.jsx";
import Layout from "./Layout.jsx";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import OAuthSuccess from "./OAuthSuccess.jsx";

function AppRoutes() {
  const { isAuthenticated, setIsAuthenticated } = useContext(MyContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false); // done checking
  }, [setIsAuthenticated]);

  if (loading) return <p>Loading...</p>; // prevent early redirect

  return (
    <Routes>
      <Route path="/login" element={<GoogleLogin />} />

      <Route
        path="/thread"
        element={
          isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
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
