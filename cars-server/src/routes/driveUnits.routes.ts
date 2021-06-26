import { Router } from "express"
import DriveUnitsController from "../controllers/driveUnits.controller";

const router = Router()
const controller = new DriveUnitsController()

export default router