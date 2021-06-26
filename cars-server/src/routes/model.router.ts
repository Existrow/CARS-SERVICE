import { Router } from "express"
import ModelController from "../controllers/model.controller";

const router = Router()
const controller = new ModelController()
router.get('/models', controller.getModels)
router.get('/models/brand/:id', controller.getModelsByBrandId)
router.get('/models/years', controller.getYearsByModel)
router.get('/models/engine/type', controller.getEngineTypeByModel)
router.get('/models/parametrs', controller.getModelByParametrs)


export default router