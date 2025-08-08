import {Router} from "../Dependencies/dependencias.ts";
import {getFicha,postFicha} from "../Controller/fichaController.ts"

const fichaRouter = new Router();

fichaRouter
    .get("/fichas",getFicha)
    .post("/fichas",postFicha)
export {fichaRouter};