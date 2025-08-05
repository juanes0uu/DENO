import { Router } from "../Dependencies/dependencias.ts";
import { getProgramas, postPrograma } from "../Controller/programaController.ts";

const programaRouter = new Router();

programaRouter
    .get("/programas", getProgramas)
    .post("/programas", postPrograma);

export { programaRouter };
