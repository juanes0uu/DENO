import {Router} from "../Dependencies/dependencias.ts";
<<<<<<< HEAD
import {getFicha,postFicha} from "../Controller/fichaController.ts"
=======
import {getFicha,postFicha,putFicha,deleteFicha} from "../Controller/fichaController.ts"
>>>>>>> 7eb541e02dd75320d81710719e6342def76b25e1

const fichaRouter = new Router();

fichaRouter
    .get("/fichas",getFicha)
    .post("/fichas",postFicha)
<<<<<<< HEAD
=======
    .put("/fichas",putFicha)
    .delete("/fichas/:id",deleteFicha)

>>>>>>> 7eb541e02dd75320d81710719e6342def76b25e1
export {fichaRouter};