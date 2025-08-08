import {Router} from "../Dependencies/dependencias.ts";
import {getFicha,postFicha,putFicha,deleteFicha} from "../Controller/fichaController.ts"

const fichaRouter = new Router();

fichaRouter
    .get("/fichas",getFicha)
    .post("/fichas",postFicha)
    .put("/fichas",putFicha)
    .delete("/fichas/:id",deleteFicha)

export {fichaRouter};