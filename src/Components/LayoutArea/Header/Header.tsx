import "./Header.css";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { RiCoupon2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { authStore, logout } from "../../../redux/AuthStore";
import { ClientType } from "../../../models/ClientType";
import { logoutApi } from "../../../services/AuthService";
import kirbyImage from "../../../assets/kirby.png";
import { toast } from "react-toastify";


export function Header(): JSX.Element {

  const navigate = useNavigate();

  function kirbyClick(){
    toast("Please dont click Kirby")
  }

    function handleLogout(){
        const token:string = authStore.getState().token
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
        <div className="Header">

        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="home" onClick={() => navigate("/")}>
              <RiCoupon2Line />
            </IconButton>

            <div onClick={kirbyClick} className="header-center">
              <img src={kirbyImage} alt="Kirby" className="kirby-image" />
            </div>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Coupon Store
            </Typography>
            {authStore.getState().role === ClientType.Guest ?<><Button color="inherit" onClick={() => navigate("/login")} >
            Login
          </Button>
          <span  className="mrg">
            Hello Guest!
          </span>
          </>:
          <>
          <Button color="inherit" onClick={handleLogout} >
            Logout
          </Button>
          <span className="mrg">
            Hello {authStore.getState().name}
          </span>
          </>}
          
          </Toolbar>
        </AppBar>
        </div>
      );
}
