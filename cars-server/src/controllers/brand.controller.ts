import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {Brands} from "../entity/Brands";

export default class BrandController{

    public async getBrands(req: Request, res: Response): Promise<Response>{
        const brands = await getRepository(Brands).find();
        return res.json(brands);
    }
}