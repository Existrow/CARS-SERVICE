import {Router} from "express"
import AuthController from "../controllers/auth.controller";
import CheckJwtMiddleware from "../middleware/checkJwt.middleware";

const router = Router()
const controller = new AuthController()
router.post('/login', controller.login)
router.post("/user", [CheckJwtMiddleware.checkJwt], controller.me);
export default router