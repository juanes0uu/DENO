import { conexion } from "./conexion.ts";

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

    async obtenerProfesiones(): Promise<ProfesionData[]> {
        const { rows } = await conexion.execute("SELECT * FROM profesion");
        return rows as ProfesionData[];
    }

    async insertarProfesion(): Promise<string> {
        if (!this._objProfesion) throw new Error("Datos no válidos");

        const { nombre_profesion } = this._objProfesion;
        await conexion.execute(`INSERT INTO profesion(nombre_profesion) VALUES (?)`, [nombre_profesion]);

        return "Profesión creada correctamente";
    }
}
