import { LinqRepository } from "typeorm-linq-repository";
import { Request, Response } from "express";
import axios from 'axios';
import config from "../config/config";

export default class NewsController{
    public async getNewsAboutAuto(req: Request, res: Response): Promise<Response>{
        const news_get = await axios.get('https://newsapi.org/v2/everything',{
            params: {
                q:'авто',
                apiKey: config.newsApiKey
            }
        })
        return res.json(news_get.data)
    }
}