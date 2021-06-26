import React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { IAd } from "../../interfaces/IEntity"
import AdCard from "../../components/AdCard";


interface ICatalogAdsState {
    id: string;
}

interface ICatalogState {
    Ads: IAd[];
    isUpdate: boolean
}

interface ICatalogAdsProps extends RouteComponentProps<ICatalogAdsState> {
}

class CatalogAds extends React.Component<ICatalogAdsProps, ICatalogState> {

    state={
        Ads:[],
        isUpdate:false
    }
    async loadData(){
        axios.get(`http://localhost:4002/api/ads`)
            .then(res => {
                this.setState({
                    Ads: res.data,
                })

            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        const { Ads } = this.state;
        if(this.state.isUpdate){
            this.loadData()
            this.setState({
                isUpdate: false
            })
        }
        return (
            <div className='container col-md-12'>
                <div className='row pt-4'>
                    <p></p>
                </div>
                <div className='row'>
                    <div className='col-9'>
                        <div>
                            <h2><b>Найти объявление</b></h2>
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
                <div className='row'>
                    <div className='col-8 '>
                        {Ads.map((ad: IAd) =>
                            <>
                                <AdCard ad={ad} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default CatalogAds
