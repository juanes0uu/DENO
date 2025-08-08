import { conexion } from "./conexion.ts";       
import { z } from "../Dependencies/dependencias.ts";

interface InstructorData{
    idinstructor: number | null 
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
}


export class Instructor{
    public _objInstructor : InstructorData | null;
    public _idInstructor : number | null;

    //creamos el constructor de la clase 
    constructor (objInstructor: InstructorData | null = null, idInstructor:number | null = null){
        this._objInstructor = objInstructor;
        this._idInstructor = idInstructor;
    }



    //PruebaMetodo
    //el atributo si es accesible a traves de los metodos
    public async Seleccionarinstructores(): Promise<InstructorData[]>{
        const {rows: users} = await conexion.execute(`SELECT * FROM instructor`);
        return users as InstructorData[];
    }

    public async insertarInstructor():Promise<{success:boolean;message:string;instructor?: Record<string,unknown>}>{
        try {
            
            // validar que el objeto del constructor este cargado correctamente
            if(!this._objInstructor){
                throw new Error("No se ha proporcionado un objeto de instructor valido");
            }

            // validamos que el cuerpo contenga la informacion completa 
            const{nombre,apellido,email,telefono} = this._objInstructor;

            if (!nombre || !apellido || !email || !telefono){
                throw new Error("Faltan campos requeridos para insertar el instructor.");
            }
            // iniciar la transaccion con la base de datos e insertamos el instructor
            await conexion.execute("START TRANSACTION");
            const result = await conexion.execute('INSERT INTO instructor(nombre,apellido,direccion,telefono)value(?,?,?,?)',[
                nombre,
                apellido,
                email,
                telefono,
            ]);

            // validamos que se ejecute el insert de manera correcta y retornamos la respuesta
            if (result && typeof result.affectedRows === "number" && result.affectedRows > 0){
                const [instructor] = await conexion.query('SELECT * FROM instructor WHERE idinstructor = LAST_INSERT_ID()',);
                await conexion.execute("COMMIT");
                return {success:true,message:"instructor registrado correctamente",instructor:instructor};
            }else{
                throw new Error("No fue posible registrar el instructor.");
            }

        } catch (error) {
            if (error instanceof z.ZodError){
                return {success: false, message: error.message};
            }else{
                return {success: false, message: "Error interno en el servidor"};
            }
        }
    }
}