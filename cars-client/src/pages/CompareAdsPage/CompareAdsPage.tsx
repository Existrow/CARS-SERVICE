import React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { Button } from "react-bootstrap";
import { IAd, IAdCompareDto } from "../../interfaces/IEntity"
import AuthService from "../../services/AuthService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { ExportCSV } from "../../components/ExportExcel/ExportCsv";
import { Link, withRouter } from "react-router-dom";




interface ICompareAdsState {

}

interface IState {
    ads: IAdCompareDto[],
    isLoaded: boolean
    adsd: IAd[],
    isUpdate: boolean
}

interface ICompareAdsProps extends RouteComponentProps<ICompareAdsState> {
}

class CompareAds extends React.Component<ICompareAdsProps, IState> {


    state = {
        isLoaded:false,
        ads:[],
        adsd:[],
        isUpdate: false
    }

    componentDidMount() {
        this.loadData()
        this.setState({
            isLoaded:true
        })
    }

    async loadData(){
        axios.get('http://localhost:4002/api/compare/parametrs', {
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

    async handleDeleteFromCompared(id : number){
        axios.delete('http://localhost:4002/api/compare/delete', {
            data: {
                id: id
            }
        })
            .then((response) => {
                this.setState({
                    isUpdate: true,
                })
            }, (error) => {

            });
    }

    render() {
        if(this.state.isUpdate){
            this.loadData()
            this.setState({
                isUpdate: false
            })
        }
        const { ads } = this.state
        const myClonedArray: any = [];

        if(ads){
            ads.forEach((val : IAdCompareDto) => myClonedArray.push(Object.assign({}, val.ad)));
        }

        return (
            <div className='container col-md-12'>
                <div className='row pt-4'>
                    <p></p>
                </div>
                <div className='row'>
                    <div className='col-9'>
                        <div>
                            <h2><b>Сравнить объявления</b></h2>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-8'>
                        <div className='fon'>
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className='col-8'>
                        <ExportCSV csvData={myClonedArray} fileName={'Сравнение'} />
                    </div>
                </div>
                <div className='row '>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Автомобиль</th>
                            <th scope="col">Привод</th>
                            <th scope="col">Год выпуска</th>
                            <th scope="col">Количество владельцев</th>
                            <th scope="col">Мощность</th>
                            <th scope="col">Объем двигателя</th>
                            <th scope="col">Тип двигателя</th>
                            <th scope="col">Коробка передач</th>
                            <th scope="col">Цена</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {ads
                            ?
                            ads.map(( {id, ad}: IAdCompareDto) =>
                                <tr>
                                    <Link to = {"/ad/" + ad.id}><td>{ad.model.brand.name} {ad.model.name}</td></Link>
                                    <td>{ad.model.driveUnits.type}</td>
                                    <td>{ad.model.yearRelease}</td>
                                    <td>{ad.countOwners}</td>
                                    <td>{ad.model.hp} л.с</td>
                                    <td>{ad.model.engineCapacity} л.</td>
                                    <td>{ad.model.engineType.name}</td>
                                    <td>{ad.model.transmission.type}</td>
                                    <td>{ad.price}</td>
                                    <td><Button variant="danger" onClick={(e:any)=>{this.handleDeleteFromCompared(id)}}>x</Button> </td>
                                </tr>
                                )
                            :<div></div>}
                        </tbody>
                    </table>
                </div>
                <div className="row mt-5">
                    <div className="col-4"></div>
                    <div className='col-5'>
                        <BarChart
                            width={500}
                            height={300}
                            data={myClonedArray}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="price" name={'Цена'} fill="#8884d8" />
                        </BarChart>
                    </div>
                    <div className="col-3"></div>
                </div>
            </div>
        );
    }
}

export default withRouter(CompareAds)
