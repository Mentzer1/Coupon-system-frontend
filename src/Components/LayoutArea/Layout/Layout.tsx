import "./Layout.css";
import { Header } from "../Header/Header";
import { SideMenu } from "../SideMenu/SideMenu";
import { Main } from "../Main/Main";
import { Footer } from "../Footer/Footer";

export function Layout(): JSX.Element {
    return (
      <div className="Layout">
        <Header />
        <div className="layoutContainer">
        <SideMenu />
        <Main />
        </div>
        <Footer />
      </div>
    );
  }