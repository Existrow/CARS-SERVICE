import React from 'react'
import { Navbar, Container, NavbarBrand } from 'react-bootstrap';
import "../../styles/main.css";



export class MainFooter extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className='footer-line'></div>
                <Navbar className='container col-4'>
                    <div className='container col justify-content-center'>
                        <a href="https://vk.com/real_hoodd" className='link-without-decoration'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/VK.com-logo.svg" width="16" height="16" alt=""/>
                            &nbsp; Сидоров Илья
                    </a>
                    </div>
                </Navbar>
                <Navbar className='container col-5 text-center'>
                    <div className='container col justify-content-center '>
                        2021–2021 (Тюменская область)
                    </div>
                </Navbar>
            </footer>
            // <div className="bottom">
            // </div>
        );
    }
}