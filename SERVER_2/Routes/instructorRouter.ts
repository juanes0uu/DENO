import {Router} from "../Dependencies/dependencias.ts";
import {getinstructor,postInstructor} from "../Controller/instructorController.ts"


const instructorRouter = new Router();

instructorRouter
    .get("/instructores",getinstructor)
    .post("/instructores",postInstructor)

export { instructorRouter };