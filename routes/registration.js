import express from "express";
import { registration } from "../controllers/registration.js";

const registrationRouter = express.Router();

registrationRouter.post('/registration', registration);

export default registrationRouter;