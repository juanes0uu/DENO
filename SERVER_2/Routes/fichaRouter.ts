import { Router } from "../Dependencies/dependencias.ts";
import { getFichas, postFicha } from "../Controller/fichaController.ts";


const fichaRouter = new Router();

fichaRouter
    .get("/fichas", getFichas)
    .post("/fichas", postFicha)


export { fichaRouter };
