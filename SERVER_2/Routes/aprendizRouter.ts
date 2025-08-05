import { Router } from "../Dependencies/dependencias.ts";
import { getAprendices, postAprendiz } from "../Controller/aprendizController.ts";

const aprendizRouter = new Router();

aprendizRouter
    .get("/aprendices", getAprendices)
    .post("/aprendices", postAprendiz);

export { aprendizRouter };
