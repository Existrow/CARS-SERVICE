import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {Ads} from "../entity/Ads";
import { LinqRepository } from "typeorm-linq-repository";
import { Models } from "../entity/Models";
import { UserAdCompare } from "../entity/UserAdCompare";

export default class AdController{

    public async saveImage(req: Request, res: Response): Promise<Response>{
       return res.json(req.params.image);
    }

    public async getAdById(req: Request, res: Response): Promise<Response>{
        let id = Number(req.params.id);
        const adsLinqRepostitory: LinqRepository<Ads> = new LinqRepository(Ads);
        const ad = await adsLinqRepostitory
            .getAll()
            .where(m => m.id)
            .equal(id)
            .include(a=>a.model)
            .thenInclude(m => m.generation)
            .include(a=>a.model)
            .thenInclude(m => m.brand)
            .include(a=>a.model)
            .thenInclude(m => m.engineType)
            .include(a=>a.model)
            .thenInclude(m => m.driveUnits)
            .include(a=>a.model)
            .thenInclude(m => m.transmission)
            .include(a=>a.model)
            .thenInclude(m => m.bodyType);
        return res.json(ad);
    }

    public async createAd(req: Request, res: Response): Promise<Response>{
        await getRepository(Ads)
            .createQueryBuilder()
            .insert()
            .into(Ads)
            .values({
                model: req.body.currentModelId,
                countOwners: req.body.countOwners,
                vin: req.body.vin,
                plateNumber: req.body.plateNumber,
                mileage: req.body.mileage,
                hexColorCode: req.body.hexColorCode,
                description: req.body.description,
                salePlace: "Тюмень",
                price: req.body.price,
                user: req.body.userId,
            })
            .execute();
        return res.json("Запись добавлена");
    }

    public async getAdsByUser(req: Request, res: Response) : Promise<Response>{
        let id = Number(req.query.userId);
        const adsLinqRepostitory: LinqRepository<Ads> = new LinqRepository(Ads);
        //typeorm говно просто ужас, linq не вывозит совсем....
        const ads = await adsLinqRepostitory
            .getAll()
            .include(a => a.user)
            .where(a => a.user.id)
            .equal(id)
            .include(a=>a.model)
            .thenInclude(m => m.generation)
            .include(a=>a.model)
            .thenInclude(m => m.brand)
            .include(a=>a.model)
            .thenInclude(m => m.engineType)
            .include(a=>a.model)
            .thenInclude(m => m.driveUnits)
            .include(a=>a.model)
            .thenInclude(m => m.transmission)
            .include(a=>a.model)
            .thenInclude(m => m.bodyType);

        return res.json(ads)
    }

    public async deleteAd(req: Request, res: Response) : Promise<Response>{
        const id = req.body.id
        await getRepository(Ads)
            .createQueryBuilder()
            .delete()
            .from(Ads)
            .where("id = :id", { id: id })
            .execute();
        return res.json("Удаление прошло успешно");
    }

    public async updateAd(req: Request, res: Response): Promise<Response>{
        const id = Number(req.body.id)
        const isSold = Boolean(req.body.isSold)
        await getRepository(Ads)
            .createQueryBuilder()
            .update(Ads)
            .set({
                isSold: isSold,
            })
            .where("id = :id", { id: id })
            .execute();

        return res.json('Обновлено')
    }

    public async addCompare(req: Request, res: Response): Promise<Response>{
        await getRepository(UserAdCompare)
            .createQueryBuilder()
            .insert()
            .into(UserAdCompare)
            .values({
                user: req.body.userId,
                ad: req.body.adId
            })
            .execute();
        return res.json('Добавлено')
    }

    public async getComparedAdsByUserId(req: Request, res: Response): Promise<Response>{
         let userId = Number(req.query.userId);
        const comparedAdsLinqRepostitory: LinqRepository<UserAdCompare> = new LinqRepository(UserAdCompare);
        const comparedAds = await comparedAdsLinqRepostitory
            .getAll()
            .where(a => a.user.id)
            .equal(userId)
            .include(a => a.ad)
            .thenInclude(a => a.model)
            .thenInclude(m => m.generation)
            .include(a => a.ad)
            .thenInclude(a => a.model)
            .thenInclude(m => m.brand)
            .include(a => a.ad)
            .thenInclude(a => a.model)
            .thenInclude(m => m.bodyType)
            .include(a => a.ad)
            .thenInclude(a => a.model)
            .thenInclude(m => m.engineType)
            .include(a => a.ad)
            .thenInclude(a => a.model)
            .thenInclude(m => m.driveUnits)
            .include(a => a.ad)
            .thenInclude(a => a.model)
            .thenInclude(m => m.transmission)
        //какое же лютое говно, но иначе никак((((((((((
        return res.json(comparedAds)
    }

    public async deleteComparedAdById(req: Request, res: Response): Promise<Response>{
        const id = req.body.id
        await getRepository(UserAdCompare)
            .createQueryBuilder()
            .delete()
            .from(UserAdCompare)
            .where("id = :id", { id: id })
            .execute();
        return res.json("Удаление прошло успешно");
    }

    public async checkAlreadyCompared(req: Request, res: Response): Promise<Response>{
        let userId = Number(req.query.userId);
        let adId = Number(req.query.adId);
        const [ list, count ] = await getRepository(UserAdCompare)
            .findAndCount({
            where: [
                { user: userId, ad: adId },
            ]
        });

        if(count >= 1){
            return res.json(true)
        }
        return res.json(false)
    }

    public async getAllAds(req: Request, res: Response): Promise<Response>{
        const adsLinqRepostitory: LinqRepository<Ads> = new LinqRepository(Ads);
        //typeorm говно просто ужас, linq не вывозит совсем....
        const ads = await adsLinqRepostitory
            .getAll()
            .include(a=>a.model)
            .thenInclude(m => m.generation)
            .include(a=>a.model)
            .thenInclude(m => m.brand)
            .include(a=>a.model)
            .thenInclude(m => m.engineType)
            .include(a=>a.model)
            .thenInclude(m => m.driveUnits)
            .include(a=>a.model)
            .thenInclude(m => m.transmission)
            .include(a=>a.model)
            .thenInclude(m => m.bodyType);

        return res.json(ads)
    }
}
