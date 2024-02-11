import  express from "express";
// import  chatViews  from "../routes/routes.chat.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

import * as http from "http";
import {Server as SocketIoServer} from "socket.io";
// import  handlebars  from "express-handlebars";
import { socketController } from "../server/sockets/socketsControllers.js";

//import.meta.url proporciona la URL del módulo actual en formato de URL. -- fileURLToPath es una función que convierte una URL en formato de URL a una ruta de sistema de archivos.
const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);




export class Server {

    constructor(){
      this.app = express();
      //creando un servidor http
      this.serverHttp = http.createServer(this.app);
      //info clientes conectados
      this.io = new SocketIoServer(this.serverHttp);
      
      this.midllewares();
    //   this.routes();
      this.sockets()

    }


    midllewares(){
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended:true}));

    this.app.use(express.static(path.join(_dirname,'../public')));
    
    // //registra el motor de plantillas Handlebars con Express
    // this.app.engine('handlebars', handlebars.engine());
    // //ubicacion de las plantillas para el renderizado
    // this.app.set('views',path.resolve(_dirname,'../views'));
    // //motor por defecto, extension handlebars o hbs
    // this.app.set('view engine','handlebars');


    }
    routes(){

    // this.app.use('/',chatViews);

    }

    sockets(){
        this.io.on('connection',socketController)
    }

    listen(){
        this.serverHttp.listen(3000,()=>{
            console.log('puerto conectado 3000')
        });
    };

}