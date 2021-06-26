import {Router} from "express"
import NewsController from "../controllers/news.controller";

const router = Router()
const controller = new NewsController()
router.get('/news', controller.getNewsAboutAuto)

export default router