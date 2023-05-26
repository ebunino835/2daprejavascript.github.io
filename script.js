
//Funcion que realiza la validacion de lo que desea realizar el usurio, ya sea, seguir operando o no
function seguirOperando(respuesta){
    if (respuesta == 's'){
        return true;
    }else {
        return false;  
    }
    
}

//Funcion que valida que la respuesta ingresada por el usuario, sea una de las alternativas posibles
function validadorRespuesta(respuesta){
    if (respuesta == 's' || respuesta == 'n'){
        return true;
    }else{
        return false;
    }

}

//Funcion del menu de opciones, salvo la opcion 5 que esta por afuera de este menu
function menuOpciones(opcion){
    switch (opcion) {
        case 1: 
            contador++;
            registrarse();
            break;
        case 2: 
            ingresarCarrera();
            break;
        case 3:
            actualizarDatos();
            break;
        case 4:
            eliminar();
            break;
        default:
            alert ("La opcion ingresada en Invalida")
    }
}

// Funcion simbolica, solo se demuestra que en caso de ser invocada, se ingresa a la misma
function registrarse(){
    alert ("Bienvenido al Registro del sistema");
    let nombre = prompt("Ingrese Nombre:");
    let apellido = prompt("Ingrese Apellido:");
    let dni = prompt("Ingrese DNI:");

    let persona1 = new Persona(apellido, nombre, dni);
    personas.push(persona1);
}

// Funcion simbolica, solo se demuestra que en caso de ser invocada, se ingresa a la misma
function ingresarCarrera(){
    if(contador>0){
        let i = 0;
        alert ("Estas Personas Figuran en sistema");
        while (i<contador){
            alert(`${i}. ${personas[i].apellido}`)
            i++;
        }
        i= parseInt(prompt("A que persona desea cargarle la carrera"))
        let carrera=parseInt(prompt("Numero de Carrera de 1 a 10"))
        let tiempo =60 * parseInt(prompt("Cantidad de horas que demoro en completar el recorrido"))
        tiempo = tiempo + parseInt(prompt("Cantidad de minutos extras (ademas de las horas) que demoro en completar el recorrido"))
        personas[i].cargarCarrera(carrera, tiempo)
    }else{
        alert("Aun no hay personas cargadas!")
    }
    
}

// Funcion simbolica, solo se demuestra que en caso de ser invocada, se ingresa a la misma
function actualizarDatos(){
    if(contador>0){
        let i = 0;
        alert ("A estas personas se les puede actualizar los datos");
        while (i<contador){
            alert(`${i}. ${personas[i].apellido} ${personas[i].nombre}`)
            i++;
        }
        i= parseInt(prompt("A que persona desea actualizarle los datos"))
        let apellido=prompt("Apellido: ")
        let nombre =prompt("Nombre: ");
        let dni =prompt("DNI");
        personas[i].actualizaData(apellido, nombre, dni);
    }else{
        alert("Aun no hay personas registradas")
    }
}

// Funcion simbolica, solo se demuestra que en caso de ser invocada, se ingresa a la misma
function eliminar(){
    if(contador>0){
        let i = 0;
        alert ("A estas personas se las puede eliminar");
        while (i<contador){
            alert(`${i}. ${personas[i].apellido} ${personas[i].nombre}`)
            i++;
        }
        i= parseInt(prompt("A que persona desea Eliminar"))
        let x = contador-1;
        while(i<x){
            personas[i].nombre=personas[i+1].nombre;
            personas[i].apellido=personas[i+1].apellido;
            personas[i].dni=personas[i+1].dni;
            personas[i].duracion=personas[i+1].duracion;
            personas[i].posicion=personas[i+1].posicion;
            personas[i].observacion=personas[i+1].observacion;
            i++;
        }
        contador--;
    }else{
        alert("Aun no hay personas registradas")
    }
}

// Funcion principal, contiene la utilizacion de las funciones anteriores
function principal (){
    let respuesta_usuario = 's'; //Defino la variable y la inicializo de este modo para que por lo mismo el ciclo se ejecute una vez. Quiero
                                 // aclarar que intente realizar esto con el do-While (que siempre se ejecuta la menos una vez) pero por algun motivo
                                 // no funcionaba.
    while(seguirOperando(respuesta_usuario)){ //Desplega las opciones posibles, en caso de ser 5 sale del sistema automaticamente, en 
                                              //  los otros casos invoca a la funcion que efectivamente tiene el menu de opciones.
        let op = parseInt( prompt("Menú de Opciones \n Seleccione la opcion que desee:\n 1. Registrar Persona\n 2. Registrar Carrera \n 3. Actualizar Datos \n 4.Eliminarse del sistema \n 5.Salir"));
        if (op === 5){
            break;
        }else{
            menuOpciones(op);
            respuesta_usuario = (prompt("¿¿Desea seguir operando?? \n S = Si\n N= No")).toLowerCase();
        }
    
        while(!(validadorRespuesta(respuesta_usuario))){  //Como le nombre lo indica, valida que la respuesta recibida de parte del usuario sea una 
                                                        //de las posibles 
            alert ("La opcion ingresada es Invalida. Intentelo Nuevamente: ");
            respuesta_usuario = prompt("¿¿Desea seguir operando?? \n S = Si\n N= No")
        }
    }

    alert("Fin del Sistema \n MUCHAS GRACIAS!!!")
}


class Persona{
    constructor(apellido, nombre, dni){
        this.apellido = apellido;
        this.nombre = nombre;
        this.dni = dni;
        this.carrera = 0;
        this.duracion = 0;
        this.posicion= -1;
        this.observacion="";
    }

    cargarCarrera( carrera, duracion){
        if(carrera > 0 && carrera <=10){
            this.carrera = carrera
            this.duracion = duracion;
        } else {
            alert("La carrera ingresada es invalida");
        }
    }

    cargaObservacion(){
        if(this.duracion >= 330){
            this.observacion = "Mal";
        }else if(this.duracion < 330 && this.duracion > 261){
            this.observacion = "Regular";
        } else if(this.duracion <= 261 && this.duracion > 240){
            this.observacion = "Muy bueno";
        }else if(this.duracion <= 240){
            this.observacion = "Excelente";
        }
    }

    actualizaData(apellido, nombre, dni){
        this.apellido = apellido;
        this.nombre = nombre;
        this.dni = dni;
    }

    cargaPosicion(posicion){
        this.posicion = posicion;
    }

    mostrarDatos(){
        alert(`${this.apellido} ${this.nombre} corrio la carrera ${this.carrera} obtuvo la posicion ${this.posicion} con un desempeño ${this.observacion}`)
    }
}

const personas =[];
let contador =0;
principal()