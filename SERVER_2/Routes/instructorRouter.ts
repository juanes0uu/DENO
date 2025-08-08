import {Router} from "../Dependencies/dependencias.ts";
import {getinstructor,postInstructor} from "../Controller/instructorController.ts"


const instructorRouter = new Router();

instructorRouter
    .get("/instructores",getinstructor)
    .post("/instructores",postInstructor)
<<<<<<< HEAD
=======
   
>>>>>>> 7eb541e02dd75320d81710719e6342def76b25e1

export { instructorRouter };