import { Router } from "../Dependencies/dependencias.ts";
import { getRelacionesFichaAprendiz, postRelacionFichaAprendiz } from "../Controller/fichaAprendizController.ts";

const fichaAprendizRouter = new Router();

fichaAprendizRouter
    .get("/ficha_aprendiz", getRelacionesFichaAprendiz)
    .post("/ficha_aprendiz", postRelacionFichaAprendiz);

export { fichaAprendizRouter };
