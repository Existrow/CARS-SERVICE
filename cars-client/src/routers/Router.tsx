import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import AdsAppendPage from "../pages/AdsAppendPage/AdsAppendPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import React from "react";
import { LOGIN_URL, HOME_URL } from "../urls/Urls"
import AuthService from "../services/AuthService";
import { PrivateRoute } from "./ProtectedRouter";
import CurrentAdPage from "../pages/CurrentAdPage/CurrentAdPage";
import CatalogAds from "../pages/CatalogAdsPage/CatalogAdsPage";
import CompareAds from "../pages/CompareAdsPage/CompareAdsPage";
import UserAdsPage from "../pages/UserAdsPage/UserAdsPage";
import MainPage from "../pages/MainPage/MainPage";
import NewsPage from "../pages/NewsPage/NewsPage";

export default class Routes extends React.Component{
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={'/'} component={MainPage}></Route>
                    <Route exact path={'/' + LOGIN_URL} component={LoginPage} />
                    <PrivateRoute
                        path='/append'
                        component={AdsAppendPage}
                        isAuthenticated={AuthService.isAuth()}
                    />
                    <Route exact path={'/catalog'} component={CatalogAds} />
                    <Route exact path={'/ad/:id'} component={CurrentAdPage} />
                    <Route exact path={'/news'} component={NewsPage} />
                    <PrivateRoute isAuthenticated={AuthService.isAuth()} path={'/compare'} component={CompareAds}/>
                    <PrivateRoute isAuthenticated={AuthService.isAuth()} path={'/user/ads'} component={UserAdsPage} />
                </Switch>
            </Router>
        )
    }
}
