import {Router} from "express"
import AdController from "../controllers/ad.controller";

const router = Router()
const controller = new AdController()
router.post('/ads/save', controller.saveImage)
router.get('/ad/:id', controller.getAdById)
router.post('/ad/create', controller.createAd)
router.get('/ads/get', controller.getAdsByUser)
router.delete('/ad/delete', controller.deleteAd)
router.put('/ad/update', controller.updateAd)
router.post('/ad/compare', controller.addCompare)
router.get('/compare/parametrs',controller.getComparedAdsByUserId)
router.delete('/compare/delete',controller.deleteComparedAdById)
router.get('/iscompared' , controller.checkAlreadyCompared)
router.get('/ads', controller.getAllAds)
export default router