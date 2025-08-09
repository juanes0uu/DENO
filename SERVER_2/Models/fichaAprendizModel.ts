import { conexion } from "./conexion.ts";


interface FichaAprendizData {
    ficha_idficha: number;
    aprendiz_idaprendiz: number;
    instructor_idinstructor: number;
}

export class FichaAprendiz {
    public _objFichaAprendiz: FichaAprendizData | null;

    constructor(objFichaAprendiz: FichaAprendizData | null = null) {
        this._objFichaAprendiz = objFichaAprendiz;
    }

    public async seleccionarRelaciones(): Promise<FichaAprendizData[]> {
        const { rows } = await conexion.execute(`SELECT * FROM ficha_has_aprendiz`);
        return rows as FichaAprendizData[];
    }

    public async insertarRelacion(): Promise<{ success: boolean; message: string }> {
        try {
            if (!this._objFichaAprendiz) {
                throw new Error("Datos incompletos para la relación ficha-aprendiz-instructor.");
            }

            const { ficha_idficha, aprendiz_idaprendiz, instructor_idinstructor } = this._objFichaAprendiz;

            if (!ficha_idficha || !aprendiz_idaprendiz || !instructor_idinstructor) {
                throw new Error("Faltan campos requeridos.");
            }

            await conexion.execute("START TRANSACTION");

            await conexion.execute(
                `INSERT INTO ficha_has_aprendiz(ficha_idficha, aprendiz_idaprendiz, instructor_idinstructor) VALUES (?, ?, ?)`,
                [ficha_idficha, aprendiz_idaprendiz, instructor_idinstructor]
            );

            await conexion.execute("COMMIT");

            return { success: true, message: "Relación registrada correctamente" };
        } catch (error) {
            return { success: false, message: "Error al insertar relación: " + error };
        }
    }
}
