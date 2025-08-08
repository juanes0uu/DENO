import { conexion } from "./conexion.ts";
import { z } from "../Dependencies/dependencias.ts";

interface FichaData {
    idficha: number | null;
    codigo: string;
    fecha_inicio_lectiva: string;
    fecha_fin_lectiva: string;
    fecha_fin_practica: string;
    programa_idprograma: number;
}

export class Ficha {
    public _objFicha: FichaData | null;
    public _idFicha: number | null;

    constructor(objFicha: FichaData | null = null, idFicha: number | null = null) {
        this._objFicha = objFicha;
        this._idFicha = idFicha;
    }

    public async seleccionarFichas(): Promise<FichaData[]> {
        const { rows } = await conexion.execute(`SELECT * FROM ficha`);
        return rows as FichaData[];
    }

    public async insertarFicha(): Promise<{ success: boolean; message: string; ficha?: Record<string, unknown> }> {
        try {
            if (!this._objFicha) {
                throw new Error("No se ha proporcionado un objeto de ficha válido.");
            }

            const { codigo, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_fin_practica, programa_idprograma } = this._objFicha;

            if (!codigo || !fecha_inicio_lectiva || !fecha_fin_lectiva || !fecha_fin_practica || !programa_idprograma) {
                throw new Error("Faltan campos requeridos para insertar la ficha.");
            }

            await conexion.execute("START TRANSACTION");

            const result = await conexion.execute(
                `INSERT INTO ficha(codigo, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_fin_practica, programa_idprograma)  VALUES (?, ?, ?, ?, ?)`,
                [codigo, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_fin_practica, programa_idprograma]
            );

            if (result && typeof result.affectedRows === "number" && result.affectedRows > 0) {
                const [ficha] = await conexion.query(`SELECT * FROM ficha WHERE idficha = LAST_INSERT_ID()`);
                await conexion.execute("COMMIT");
                return { success: true, message: "Ficha registrada correctamente", ficha: ficha };
            } else {
                throw new Error("No fue posible registrar la ficha.");
            }

        } catch (error) {
            if (error instanceof z.ZodError) {
                return { success: false, message: error.message };
            } else {
                return { success: false, message: "Error interno en el servidor: " + error };
            }
        }
    }

    public async actualizarFicha(): Promise<{ success: boolean; message: string }> {
    try {
        if (!this._objFicha || !this._idFicha) {
            throw new Error("Datos de ficha no válidos para actualizar.");
        }

        const { codigo, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_fin_practica, programa_idprograma } = this._objFicha;

        await conexion.execute(
            `UPDATE ficha SET codigo = ?, fecha_inicio_lectiva = ?, fecha_fin_lectiva = ?, fecha_fin_practica = ?, programa_idprograma = ? WHERE idficha = ?`,
            [codigo, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_fin_practica, programa_idprograma, this._idFicha]
        );

        return { success: true, message: "Ficha actualizada correctamente" };
    } catch (error) {
        return { success: false, message: "Error al actualizar ficha: " + error };
    }
}

public async eliminarFicha(): Promise<{ success: boolean; message: string }> {
    try {
        if (!this._idFicha) {
            throw new Error("ID de ficha no proporcionado.");
        }

        await conexion.execute(`DELETE FROM ficha WHERE idficha = ?`, [this._idFicha]);

        return { success: true, message: "Ficha eliminada correctamente" };
    } catch (error) {
        return { success: false, message: "Error al eliminar ficha: " + error };
    }
}

}
