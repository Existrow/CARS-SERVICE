import { Router } from 'express';
import UserRouter from "./user.routes"
import AuthRouter from "./auth.routes"
import BrandRouter from "./brand.router"
import ModelRouter from "./model.router"
import AdRouter from "./ad.routes"
import NewsRouter from "./news.routes"

const router = Router();
// User-route
router.use(UserRouter)

//Auth-route
router.use(AuthRouter)

//Brand-route
router.use(BrandRouter)

//Model-route
router.use(ModelRouter)

//Ad-route
router.use(AdRouter)

//News-route
router.use(NewsRouter)


export default router;