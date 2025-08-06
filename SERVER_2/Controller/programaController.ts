import { Context } from "../Dependencies/dependencias.ts";
import { Programa } from "../Models/programaModel.ts";

export const getProgramas = async (ctx: Context) => {
    const { response } = ctx;

    try {
        const objPrograma = new Programa();
        const lista = await objPrograma.seleccionarProgramas();
        response.status = 200;
        response.body = { success: true, data: lista };
    } catch (error) {
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al procesar la solicitud",
            errors: error,
        };
    }
};

export const postPrograma = async (ctx: Context) => {
    const { response, request } = ctx;

    try {
        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, message: "Cuerpo de la solicitud está vacío" };
            return;
        }

        const body = await request.body.json();
        const programaData = {
            idprograma: null,
            nombre_programa: body.nombre_programa,
        };

        const objPrograma = new Programa(programaData);
        const result = await objPrograma.insertarPrograma();

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

