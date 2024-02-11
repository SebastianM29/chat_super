const socket = io()
const params = new URLSearchParams(window.location.search)

if (!params.has('nombre') || !params.has('sala')  ) {
     window.location = 'index.html'
     throw new Error('nombre y sala necesario')
}

let usuario = {
    nombre: params.get('nombre'),
    sala:params.get('sala')
}

console.log('hola mundo')
socket.on('connect', ()=> {
    console.log('conectado')

    socket.emit('entrarChat',usuario,(valueCb)=>{
       console.log('callback recibido,total usuarios',valueCb)
       renderizarUsuarios(valueCb)
    })
});



socket.on('disconnect', ()=> {
    console.log('desconectado del servidor')
});

// socket.emit('mensajeChat',)


//escuchar informacion
socket.on('crearMensaje', data => {
    renderizarMens(data,false)
   
})
//listar usuarios
socket.on('listaUsuarios', data => {
    console.log(data)
    renderizarUsuarios(data)
   
})
//mensajes privados
socket.on('mensajePrivado', mensaje => {
    console.log('mensaje privado:' , mensaje)
})

