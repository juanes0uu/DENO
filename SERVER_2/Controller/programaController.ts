import { Context } from "../Dependencies/dependencias.ts";
import { Programa } from "../Models/programaModel.ts";

export const getProgramas = async (ctx: Context) => {
    try {
        const programa = new Programa();
        const lista = await programa.obtenerProgramas();
        ctx.response.status = 200;
        ctx.response.body = { success: true, data: lista };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { success: false, message: "Error al obtener programas", error };
    }
};

export const postPrograma = async (ctx: Context) => {
    const { request, response } = ctx;
    const body = await request.body.json();

    try {
        const nuevoPrograma = new Programa({
            idprograma: null,
            nombre_programa: body.nombre_programa,
        });

        const mensaje = await nuevoPrograma.insertarPrograma();
        response.status = 201;
        response.body = { success: true, message: mensaje };
    } catch (error) {
        response.status = 400;
        response.body = { success: false, message: "Datos inválidos", error };
    }
};
