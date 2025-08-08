import {Router} from "../Dependencies/dependencias.ts";
import {getInstructores,postInstructor} from "../Controller/instructorController.ts"


const instructorRouter = new Router();

instructorRouter
    .get("/instructores",getInstructores)
    .post("/instructores",postInstructor)

export { instructorRouter };