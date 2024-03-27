import { Router } from "express";
import { testConnection } from "../controllers/testControllers";

const router = Router();

router.get("/", testConnection);

export { router };
