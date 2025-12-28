import React from "react";
import { useNavigate } from "react-router-dom";
function NotFound(){
    const navigate = useNavigate();
    return(
        
        <div>
                
                404 PAGE NOT FOUND!<br/>
                <button onClick={()=>navigate(`/login`)}>Login</button>
        </div>
    )
}
export default NotFound;