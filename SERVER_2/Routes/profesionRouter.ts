import { Router } from "../Dependencies/dependencias.ts";
import { getProfesiones, postProfesion } from "../Controller/profesionController.ts";

const profesionRouter = new Router();

profesionRouter
    .get("/profesiones", getProfesiones)
    .post("/profesiones", postProfesion);

export { profesionRouter };
