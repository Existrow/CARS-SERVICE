import {Router} from "express"
import UserController from "../controllers/user.controller";

const router = Router()
const controller = new UserController()
router.get('/users', controller.getUsers)
router.post('/users', controller.createUser)
// router.get('/users/:id', )
// router.put('/users', )
// router.delete('/users/:id', )

export default router