import { Context } from "../Dependencies/dependencias.ts";
import { Profesion } from "../Models/profesionModel.ts";

export const getProfesiones = async (ctx: Context) => {
    const { response } = ctx;

    try {
        const objProfesion = new Profesion();
        const listaProfesiones = await objProfesion.SeleccionarProfesiones();
        response.status = 200;
        response.body = { success: true, data: listaProfesiones };
    } catch (error) {
        response.status = 400;
        response.body = { success: false, message: "Error al obtener las profesiones", errors: error };
    }
};

export const postProfesion = async (ctx: Context) => {
    const { request, response } = ctx;

    try {
        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, message: "El cuerpo de la solicitud está vacío" };
            return;
        }

        const body = await request.body.json();

        const profesionData = {
            idprofesion: null,
            nombre_profesion: body.nombre_profesion,
        };

        const objProfesion = new Profesion(profesionData);
        const result = await objProfesion.insertarProfesion();

        response.status = 200;
        response.body = {
            success: true,
            body: result,
        };
    } catch (error) {
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al procesar la solicitud: " + error,
        };
    }
};

