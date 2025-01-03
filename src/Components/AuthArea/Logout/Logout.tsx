import { authStore, logout } from "../../../redux/AuthStore";
import { logoutApi } from "../../../services/AuthService";
import "./Logout.css";
import { useNavigate } from "react-router-dom";

export function Logout(): JSX.Element {

    const navigate = useNavigate();
    
    function handleLogout(){
        const token = authStore.getState().token
        console.log(token)
        
        logoutApi(token)
        .then((res) => {
                        console.log("res: " + JSON.stringify(res))
                        authStore.dispatch(logout(res?.data))
                        console.log("Logout successful");
                        navigate("/home")
                    })
                    .catch((err) => {
                        console.error("Logout failed:", err);
                    });
    }

    return (
        <button className="Logout" onClick={handleLogout}>
            Logout
        </button>
    );
}
