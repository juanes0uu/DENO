import { Context } from "../Dependencies/dependencias.ts";
import { Profesion } from "../Models/profesionModel.ts";

export const getProfesiones = async (ctx: Context) => {
    try {
        const profesion = new Profesion();
        const lista = await profesion.obtenerProfesiones();
        ctx.response.status = 200;
        ctx.response.body = { success: true, data: lista };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { success: false, message: "Error", error };
    }
};

export const postProfesion = async (ctx: Context) => {
    const { request, response } = ctx;
    const body = await request.body.json();

    try {
        const nuevaProfesion = new Profesion({
            idprofesion: null,
            nombre_profesion: body.nombre_profesion,
        });

        const mensaje = await nuevaProfesion.insertarProfesion();
        response.status = 201;
        response.body = { success: true, message: mensaje };
    } catch (error) {
        response.status = 400;
        response.body = { success: false, message: "Datos inválidos", error };
    }
};
