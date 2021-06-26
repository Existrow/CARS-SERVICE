import React from 'react';
import { MainNavbar } from './components/Navbar/Navbar'
import Routes from "./routers/Router"
import { MainFooter } from "./components/Footer/Footer";
import { Navbar } from "react-bootstrap";


function App()  {
    return <>
        <div className="page">
        <MainNavbar />
        <div className="container col-10 ">
            <Routes />
        </div>

        <footer>
            <MainFooter />
        </footer>
        </div>

    </>
        ;
}

export default App;
