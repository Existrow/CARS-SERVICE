import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import CompageImage from "../../img/Compare.png"
import AlreadyCompared from "../../img/AlreadyCompared.png"
import AddFavouriteImage from "../../img/Favoutite.png"
import {IAd} from "../../interfaces/IEntity";
import axios from "axios";
import AuthService from "../../services/AuthService";


interface ICurrentAdPageState {
    id: string;

}

interface IAdPageState {
    Ad: any;
    isLoaded: boolean;
    isAddCompared: boolean;
    isUpdate:boolean;
}

interface ICurrentAdPageProps extends RouteComponentProps<ICurrentAdPageState> {
}




class CurrentAdPage extends React.Component<ICurrentAdPageProps, IAdPageState> {

    state = {
        isLoaded:false,
        Ad: null as any,
        isAddCompared: true,
        isUpdate:false,
    }

    constructor(props: ICurrentAdPageProps) {
        super(props);
        this.setState({
            isLoaded:false
        })
    }

    async loadData(){
        axios.get(`http://localhost:4002/api/ad/${this.props.match.params.id}`)
            .then(res => {

                console.log(res.data);
                this.setState({
                    Ad: res.data[0] as IAd,
                })

            })
            .catch(err => {
                console.log(err);
            });
    }

    async loadDataAboutExistCompared(){
        axios.get(`http://localhost:4002/api/iscompared`,{
            params: {
                userId: AuthService.isAuth()?AuthService.getUser().id:0,
                adId: this.props.match.params.id
            }
        })
            .then(res => {
                this.setState({
                    isAddCompared: res.data
                })

            })
            .catch(err => {

            });
    }

    componentDidMount() {
        this.setState({
            isLoaded:false
        })
       this.loadData()
        this.loadDataAboutExistCompared()
        this.setState({
            isLoaded:true
        })
    }


    renderCompareTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            Добавить к сравнению
        </Tooltip>
    );

    renderFavouriteTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            Добавить в избранное
        </Tooltip>
    );

    async handleAddToCompare(e: any){
        e.preventDefault();
        const ad: IAd = this.state.Ad
        axios.post('http://localhost:4002/api/ad/compare', {
            userId: AuthService.isAuth() ? AuthService.getUser().id : 0,
            adId: ad.id
        })
            .then((response) => {
                this.setState({
                    isLoaded: true,
                    isUpdate:true,
                })
            }, (error) => {
                alert(error);
            });

    }

    loaded() {
        console.log(this.state.Ad)
        if(this.state.Ad != null){
            const ad: IAd = this.state.Ad
            console.log('test', ad)
            return (   <div className='container col-md-12'>
                     <div className='row pt-4'>
                         <p></p>
                     </div>
                     <div className='row'>
                        <div className='col-7'>
                            <div>
                                <h2><b>{ad.model.brand.name} {ad.model.name}</b></h2>
                                {AuthService.isAuth()?
                                    <>
                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={(props) => (
                                                <Tooltip id="button-tooltip" {...props} >
                                                    {!this.state.isAddCompared?"Добавить к сравнению":"Уже добавлено к сравнению"}
                                                </Tooltip>
                                            )}
                                        >
                                            {!this.state.isAddCompared?
                                                <img src={CompageImage} id='compare-image' onClick={this.handleAddToCompare.bind(this)} />
                                                :<img src={AlreadyCompared} id='compare-image' />}
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={this.renderFavouriteTooltip}
                                        >
                                            <img src={AddFavouriteImage} />
                                        </OverlayTrigger>
                                    </>
                                    : <></>}

                            </div>
                        </div>
                         <div className='col-4'>
                             <div className='col-6 text-center float-right'>
                                 <div className='price_container'><span><b>{ad.price}₽</b></span></div>
                             </div>
                         </div>
                     </div>
                     <div className='row'>
                         <div className='col-7'>
                         </div>
                         <div className='col-4 p-1'>
                             <div className='col-6 float-right'>
                                 <table className="table text">
                                     <tbody>
                                     <tr>
                                         <td>Год выпуска</td>
                                         <td>{ad.model.yearRelease}</td>
                                     </tr>
                                     <tr>
                                         <td>Пробег</td>
                                         <td>{ad.mileage} км</td>
                                     </tr>
                                     <tr>
                                         <td>Двигатель</td>
                                         <td>{ad.model.engineType.name}</td>
                                     </tr>
                                     <tr>
                                         <td>Коробка передач</td>
                                         <td>{ad.model.transmission.type}</td>
                                     </tr>
                                     <tr>
                                         <td>Руль</td>
                                         <td>{ad.model.wheelPosition}</td>
                                     </tr>
                                     <tr>
                                         <td>Привод</td>
                                         <td>{ad.model.driveUnits.type}</td>
                                     </tr>
                                     <tr>
                                         <td>VIN</td>
                                         <td>{ad.vin.slice(0,3) + "*******"}</td>
                                     </tr>
                                     <tr>
                                         <td>Гос.номер</td>
                                         <td>{ad.plateNumber.slice(0,3) + "****"}</td>
                                     </tr>
                                     <tr>
                                         <td>Количество владельцев</td>
                                         <td><b>{ad.countOwners}</b></td>
                                     </tr>
                                     </tbody>
                                 </table>
                             </div>

                         </div>
                     </div>
                     <div className='row'>
                         <div className='col-7 fon'>
                                     <h4><b>Описание</b></h4>
                                         <p>{ad.description}</p>

                         </div>
                         <div className='col-4'>
                                     <div className='col-6 fon float-right'>
                                         <b>Частное лицо</b><br /><span className='text-secondary'>{ad.salePlace}</span><p></p>
                                     </div>
                                 </div>
                         </div>
             </div>);
        }
        return <div>Такого объявления не существует!</div>;
    }

    render() {
        if(this.state.isUpdate){
            this.loadDataAboutExistCompared()
        }
        if(this.state.isLoaded){
            const { Ad } = this.state
            return this.loaded()
        }
        else {
            return <div></div>
        }
    }
}

export default CurrentAdPage