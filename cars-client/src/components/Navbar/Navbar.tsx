import React from 'react'
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import "../../styles/main.css";
import logo from "../../img/logo.png"
import AuthService from "../../services/AuthService";
import { BASED_URL, LOGIN_URL, HOME_URL } from "../../urls/Urls";


export class MainNavbar extends React.Component {

    state = {
        isAuth: false
    }


    async componentDidMount() {
        this.setState({
            isAuth:AuthService.isAuth()
        })
        console.log(this.state.isAuth)
    }

    dropdownElementRender(){
        if(this.state.isAuth){
            return (
                <>
                    <Nav>
                        <NavDropdown title={AuthService.getUser().login} id="nav-dropdown">
                            <NavDropdown.Item href="/user/ads">Мои объявления</NavDropdown.Item>
                            <NavDropdown.Item href="/compare">Таблица сравнений</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Выход</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </>
            );
        }

        return (<Nav.Link href={'/login'}> <span className="nav-color">{ this.state.isAuth? '' : 'Вход и регистрация' }</span></Nav.Link>);
    }

    render() {
        const user = AuthService.getUser();

        return (
            <div className='row nav-bg-color'>
                <div className='container col-md-10'>
                    <Navbar expand="lg">
                        <Navbar.Brand href={HOME_URL}><img src={logo} alt=""/></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" >
                            <Nav className="mr-auto">
                                <Nav.Link href="/catalog"><span className="nav-color">Объявления</span></Nav.Link>
                                {/*<Nav.Link href="#link"><span className="nav-color">Отзывы</span></Nav.Link>*/}
                                <Nav.Link href="/news"><span className="nav-color">Новости</span></Nav.Link>
                                <Nav.Link href="/append"><span className="nav-color">Подать объявление</span></Nav.Link>
                            </Nav>
                            {this.dropdownElementRender()}
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
        );
    }
}