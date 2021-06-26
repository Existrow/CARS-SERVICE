import React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { Button, Form, Modal, OverlayTrigger, Table } from "react-bootstrap";
import AdCard from "../../components/AdCard";
import AuthService from "../../services/AuthService";
import { IAd, IBrand } from "../../interfaces/IEntity";

interface IUserAdsPageState {

}

interface IState {
    isLoaded: boolean,
    modalShow:boolean,
    modalUpdateShow: boolean,
    ads: IAd[],
    isUpdate: boolean
}

interface IUserAdsPageProps extends RouteComponentProps<IUserAdsPageState> {
}

class UserAdsPage extends React.Component<IUserAdsPageProps, IState> {

    state = {
        ads:[],
        modalShow : false,
        isLoaded: false,
        modalUpdateShow: false,
        isUpdate: false
    }

    componentDidMount() {
       this.loadData()
    }

    async loadData(){
        axios.get('http://localhost:4002/api/ads/get', {
            params: {
                userId:AuthService.getUser().id,
            }
        })
            .then( res => {
                this.setState({
                    isLoaded: true,
                    ads: res.data
                });
            })
    }

    handleDeleteModalClose(e:any){
        this.setState({
            modalShow : false
        })
    }

    handleUpdateModalClose(e:any){
        this.setState({
            modalUpdateShow : false
        })
    }

    handleShow(e :any){
        this.setState({
            modalShow : true
        })
    }

    handleUpdateShow(e :any){
        this.setState({
            modalUpdateShow : true
        })
    }

    async handleAdDelete(id : number){
        axios.delete('http://localhost:4002/api/ad/delete', {
            data: {
                id: id
            }
        })
            .then((response) => {
                this.setState({
                    modalShow : false,
                    isUpdate: true,
                })
            }, (error) => {

            });
    }

    async handleAdUpdate(id : number){
        axios.put('http://localhost:4002/api/ad/update', {
            id: id,
            isSold: true
        })
            .then((response) => {
                this.setState({
                    modalUpdateShow : false,
                    isUpdate: true,
                })
            }, (error) => {
                alert(error)
            });
    }

    render() {
        const { ads } = this.state;
        if(this.state.isUpdate){
            this.loadData()
            this.setState({
                isUpdate: false
            })
        }
        return (
            <div className='container col-md-12 mb-auto'>
                <div className='row pt-4'>
                    <p></p>
                </div>
                <div className='row'>
                    <div className='col-9'>
                        <div>
                            <h2><b>Мои объявления</b></h2>
                        </div>
                    </div>
                </div>
                <div className={'row'}>
                    <div className="col-1"></div>
                        <div className="col-10 fon center-block">
                        {ads.map((ad: IAd) =>
                            <>
                                <AdCard ad={ad} />
                                <Button variant={"outline-danger m-3"} onClick={this.handleShow.bind(this)}>Удалить</Button>
                                <Button variant={ad.isSold?"success m-3": "outline-success ml-1"} onClick={this.handleUpdateShow.bind(this)} disabled={ad.isSold}>Продано</Button>
                                <Modal
                                    show={this.state.modalShow}
                                    onHide={this.handleDeleteModalClose.bind(this)}
                                    backdrop="static"
                                    keyboard={false}
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Подтверждение</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Вы действительно хотите удалить объявление?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleDeleteModalClose.bind(this)}>
                                            Нет
                                        </Button>
                                        <Button variant="primary" onClick={(e:any)=>{this.handleAdDelete(ad.id)}}>Да</Button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal
                                    show={this.state.modalUpdateShow}
                                    onHide={this.handleUpdateModalClose.bind(this)}
                                    backdrop="static"
                                    keyboard={false}
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Подтверждение</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Вы действительно хотите изменить объявление?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleUpdateModalClose.bind(this)}>
                                            Нет
                                        </Button>
                                        <Button variant="primary" onClick={(e:any)=>{this.handleAdUpdate(ad.id)}}>Да</Button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                        )}
                    </div>

                    <div className="col-1"></div>
                </div>
            </div>
        );
    }
}


export default UserAdsPage
