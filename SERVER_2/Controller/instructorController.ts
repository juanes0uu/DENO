import { Context } from "../Dependencies/dependencias.ts";
import { Instructor } from "../Models/instructorModel.ts";

export const getInstructores = async (ctx: Context) => {
    const { response } = ctx;

    try {
        const objInstructor = new Instructor();
        const listaInstructores = await objInstructor.Seleccionarinstructores();

        response.status = 200;
        response.body = { success: true, data: listaInstructores };
    } catch (error) {
        response.status = 400;
        response.body = { success: false, message: "Error al procesar la solicitud", errors: error };
    }
};

export const postInstructor = async (ctx: Context) => {
    const { request, response } = ctx;

    try {
        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, message: "Cuerpo de la solicitud está vacío" };
            return;
        }

        const body = await request.body.json();

        const instructorData = {
            idinstructor: null,
            nombre: body.nombre,
            apellido: body.apellido,
            email: body.email,
            telefono: body.telefono,
        };

        const objInstructor = new Instructor(instructorData);
        const resultado = await objInstructor.insertarInstructor();

        response.status = 200;
        response.body = {
            success: true,
            body: resultado,
        };
    } catch (error) {
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al procesar la solicitud: " + error,
        };
    }
};
