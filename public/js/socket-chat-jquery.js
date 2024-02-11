

let param = new URLSearchParams(window.location.search)
//referencia jquery
const divUsuario = $('#divUsuarios')
const formEnviar = document.querySelector('#formEnviar')
const divChatbox = document.querySelector('#divChatbox')
const small = document.querySelector('small')


let nombre = param.get('nombre')
let sala = param.get('sala')

//renderizado de personas
const renderizarUsuarios = (personas) => {
    // let personasCreadas = ''
    let sala = document.createElement('li')
    sala.innerHTML= `<a href="javascript:void(0)" class="active"> Chat de <span>${param.get('sala')}</span></a>
    `
    divUsuario.empty();
    divUsuario.append(sala)


    personas.forEach(element => {
        let personaCreada = document.createElement('li')
        personaCreada.innerHTML=`<a data-id=${element.id} class='selectUser' href="javascript:void(0)"><img src="assets/images/users/user.png" alt="user-img" class="img-circle"> <span>${element.nombre}<small class="text-success">online</small></span></a>`
        divUsuario.append(personaCreada)
    });
    
   
    
   
}


//con jquery  ".on"

divUsuario.on('click','.selectUser', (e)=>{
    console.log('tocando uno')
    console.log(e.target.dataset.id)
})
//sin jquery
// document.querySelector('#divUsuarios').addEventListener('click', function(event) {
//     if (event.target.matches('.selectUser')) {
//         console.log('Se hizo clic en un elemento .selectUser');
//     }
// });

formEnviar.addEventListener('submit', (e)=> {
    e.preventDefault()
    console.log('entrando al evento')
    //para borrar despues necesito la referencia del campo de entrada ... no su valor actual que seria document.getElementById('input-message').value
    let message = document.getElementById('input-message')

    if (message.value.trim().length === 0) {
        return
    }
    
    socket.emit('crearMensaje',{
       
        mensaje: message.value
        }
        ,cb => {

        message.value = '';
        message.focus()
        renderizarMens(cb,true)
           
           
        
    })
})


const renderizarMens= (element, yo) => {
    
    let adminC = 'danger'
    let chatImgl= ''
    if (element.nombre !== 'Admin') {
     
     adminC = 'info'
     chatImgl= ' <div class="chat-img"><img src="assets/images/users/user.png" alt="user" /></div>'
        
    }

    if(yo) {
        const li = document.createElement('li')
        li.className = 'reverse';
        li.innerHTML= `
        <div class="chat-content">
        <h5>${element.nombre}</h5>
        <div class="box bg-light-inverse">${element.mensaje}</div>
        </div>
        <div class="chat-img"><img src="assets/images/users/user.png" alt="user" /></div>
        <div class="chat-time">10:57 am</div>`
        
        divChatbox.appendChild(li)

    }else{
        
        console.log('viendo nombre',element)
        const li = document.createElement('li')
        li.innerHTML= `   
        ${chatImgl}
        <div class="chat-content">
            <h5>${element.nombre}</h5>
            <div class="box bg-light-${adminC}">${element.mensaje}</div>
        </div>
        <div class="chat-time">10:56 am</div>`
      //append : jquery
      divChatbox.appendChild(li)
    }
}

small.innerHTML = 'algo'
// const s = (element) => {
//     small.innerHTML = `${element.sala}`
// }