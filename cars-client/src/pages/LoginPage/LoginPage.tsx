import React from "react";
import { RouteComponentProps } from "react-router";
import {Button, Form } from "react-bootstrap";
import AuthService from "../../services/AuthService"
import { HOME_URL } from "../../urls/Urls";
import {Route } from "react-router-dom";
import AdsAppendPage from "../AdsAppendPage/AdsAppendPage";


interface ILoginPageState {
    login: string,
    password: string,
    isChecked: boolean,
}

interface ILoginPageProps extends RouteComponentProps{

}


class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {

    state = {
        login: "",
        password: "",
        isChecked: false,
    }

    async HandleFormSubmit(event: any){
        event.preventDefault();
        await AuthService.login(this.state.login, this.state.password);
        this.props.history.replace(HOME_URL);
        window.location.reload();
    }

    async componentDidMount() {

    }

    handleChange(e: any) {
        e.preventDefault()
        console.log(e.target.name);
        this.setState({ [e.target.name]: e.target.value } as Pick<ILoginPageState, any>)
    }

    render() {
        if(AuthService.isAuth()){
            return (<Route exact path="/append" component={AdsAppendPage} />);
        }
        else{
            return (
                <>
                <div className="vertical-center">
                    <div className="container col-4 fon p-5">
                                <span className='text-center'><h1>Вход</h1></span>
                                <Form onSubmit={this.HandleFormSubmit.bind(this)}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Логин</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name='login'
                                            placeholder="Введите логин"
                                            value={this.state.login} onChange={this.handleChange.bind(this)}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Пароль</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name='password'
                                            placeholder="Введите пароль"
                                            value={this.state.password} onChange={this.handleChange.bind(this)}
                                        />
                                    </Form.Group>
                                    <Button type="submit">
                                        Войти
                                    </Button>
                                </Form>
                    </div>
                </div>
                </>
            );
        }
    }
}


export default LoginPage;