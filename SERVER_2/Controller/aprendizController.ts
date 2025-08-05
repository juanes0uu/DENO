import { Context } from "../Dependencies/dependencias.ts";
import { Aprendiz } from "../Models/aprendizModel.ts";

export const getAprendices = async (ctx: Context) => {
    try {
        const aprendiz = new Aprendiz();
        const lista = await aprendiz.obtenerAprendices();
        ctx.response.status = 200;
        ctx.response.body = { success: true, data: lista };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { success: false, message: "Error", error };
    }
};

export const postAprendiz = async (ctx: Context) => {
    const { request, response } = ctx;
    const body = await request.body.json();

    try {
        const nuevoAprendiz = new Aprendiz({
            idaprendiz: null,
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        telefono: body.telefono,
    });

    const mensaje = await nuevoAprendiz.insertarAprendiz();
    response.status = 201;
    response.body = { success: true, message: mensaje };
    } catch (error) {
        response.status = 400;
        response.body = { success: false, message: "Datos inválidos", error };
    }
};
