import { Context } from "../Dependencies/dependencias.ts"
import { Instructor } from "../Models/instructorModel.ts"; 


export const getinstructor = async(ctx:Context)=>{
    const {response} = ctx;

    try {

        const objListaUsuarios = new Instructor();
        const ListaUsuarios = await objListaUsuarios.Seleccionarinstructores();
        response.status = 200;
        response.body = {success:true,data:ListaUsuarios};


    }catch(error) {
        response.status = 400;
        response.body = {success:false,message: "Error al procesar la solicitud ", errors:error};
    }
}

export const postInstructor = async (ctx:Context)=>{
    const {response,request}= ctx;

    try {
        const contentLength = request.headers.get("Content-Length");//me avisa si tengo datos o no
        if (contentLength === "0"){
            response.status = 400;
            response.body = {success:false,message:"Cuerpo de la solicitud esta vacio"};
            return;
        }

        const body = await request.body.json();
        const InstructorData = {
            idinstructor: null,
            nombre: body.nombre,
            apellido: body.apellido,
            email: body.email,
            telefono: body.telefono,
        }

        const objInstructor = new Instructor(InstructorData);
        const result = await objInstructor.insertarInstructor();
        response.status = 200;
        response.body = {
            success:true,
            body:result, 
        }
    } catch (error) {
        response.status = 400;
        response.body = {
            success:false,
            message:"Error al procesar la solicitud: "+ error
        }
    }
}

