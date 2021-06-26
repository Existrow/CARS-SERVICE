import axios from "axios";
import CookieService from "./CookieService"
import { log } from "util";
import {IUser} from "../interfaces/IEntity"
import {BASED_URL, LOGIN_URL} from "../../src/urls/Urls"
import Body from "body-parser"


class AuthService {

    async login(login : string, password : string) {
        try {
            const response = await axios.post(BASED_URL + LOGIN_URL, {
                login: login,
                password: password,
            });
            CookieService.set('user', JSON.stringify(response.data), Object)
        }

        catch (error) {
            return error;
        }
    }

    async logout() {

    }

    register(username : string, email : string, password : string) {

    }

    isAuth() : boolean{
        const isAuthenticated:boolean = CookieService.get('user');
        return isAuthenticated;
    }

    getUser() : IUser{
        const data = CookieService.get('user');
        console.log(data)
        return data;
    }
}

export default new AuthService();