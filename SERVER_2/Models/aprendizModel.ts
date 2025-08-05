import { conexion } from "./conexion.ts";

interface AprendizData {
    idaprendiz: number | null;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
}

export class Aprendiz {
    public _objAprendiz: AprendizData | null;
    public _idAprendiz: number | null;

    constructor(objAprendiz: AprendizData | null = null, idAprendiz: number | null = null) {
        this._objAprendiz = objAprendiz;
        this._idAprendiz = idAprendiz;
    }

    async obtenerAprendices(): Promise<AprendizData[]> {
        const { rows } = await conexion.execute("SELECT * FROM aprendiz");
        return rows as AprendizData[];
    }

    async insertarAprendiz(): Promise<string> {
        if (!this._objAprendiz) throw new Error("Datos no válidos");

        const { nombre, apellido, email, telefono } = this._objAprendiz;
        await conexion.execute(`INSERT INTO aprendiz(nombre, apellido, email, telefono) VALUES (?, ?, ?, ?)`, [
            nombre,
            apellido,
            email,
            telefono,
        ]);

        return "Aprendiz creado correctamente";
    }

  // Métodos update/delete opcionalmente después
}
