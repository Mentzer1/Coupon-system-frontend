import { Outlet } from "react-router-dom";
import { Routing } from "../Routing/Routing";
import "./Main.css";

export function Main(): JSX.Element {
    return (
        <div className="Main">
			<Routing/>
            <Outlet />
                
        </div>
    );
}
