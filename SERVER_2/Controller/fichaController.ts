import { Context } from "../Dependencies/dependencias.ts";
import { Ficha } from "../Models/fichaModel.ts";

export const getFichas = async (ctx: Context) => {
    const { response } = ctx;

    try {
        const objFicha = new Ficha();
        const listaFichas = await objFicha.seleccionarFichas();

        response.status = 200;
        response.body = { success: true, data: listaFichas };
    } catch (error) {
        response.status = 400;
        response.body = { success: false, message: "Error al procesar la solicitud", errors: error };
    }
};

export const postFicha = async (ctx: Context) => {
    const { request, response } = ctx;

    try {
        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, message: "Cuerpo de la solicitud está vacío" };
            return;
        }

        const body = await request.body.json();

        const fichaData = {
            idficha: null,
            codigo: body.codigo,
            fecha_inicio_lectiva: body.fecha_inicio_lectiva,
            fecha_fin_lectiva: body.fecha_fin_lectiva,
            fecha_fin_practica: body.fecha_fin_practica,
            programa_idprograma: body.programa_idprograma,
        };

        const objFicha = new Ficha(fichaData);
        const resultado = await objFicha.insertarFicha();

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