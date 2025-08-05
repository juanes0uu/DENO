import { conexion } from "./conexion.ts";

interface ProgramaData {
    idprograma: number | null;
    nombre_programa: string;
}

export class Programa {
    public _objPrograma: ProgramaData | null;
    public _idPrograma: number | null;

    constructor(objPrograma: ProgramaData | null = null, idPrograma: number | null = null) {
        this._objPrograma = objPrograma;
        this._idPrograma = idPrograma;
    }

    async obtenerProgramas(): Promise<ProgramaData[]> {
        const { rows } = await conexion.execute("SELECT * FROM programa");
        return rows as ProgramaData[];
    }

    async insertarPrograma(): Promise<string> {
        if (!this._objPrograma) throw new Error("Datos no válidos");

        const { nombre_programa } = this._objPrograma;
        await conexion.execute("INSERT INTO programa(nombre_programa) VALUES (?)", [
            nombre_programa,
        ]);

        return "Programa creado correctamente";
    }
}
