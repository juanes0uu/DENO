import { Application, oakCors } from "./Dependencies/dependencias.ts";
import { aprendizRouter } from "./Routes/aprendizRouter.ts";
import { programaRouter } from "./Routes/programaRouter.ts";
import { profesionRouter } from "./Routes/profesionRouter.ts";
import { instructorRouter } from "./Routes/instructorRouter.ts";
import { fichaRouter } from "./Routes/fichaRouter.ts";
import { fichaAprendizRouter } from "./Routes/fichaAprendizRouter.ts";

const app = new Application();

app.use(oakCors());

const routers = [aprendizRouter, programaRouter, profesionRouter, instructorRouter, fichaRouter,   fichaAprendizRouter];
routers.forEach((router) => {
    app.use(router.routes());
    app.use(router.allowedMethods());
});

console.log("Servidor corriendo en http://localhost:8001");
await app.listen({ port: 8001 });
