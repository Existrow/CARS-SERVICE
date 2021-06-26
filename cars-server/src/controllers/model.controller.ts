import {Request, Response} from "express";
import {getManager, getRepository} from "typeorm";
import {Models} from "../entity/Models";
import { LinqRepository } from "typeorm-linq-repository";
import { Brands } from "../entity/Brands";
import { BodyTypes } from "../entity/BodyTypes";
import { DriveUnits } from "../entity/DriveUnits";
import jslinq from "jslinq";
import {Like} from "typeorm";
import { EngineTypes } from "../entity/EngineTypes";

export default class ModelController{


    public async getModels(req: Request, res: Response): Promise<Response>{
        const models = await getRepository(Models).find();
        return res.json(models);
    }

    public async getModelsByBrandId(req:Request, res: Response): Promise<Response>{
        let id = Number(req.params.id);
        const entityManager = getManager();
        const rawData = await entityManager.query(`select DISTINCT name
                                                   from models
                                                   WHERE brand_id = ${id}`);
        return res.json(rawData);
    }

    public async getYearsByModel(req:Request, res:Response): Promise<Response>{
        let modelName = String(req.query.name)
        let engineType = Number(req.query.engine_type_id)
        const entityManager = getManager();
        //как же бесит тупой typeorm и linq нормально не работает, верните меня на c#!!!!!!!!!
        const rawData = await entityManager.query(
            `select distinct m.year_release from models m where lower(m.name) like lower('%${modelName}%') and m.engine_type_id = ${engineType}`);
        return res.json(rawData);
    }

    public async getEngineTypeByModel(req:Request, res:Response): Promise<Response>{
        let modelName = String(req.query.name);
        const entityManager = getManager();
        //как же бесит тупой typeorm и linq нормально не работает, верните меня на c#!!!!!!!!!
        const rawData = await entityManager.query(`select DISTINCT engine_types.id, engine_types.name
                                                   from engine_types inner join models m on engine_types.id = m.engine_type_id
                                                   where lower(m.name) like lower('%${modelName}%')`);
        return res.json(rawData);
    }

    public async getModelByParametrs(req:Request, res:Response): Promise<Response>{
        let modelName = String(req.query.name);
        const yearRelease = Number(req.query.yearRelease);
        let engineTypeId = Number(req.query.engine_type_id);
        const modelsLinqRepository: LinqRepository<Models> = new LinqRepository<Models>(Models)
        const models = await modelsLinqRepository.getAll()
            .include(m => m.engineType)
            .include(m => m.transmission)
            .include(m => m.bodyType)
            .include(m => m.driveUnits)
            .include(m => m.generation)
            .where(m => m.yearRelease as any).equal(yearRelease)
            .and(m => m.name).equal(modelName)
            .and(m => m.engineType.id).equal(engineTypeId)

        // const modelsRepository = await getRepository(Models);
        // const models = await modelsRepository
        //     .createQueryBuilder('m')
        //     .innerJoinAndSelect("m.engineType_2", "engine_types")
        //     .where("m.name = :name", { name: modelName })
        //     .execute();
        return res.json(models);
    }
}