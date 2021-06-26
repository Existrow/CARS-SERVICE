import React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { Form, OverlayTrigger, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import CurrentAdPage from "../pages/CurrentAdPage/CurrentAdPage";
import { IAd, IModel } from "../interfaces/IEntity";

interface AdCardProps{
   ad:IAd
}

class AdCard extends React.Component<AdCardProps>{
    render() {

        return (
            <>
            <Link to = {"/ad/" + this.props.ad.id} className='ad-card-hover'>
            <div className="row mt-3 mb-2 ad-card-hover">
                <div className="col-5 ">
                    {/*<img src="https://i.ibb.co/mS5YRrC/Frame-14-1.png" alt=""/> {this.props.id}*/}
                </div>
                <div className="col-7 ">
                    <div className="row">
                        <div className="col"><h4>{this.props.ad.model.brand.name} {this.props.ad.model.name}</h4></div>
                        <div className="col-4 text-right">
                            <div className="price_container">{this.props.ad.price} Р</div>
                        </div>
                    </div>
                    <div className="row small-text">
                        <div className="col">
                            {this.props.ad.model.engineCapacity} л / {this.props.ad.model.engineType.name}
                        </div>
                        <div className="col-9 text-left ml-0">
                            {this.props.ad.model.transmission.type}
                        </div>
                    </div>
                    <div className="row small-text">
                        <div className="col ">
                            {this.props.ad.model.hp} л.с
                        </div>
                        <div className="col-9 text-left ml-0">
                            {this.props.ad.model.yearRelease}
                        </div>
                    </div>
                    <div className="row small-text">
                        <div className="col ">
                            {this.props.ad.mileage} км
                        </div>
                    </div>
                    <div className="row mt-5 small-text grey-text">
                        <div className="col text-right">

                        </div>
                    </div>
                    <div className="row small-text grey-text">
                        <div className="col">
                            {this.props.ad.salePlace}
                        </div>
                    </div>
                    {this.props.ad.isSold?
                        <div className="row">
                            <div className="col-5">
                                <div className="alert alert-danger" role="alert">
                                    Авто было продано
                                </div>
                            </div>
                        </div>
                        :<></>}
                </div>
            </div>
            </Link>
            </>
        );
    }
}

export default AdCard