import Router from "express";

import * as registerController from "../controllers/registerController";

const router = Router();

router.post("/register", registerController.register);

export default router;
