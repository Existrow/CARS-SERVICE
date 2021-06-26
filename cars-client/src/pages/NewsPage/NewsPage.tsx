import React from "react";
import { RouteComponentProps } from "react-router";
import { IAd, INews } from "../../interfaces/IEntity";
import axios from "axios";
import AuthService from "../../services/AuthService";
import AdCard from "../../components/AdCard";


interface INewsProps {
    id: string;

}

interface IState {
    News: INews[];
    isLoaded: boolean;
}

interface IProps extends RouteComponentProps<INewsProps> {
}




class NewsPage extends React.Component<IProps, IState> {

    state = {
        News: [],
        isLoaded: false
    }

    async loadNews(){
        axios.get(`http://localhost:4002/api/news`
        )
            .then(res => {
                console.log(res.data.articles)
                this.setState({
                    News: res.data.articles
                })

            })
            .catch(err => {

            });
    }

    componentDidMount() {
        this.loadNews()

    }

    render() {
        const { News } = this.state
        return (
            <div className='row'>
                <div className='col-8 '>
                    {News.map((current: INews) =>
                        <>
                            <a href={current.url} className='no-hover'>
                                <div className="card p-3">
                                    <img className="card-img-top" src={current.urlToImage} alt="Card image cap" width="200px"></img>
                                        <div className="card-body">
                                            <p className="card-text">{current.title}</p>
                                        </div>
                                </div>
                            </a>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default NewsPage