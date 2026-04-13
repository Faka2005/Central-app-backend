import { Router } from "express";

import { AuthUser } from "../middleware/AuthUserMiddleware";
import { Request,Response } from "express";
//import {getUser} from "../controllers/user.controller";
const router = Router();


router.get("/me",AuthUser)


export default router;
