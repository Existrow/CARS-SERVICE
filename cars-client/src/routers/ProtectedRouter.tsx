import * as React from 'react';
import {
    Route,
    Redirect,
    RouteProps,
    RouteComponentProps
} from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
    isAuthenticated: boolean;
}

export class PrivateRoute extends Route<PrivateRouteProps> {
    render() {
        return (
            <Route render={(props: RouteComponentProps) => {
                if(!this.props.isAuthenticated) {
                    return <Redirect to='/login' />
                }

                if(this.props.component) {
                    return React.createElement(this.props.component);
                }

                if(this.props.render) {
                    return this.props.render(props);
                }
            }} />
        );
    }
}