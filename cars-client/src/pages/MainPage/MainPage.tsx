import { RouteComponentProps } from "react-router";
import React from "react";

interface ICatalogAdsState {

}

interface ICatalogState {

}

interface ICatalogAdsProps extends RouteComponentProps<ICatalogAdsState> {
}

class MainPage extends React.Component<ICatalogAdsProps, ICatalogState> {
    render() {
        return (
            <>
            <main role="main">
            <section className="jumbotron text-center">
                <div className="container">
                    <h1 className="jumbotron-heading">Car ads</h1>
                    <p className="lead text-muted">Площадка для размещения объявлений о продаже автомобилей</p>
                    <p>

                    </p>
                </div>
            </section>
            </main>
            </>

    );
    }
}

export default MainPage