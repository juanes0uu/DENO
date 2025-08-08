import { Context } from "../Dependencies/dependencias.ts"
import { Ficha } from "../Models/fichaModel.ts"; 


export const getFicha = async(ctx:Context)=>{
   const {response} = ctx;

   try {

        const objListaUsuarios = new Ficha();
        const ListaUsuarios = await objListaUsuarios.SeleccionarFichaes();
        response.status = 200;
        response.body = {success:true,data:ListaUsuarios};


   }catch(error) {
        response.status = 400;
        response.body = {success:false,message: "Error al procesar la solicitud ", errors:error};
     }
}

export const postFicha = async (ctx:Context)=>{
    const {response,request}= ctx;

   
     try {
        const contentLength = request.headers.get("Content-Length");//me avisa si tengo datos o no
        if (contentLength === "0"){
            response.status = 400;
            response.body = {success:false,message:"Cuerpo de la solicitud esta vacio"};
            return;
        }

        const body = await request.body.json();
        const FichaData = {
            idFicha: null,
            codigo: body.codigo, 
            fecha_inicio_lectiva: new Date(body.fecha_inicio_lectiva), 
            fecha_fin_lectiva: new Date(body.fecha_fin_lectiva),       
            fecha_fin_practica: new Date(body.fecha_fin_practica),     
            programa_idprograma: body.programa_idprograma 

        }

         const objFicha = new Ficha(FichaData);
         const result = await objFicha.insertarFicha();
         response.status = 200;
         response.body = {
             success:true,
             body:result, 
        }
    } catch (error) {
        response.status = 400;
        response.body = {
            success:false,
            message:"Error al procesar la solicitud: "+ error
        }
    }
}

export const putFicha = (ctx:Context)=>{

}

export const deleteFicha = (ctx:any)=>{
    const id = ctx.params.id;
    console.log('Eliminando Ficha con el id: '+ id);
    ctx.response.status = 200;
    ctx.response.body = {success:true,message: "Eliminando usuario con el id" + id};
}
cambiooschs