


export class Usuarios {
    constructor() {
        this.personas = []
    }

    addUsuario(id,nombre,sala){
        let persona = {id,nombre,sala}
        this.personas.push(persona)

        return this.personas
    }

    getPersonaPorId(id) {
        let persona = this.personas.filter(element => element.id === id)[0]
        return persona
    }
    
    getPersona(){
        return this.personas
    }

    getPersonasPorSalas(sala) {
     let personasPorSala = this.personas.filter( personas => personas.sala === sala)
     return personasPorSala
    }
    deletepersona(id) {
        let personaBorrada = this.getPersonaPorId(id)

        this.personas = this.personas.filter(element => element.id != id)
        return personaBorrada

    }
}

export class CrearMensaje {
    constructor(){
     
        this.mensajeResult = {fecha: new Date().getTime()}

    }

    getMensaje(nombre,mensaje){
    this.mensajeResult.nombre = nombre
    this.mensajeResult.mensaje = mensaje
    return this.mensajeResult

    }
    
}