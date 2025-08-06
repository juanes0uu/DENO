import { Context } from "../Dependencies/dependencias.ts";
import { Aprendiz } from "../Models/aprendizModel.ts";

export const getAprendices = async (ctx: Context) => {
    const { response } = ctx;

    try {
        const objAprendiz = new Aprendiz();
        const listaAprendices = await objAprendiz.seleccionarAprendices();

        response.status = 200;
        response.body = { success: true, data: listaAprendices };
    } catch (error) {
        response.status = 400;
        response.body = { success: false, message: "Error al procesar la solicitud", errors: error };
    }
};

export const postAprendiz = async (ctx: Context) => {
    const { request, response } = ctx;

    try {
        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, message: "Cuerpo de la solicitud está vacío" };
            return;
        }

        const body = await request.body.json();

        const aprendizData = {
            idaprendiz: null,
            nombre: body.nombre,
            apellido: body.apellido,
            email: body.email,
            telefono: body.telefono,
        };

        const objAprendiz = new Aprendiz(aprendizData);
        const resultado = await objAprendiz.insertarAprendiz();

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
