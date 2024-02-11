import { CrearMensaje, Usuarios } from "../classes/usuarios.js"



const usuario = new Usuarios()
const crearMensaje = new CrearMensaje()

export const socketController = (socket) => {
    console.log('cliente conectado',socket.id)

    socket.on('entrarChat',(data,callback)=>{
        
        if (!data.nombre || !data.sala) {
            return callback({
                error:true,
                msg:'el nombre/sala es necesario'
            })
            
        }
        //envio usuario a sala mediante join
       socket.join(data.sala)
       
       usuario.addUsuario(socket.id,data.nombre,data.sala)
       socket.broadcast.to(data.sala).emit('listaUsuarios',usuario.getPersonasPorSalas(data.sala))
       socket.broadcast.to(data.sala).emit('crearMensaje', crearMensaje.getMensaje('Admin',`${data.nombre} entro al chat`) )

        

       callback(usuario.getPersonasPorSalas(data.sala))
        
    })
    socket.on('crearMensaje',(data , cb)=>{
        console.log('a ver la data',data)
        const persona = usuario.getPersonaPorId(socket.id)
        //no hace falta enviar via data el nombre de la persona, lo toma aca al valor ese
        let mensaje = crearMensaje.getMensaje(persona.nombre,data.mensaje)
        socket.broadcast.to(persona.sala).emit('crearMensaje',mensaje)
        cb(mensaje)
    })

    socket.on('disconnect',()=>{
        const personaBorrada = usuario.deletepersona(socket.id)
        console.log('esta es la persona borrada', personaBorrada)

        socket.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje.getMensaje('Admin',`${personaBorrada.nombre} salio del chat`) )
        socket.broadcast.to(personaBorrada.sala).emit('listaUsuarios',usuario.getPersonasPorSalas(personaBorrada.sala))

    })

    //mensajes privados
    socket.on('mensajePrivado',(data)=>{
        let persona = usuario.getPersonaPorId(socket.id)
        console.log('persona mensaje privado',persona)
        socket.broadcast.to(data.para).emit('mensajePrivado',crearMensaje.getMensaje(persona.nombre,data.mensaje))
    })
    


}

//{ usuario: 'Admin', msg: `${personaBorrada.nombre} abandono el chat`}