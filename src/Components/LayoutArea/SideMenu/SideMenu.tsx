import "./SideMenu.css";
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Home, People, LocalOffer, Business } from '@mui/icons-material';
import { authStore } from "../../../redux/AuthStore";
import { ClientType } from "../../../models/ClientType";
import { useNavigate } from "react-router-dom";
import { ListItemButton } from "@mui/material";



export function SideMenu(): JSX.Element {

    const navigate = useNavigate()

    function goToHome(){
        navigate("/home");
    }
    function goToCustomers(){
        navigate("/customers");
    }
    function goToCompanies(){
        navigate("/companies");
    }
    function goToCoupons(){
      navigate("/coupons");
    }
    function goToAllCoupons(){
      navigate("/all_coupons");
  }


    return (
        <div className="SideMenu">

        {/* <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}> */}
        <div>
          <List>
            <ListItemButton onClick={goToHome}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>

            {authStore.getState().role !== ClientType.Administrator && authStore.getState().role !== ClientType.Guest ?<><ListItemButton onClick={goToCoupons}>
              <ListItemIcon>
                <LocalOffer />
              </ListItemIcon>
              <ListItemText primary="Your Coupons" />
            </ListItemButton></>:''}

            {authStore.getState().role === ClientType.Customer?<><ListItemButton onClick={goToAllCoupons}>
              <ListItemIcon>
                <LocalOffer />
              </ListItemIcon>
              <ListItemText primary="Coupons Store" />
            </ListItemButton></>:''}

            {authStore.getState().role === ClientType.Administrator?<> <ListItemButton onClick={goToCustomers}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItemButton></>:''}
            {authStore.getState().role === ClientType.Administrator?<><ListItemButton onClick={goToCompanies} >
              <ListItemIcon>
                <Business />
              </ListItemIcon>
              <ListItemText primary="Companies" />
            </ListItemButton></>:''}
          </List>
          </div>
        {/* </Drawer> */}
        </div>
      );
}
