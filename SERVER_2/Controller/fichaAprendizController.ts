import { Context } from "../Dependencies/dependencias.ts";
import { FichaAprendiz } from "../Models/fichaAprendizModel.ts";

export const getRelacionesFichaAprendiz = async (ctx: Context) => {
    try {
        const objRelacion = new FichaAprendiz();
        const data = await objRelacion.seleccionarRelaciones();

        ctx.response.status = 200;
        ctx.response.body = { success: true, data: data };
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = { success: false, message: "Error al obtener las relaciones", error };
    }
};

export const postRelacionFichaAprendiz = async (ctx: Context) => {
    try {
        const contentLength = ctx.request.headers.get("Content-Length");
        if (contentLength === "0") {
            ctx.response.status = 400;
            ctx.response.body = { success: false, message: "El cuerpo de la solicitud está vacío" };
            return;
        }

        const body = await ctx.request.body.json();

        const datosRelacion = {
            ficha_idficha: body.ficha_idficha,
            aprendiz_idaprendiz: body.aprendiz_idaprendiz,
            instructor_idinstructor: body.instructor_idinstructor,
        };

        const objRelacion = new FichaAprendiz(datosRelacion);
        const resultado = await objRelacion.insertarRelacion();

        ctx.response.status = 200;
        ctx.response.body = resultado;
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = { success: false, message: "Error al procesar la solicitud: " + error };
    }
};
