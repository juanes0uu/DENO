import { conexion } from "./conexion.ts";       
import { z } from "../Dependencies/dependencias.ts";


interface FichaData{
    idFicha: number | null 
    codigo: string;
    fecha_inicio_lectiva: Date;
    fecha_fin_lectiva: Date;
    fecha_fin_practica: Date;
    programa_idprograma: string;

}


export class Ficha{
    public _objFicha : FichaData | null;
    public _idFicha : number | null;

    //creamos el constructor de la clase 
    constructor (objFicha: FichaData | null = null, idFicha:number | null = null){
        this._objFicha = objFicha;
        this._idFicha = idFicha;
    }



    //PruebaMetodo
    //el atributo si es accesible a traves de los metodos
    public async SeleccionarFichaes(): Promise<FichaData[]>{
        const {rows: users} = await conexion.execute(`SELECT * FROM Ficha`);
        return users as FichaData[];
    }

    public async insertarFicha():Promise<{success:boolean;message:string;Ficha?: Record<string,unknown>}>{
        try {
            
            // validar que el objeto del constructor este cargado correctamente
            if(!this._objFicha){
                throw new Error("No se ha proporcionado un objeto de Ficha valido");
            }

            // validamos que el cuerpo contenga la informacion completa 
            const{codigo,fecha_inicio_lectiva,fecha_fin_lectiva,fecha_fin_practica} = this._objFicha;

            if (!codigo || !fecha_inicio_lectiva || !fecha_fin_lectiva || !fecha_fin_practica){
                throw new Error("Faltan campos requeridos para insertar el Ficha.");
            }
            // iniciar la transaccion con la base de datos e insertamos el Ficha
            await conexion.execute("START TRANSACTION");
            const result = await conexion.execute('INSERT INTO Ficha(codigo,fecha_inicio_lectiva,direccion,fecha_fin_practica)value(?,?,?,?)',[
                codigo,
                fecha_inicio_lectiva,
                fecha_fin_lectiva,
                fecha_fin_practica,
            ]);

            // validamos que se ejecute el insert de manera correcta y retornamos la respuesta
            if (result && typeof result.affectedRows === "number" && result.affectedRows > 0){
                const [Ficha] = await conexion.query('SELECT * FROM Ficha WHERE idFicha = LAST_INSERT_ID()',);
                await conexion.execute("COMMIT");
                return {success:true,message:"Ficha registrada correctamente",Ficha:Ficha};
            }else{
                throw new Error("No fue posible registrar el Ficha.");
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