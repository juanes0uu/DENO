import { conexion } from "./conexion.ts";
import { z } from "../Dependencies/dependencias.ts";

interface ProfesionData {
    idprofesion: number | null;
    nombre_profesion: string;
}

export class Profesion {
    public _objProfesion: ProfesionData | null;
    public _idProfesion: number | null;

    constructor(objProfesion: ProfesionData | null = null, idProfesion: number | null = null) {
        this._objProfesion = objProfesion;
        this._idProfesion = idProfesion;
    }

    public async SeleccionarProfesiones(): Promise<ProfesionData[]> {
        const { rows: profesiones } = await conexion.execute(`SELECT * FROM profesion`);
        return profesiones as ProfesionData[];
    }

    public async insertarProfesion(): Promise<{ success: boolean; message: string; profesion?: Record<string, unknown> }> {
        try {
            if (!this._objProfesion) {
                throw new Error("No se ha proporcionado un objeto de profesión válido");
            }

            const { nombre_profesion } = this._objProfesion;
            if (!nombre_profesion) {
                throw new Error("Faltan campos requeridos para insertar la profesión.");
            }

            await conexion.execute("START TRANSACTION");
            const result = await conexion.execute(
                `INSERT INTO profesion(nombre_profesion) VALUES (?)`,
                [nombre_profesion]
            );

            if (result && typeof result.affectedRows === "number" && result.affectedRows > 0) {
                const [profesion] = await conexion.query(`SELECT * FROM profesion WHERE idprofesion = LAST_INSERT_ID()`);
                await conexion.execute("COMMIT");
                return { success: true, message: "Profesión registrada correctamente", profesion: profesion };
            } else {
                throw new Error("No fue posible registrar la profesión.");
            }

        } catch (error) {
            if (error instanceof z.ZodError) {
                return { success: false, message: error.message };
            } else {
                return { success: false, message: "Error interno en el servidor" };
            }
        }
    }
}
