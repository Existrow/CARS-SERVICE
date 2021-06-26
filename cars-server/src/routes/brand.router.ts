import { Router } from "express"
import BrandController from "../controllers/brand.controller";

const router = Router()
const controller = new BrandController()
router.get('/brands', controller.getBrands)

export default router