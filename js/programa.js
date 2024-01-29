window.onload = function(){
    // Captura de botones
    const botonesOpciones = [
        "botonGenerar",
        "botonGenerarPersonas",
        "botonGenerarCantidadPersonas",
        "botonGenerarEstudiantes",
        "botonGenerarCantidadEstudiantes",
        "botonVerPersonas",
        "botonVerEstudiantes",
        "botonVerNotaModulo",
        "botonVerNotaDNI",
        "botonEditarNota",
        "botonEditarNotaDNI",
        "botonclaseestudiantes",
        "botonOrdenarDNI",
        "botonOrdenarFechaNac",
        "botonOrdenarNotaMedia",
        "botonOrdenarDNIDesc",
        "botonOrdenarFechaNacDesc",
        "botonOrdenarNotaMediaDesc",
        "botonbusquedas",
        "botonSecuencial",
        "botonBinaria"
    ];

    for(let i = 0; i < botonesOpciones.length; i++){
        let botones = document.getElementById(botonesOpciones[i]);
        botones.addEventListener("click", mostrarOpcion);
    }

    function mostrarOpcion(e){
        mostrar(e.target.id);
    }

    // Captura de botones Volver
    for(let i = 1; i < 10; i++){
        const botonVolver = document.getElementById("volver" + i);
        botonVolver.addEventListener("click", mostrarVolver);
    }

    function mostrarVolver(e){
        volver(e.target.id);
    }
}

// Se definen los arrays para la actividad 1 (aunque no es necesario me
// ha parecido interesante para poder hacer la actividad). En la actividad 2
// se utilizará la clase Estudiantes
let personas = []
let estudiantes = [];

// Se define e inicializa claseestudiantes para la actividad 3
let claseestudiantes = new Estudiantes();

// Variables de tiempo para el ejercicio 4
let inicio;
let fin;

// Variable auxiliar
let personaaux;

// Función para generar personas pasando por campo la cantidad
function generarPersonas(tipo, cantidad){
    /* Generamos las personas de manera aleatoria */
    for(let i = 0; i < cantidad; i++){
        // Se generan los datos
        let genero = generarGenero();
        let nombre = generarNombre(genero);
        let apellidos = generarApellidos();
        let dni = generarDNI(personas);
        let fechaNac = generarFechaNac();

        // Se crea Persona
        let persona = new Persona(dni, nombre, apellidos, genero, fechaNac);

        if(tipo == 0){
            // En caso de haber generado personas se añade al array
            personas.push(persona);
        }
        else{
            // En caso de haber generado estudiantes, se envía persona a la función de crear estudiantes
            generarEstudiantes(persona);
        }
    }
}

// Función para generar estudiantes recibiendo la persona ya generada
function generarEstudiantes(persona){
    // Generamos los módulos aleatorios con su respectiva nota comprobando que
    // los módulos no se seleccionen repetidos
    let modulos = [];
    let notas = [];

    // Se establece un mínimo y un máximo de módulos por estudiante
    // (en este caso he puesto mínimo 3 y máximo 10)
    let cantidad = Math.floor(Math.random() * 8) + 3;
    for(let i = 0; i < cantidad; i++){
        let correcto = true;
        let modulo;
        do{
            correcto = true;
            modulo = listaasignaturas[Math.floor(Math.random() * (listaasignaturas.length))];
            for(let j = 0; j < modulos.length; j++){
                if(modulo == modulos[j]){
                    correcto = false;
                }
            }
        }while(!correcto);
        modulos.push(modulo);
        notas.push(Math.floor(Math.random() * 11));
    }

    // Se crea el estudiante y se añade al array
    let estudiante = new Estudiante(persona.dni, persona.nombre, persona.apellidos, persona.genero, persona.fechaNac, modulos, notas);
    estudiantes.push(estudiante);
}

// Función que genera un género aleatorio en base a 1 ó 2
function generarGenero(){
    let genero = Math.floor(Math.random() * 2) == 1;
    if(genero == 1){
        return "Hombre";
    }
    else{
        return "Mujer";
    }
}

// Función que genera un nombre aleatorio segun el género pasado
function generarNombre(genero){
    let nombre;

    // Generamos el nombre aleatorio
    if(genero == "Hombre"){
        nombre = listanombresmasculinos[Math.floor(Math.random() * listanombresmasculinos.length)];
    }
    else{
        nombre = listanombresfemeninos[Math.floor(Math.random() * listanombresfemeninos.length)];
    }

    return nombre;
}

// Función que genera dos apellidos aleatorios
function generarApellidos(){
    let apellidos = listaapellidos[Math.floor(Math.random() * listaapellidos.length)] + " " + listaapellidos[Math.floor(Math.random() * listaapellidos.length)];

    return apellidos;
}

// Función que genera un DNI único
function generarDNI(personas){
    let dniCorrecto = true;
    let letrasDNI = "TRWAGMYFPDXBNJZSQVHLCKE";
    let dni;

    do{
        dniCorrecto = true;
        dni = Math.floor(Math.random() * 100000000) + 1;
        dni += "-" + letrasDNI.charAt(dni % 23);
        dni = dni.toString().padStart(10, '0');
        for(let i = 0; i < personas.length && dniCorrecto; i++){
            if(personas[i].dni == dni){
                dniCorrecto = false;
            }
        }
    }while(dniCorrecto == false);

    return dni;
}

// Función que genera una fecha de nacimiento aleatoria entre un mínimo y un máximo establecidos
function generarFechaNac(){
    const fechaInicio = new Date('1970-01-01');
    const fechaFin = new Date('1999-12-31');
    const diferencia = fechaFin.getTime() - fechaInicio.getTime();

    let fechaAleatoria = Math.floor(Math.random() * diferencia);
    fechaAleatoria = new Date(fechaInicio.getTime() + fechaAleatoria);
    let fecha = fechaAleatoria.toISOString().toString().substring(0, 10);
    return fecha;
}

/* Función para entrar en cada una de las opciones del menu */
function mostrar(opcion){
    if(opcion == "botonGenerar"){
        document.getElementById("main").style.display = "none";
        document.getElementById("verGenerar").style.display = "flex";
    }
    else if(opcion == "botonGenerarPersonas"){
        document.getElementById("verGenerar").style.display = "none";
        document.getElementById("verGenerarPersonas").style.display = "flex";
    }
    else if(opcion == "botonGenerarCantidadPersonas"){
        botonGenerarPersonas();
    }
    else if(opcion == "botonGenerarEstudiantes"){
        document.getElementById("verGenerar").style.display = "none";
        document.getElementById("verGenerarEstudiantes").style.display = "flex";
    }
    else if(opcion == "botonGenerarCantidadEstudiantes"){
        botonGenerarEstudiantes();
    }
    else if(opcion == "botonVerPersonas"){
        document.getElementById("main").style.display = "none";
        document.getElementById("verPersonas").style.display = "flex";
        mostrarVerPersonas();
    }
    else if(opcion == "botonVerEstudiantes"){
        estudiantes.length < 10
            ?   sinEstudiantes()
            :   (document.getElementById("main").style.display = "none",
                document.getElementById("verEstudiantes").style.display = "flex",
                mostrarVerEstudiantes("mostrarEstudiantes"));
    }
    else if(opcion == "botonVerNotaModulo"){
        estudiantes.length < 10
            ?   sinEstudiantes()
            :   (document.getElementById("main").style.display = "none",
                document.getElementById("verNota").style.display = "flex",
                crearMenuAsignaturas("veropcionesmodulo"));
    }
    else if(opcion == "botonVerNotaDNI"){
        let coincidencia = comprobarDNI("dniVerNota", estudiantes);
        document.getElementById("dniVerNota").value = "";
        coincidencia != 0 ? verEditarNota(coincidencia, "ver") : alert("DNI NO ENCONTRADO");
    }
    else if(opcion == "botonEditarNota"){
        estudiantes.length < 10
            ?   sinEstudiantes()
            :   (document.getElementById("main").style.display = "none",
                document.getElementById("editarNota").style.display = "flex",
                crearMenuAsignaturas("editaropcionesmodulo"),
                crearMenuNotas("editaropcionesnota"));
    }
    else if(opcion == "botonEditarNotaDNI"){
        let coincidencia = comprobarDNI("dniEditarNota", estudiantes);
        document.getElementById("dniEditarNota").value = "";
        coincidencia !== 0 ? verEditarNota(coincidencia, "editar") : alert("DNI NO ENCONTRADO");
    }
    else if(opcion == "botonclaseestudiantes"){
        estudiantes.length < 10
            ?   sinEstudiantes()
            :   (document.getElementById("main").style.display = "none",
                document.getElementById("verClaseEstudiantes").style.display = "flex",
                volcarEstudiantes(),
                mostrarVerEstudiantes("mostrarEstudiantes2"));
    }
    else if(opcion == "botonOrdenarDNI"){
        claseestudiantes.ordenar("dni");
        claseestudiantes.mostrarPantalla("mostrarEstudiantes2", "Por DNI");
    }
    else if(opcion == "botonOrdenarFechaNac"){
        claseestudiantes.ordenar("fechaNac");
        claseestudiantes.mostrarPantalla("mostrarEstudiantes2", "Por Fecha Nacimiento");
    }
    else if(opcion == "botonOrdenarNotaMedia"){
        claseestudiantes.ordenar("calcularNotaMedia");
        claseestudiantes.mostrarPantalla("mostrarEstudiantes2", "Por Nota Media");
    }
    else if(opcion == "botonOrdenarDNIDesc"){
        claseestudiantes.ordenarDesc("dni");
        claseestudiantes.mostrarPantalla("mostrarEstudiantes2", "Por DNI");
    }
    else if(opcion == "botonOrdenarFechaNacDesc"){
        claseestudiantes.ordenarDesc("fechaNac");
        claseestudiantes.mostrarPantalla("mostrarEstudiantes2", "Por Fecha Nacimiento");
    }
    else if(opcion == "botonOrdenarNotaMediaDesc"){
        claseestudiantes.ordenarDesc("calcularNotaMedia");
        claseestudiantes.mostrarPantalla("mostrarEstudiantes2", "Por Nota Media");
    }
    else if(opcion == "botonbusquedas"){
        let dnibajo;
        let dnialto;
        let divDNI;

        estudiantes.length < 10
            ?   sinEstudiantes()
            :   (document.getElementById("main").style.display = "none",
                document.getElementById("verBuscarPorDNI").style.display = "flex",
                document.getElementById("mostrarEstudiante").innerHTML = "",
                volcarEstudiantes(),
                claseestudiantes.ordenar("dni"),
                dnibajo = claseestudiantes.solicitarEstudiante(0).dni,
                dnialto = claseestudiantes.solicitarEstudiante(claseestudiantes.cantidadEstudiantes() - 1).dni,

                document.getElementById("informaciondni").innerHTML = "",
                divDNI = document.createElement('div'),
                divDNI.className = "fila",
                divDNI.innerHTML = "Bajo: " + dnibajo + "<br>Alto: " + dnialto,
                document.getElementById("informaciondni").appendChild(divDNI));
    }
    else if(opcion == "botonSecuencial"){
        volcarEstudiantes();
        inicio = new Date();
        claseestudiantes.busquedaSecuencial(document.getElementById("dniBusqueda").value);
        fin = new Date();
        mostrarMensaje(2, "tiempoMensaje", "fila", 1);
    }
    else if(opcion == "botonBinaria"){
        volcarEstudiantes();
        claseestudiantes.ordenar("dni");
        inicio = new Date();
        claseestudiantes.busquedaBinaria(document.getElementById("dniBusqueda").value);
        fin = new Date();
        mostrarMensaje(2, "tiempoMensaje", "fila", 1);
    }
}

// Función que genera personas pasandole por campo el número
function botonGenerarPersonas(){
    let cantidad = parseInt(document.getElementById("cantidadpersonas").value);
    if(isNaN(cantidad) || cantidad < 1){
        mostrarMensaje(3, "cantidadPersonasMensaje", "fila", 1);
    }
    else if((cantidad + personas.length) > 300000){
        mostrarMensaje(4, "cantidadPersonasMensaje", "fila", 1);
    }
    else{
        generarPersonas(0, cantidad);
        alert(cantidad + " personas nuevas generadas\nNúmero total de Personas: " + personas.length);
        document.getElementById("cantidadPersonasMensaje").innerHTML = "";
    }
    document.getElementById("cantidadpersonas").value = "";
}

// Función que genera estudiantes pasandole por campo el número
function botonGenerarEstudiantes(){
    let cantidad = parseInt(document.getElementById("cantidadestudiantes").value);
    if(isNaN(cantidad) || cantidad < 10){
        mostrarMensaje(3, "cantidadEstudiantesMensaje", "fila", 1);
    }
    else if((cantidad + estudiantes.length) > 300000){
        mostrarMensaje(4, "cantidadEstudiantesMensaje", "fila", 1);
    }
    else{
        generarPersonas(1, cantidad);
        alert(cantidad + " estudiantes nuevos generados\nNúmero total de Estudiantes: " + estudiantes.length);
        document.getElementById("cantidadEstudiantesMensaje").innerHTML = "";
    }
    document.getElementById("cantidadestudiantes").value = "";
}

function sinEstudiantes(){
    alert("No hay estudiantes.\nPulse en Generar para crear un mínimo de 10 estudiantes.")
}

/* Funcion que muestra por pantalla las Personas */
function mostrarVerPersonas(){
    mostrarMensaje(5, "mostrarPersonas", "mostrarPersonasCabecera", 1);

    personas.forEach(function(persona){
        personaaux = persona;
        mostrarMensaje(6, "mostrarPersonas", "mostrarPersonas", 0);
    });
}

/* Funcion que muestra por pantalla los Estudiantes */
function mostrarVerEstudiantes(opcion){
    document.getElementById(opcion).innerHTML = "";
    let divcabecera = document.createElement('div');
    divcabecera.className = "mostrarPersonasCabecera";
    divcabecera.innerHTML = "Orden: <b>Por defecto</b><br>Número de Estudiantes: <b>" + estudiantes.length + "</b>";
    document.getElementById(opcion).appendChild(divcabecera);

    estudiantes.forEach(function(estudiante){
        let divEstudiante = document.createElement('div');
        divEstudiante.className = "mostrarPersonas";
        divEstudiante.innerHTML = estudiante + "<br><br>Nota Media: <b>" + estudiante.calcularNotaMedia() + "</b>";
        document.getElementById(opcion).appendChild(divEstudiante);
    });
}

// Función para crear las opciones de las asignaturas recibiendo el id de select
function crearMenuAsignaturas(opcion){
    document.getElementById(opcion).innerHTML = "";
    for(let i = 0; i < listaasignaturas.length; i++){
        let opcionasignatura = document.createElement('option');
        opcionasignatura.value = listaasignaturas[i];
        opcionasignatura.innerHTML = listaasignaturas[i];
        document.getElementById(opcion).appendChild(opcionasignatura);
    }
}

// Función para crear las opciones de las notas recibiendo el id de select
function crearMenuNotas(opcion){
    document.getElementById(opcion).innerHTML = "";
    for(let i = 0; i < 11; i++){
        let opcionnotas = document.createElement('option');
        opcionnotas.value = i;
        opcionnotas.innerHTML = i;
        document.getElementById(opcion).appendChild(opcionnotas);
    }
}

function volcarEstudiantes(){
    claseestudiantes = new Estudiantes();
    estudiantes.forEach(function(estudiante){
        claseestudiantes.anadirEstudiante(estudiante);
    })
}

// Busca el DNI introducido por campo y devuelve el índice del estudiante
// al que le corresponde, en caso de que devuelva 0 significa que no ha
// encontrado el DNI en la búsqueda
function comprobarDNI(opcion, estudiantes){
    let dni = document.getElementById(opcion).value;
    let coincidencia = 0;

    for(let i = 0; i < estudiantes.length && (coincidencia == 0); i++){
        if(dni == estudiantes[i].dni){
            coincidencia = i;
        }
    }
    return coincidencia;
}

// Busca la nota del módulo introducido por campo en el estudiante que se le
// envia por índice y muestra su nota por pantalla
function verEditarNota(coincidencia, opcion){
    let estudiante = estudiantes[coincidencia];
    let modulo = document.getElementById(opcion + "opcionesmodulo").value;
    let nota = estudiante.obtenerNota(modulo);

    if(nota >= 0){
        document.getElementById("mostrar" + opcion + "nota2").innerHTML = "";

        divNotaModulo = document.createElement('div');
        divNotaModulo.className = "fila";
        divNotaModulo.innerHTML = estudiante.nombre + " " + estudiante.apellidos + "<br>" + modulo;
        document.getElementById("mostrar" + opcion + "nota2").appendChild(divNotaModulo);
    
        divNotaModulo = document.createElement('div');
        divNotaModulo.className = "titulo";
        divNotaModulo.innerHTML = nota;
        document.getElementById("mostrar" + opcion + "nota2").appendChild(divNotaModulo);

        if(opcion == "editar"){
            let nuevanota = parseInt(document.getElementById("editaropcionesnota").value);
            estudiante.asignarNota(modulo, nuevanota);
            estudiantes[coincidencia] = estudiante;
    
            divNotaModulo = document.createElement('div');
            divNotaModulo.className = "fila";
            divNotaModulo.innerHTML = "Nota Actualizada";
            document.getElementById("mostrareditarnota2").appendChild(divNotaModulo);

            divNotaModulo = document.createElement('div');
            divNotaModulo.className = "titulo";
            divNotaModulo.innerHTML = nuevanota;
            document.getElementById("mostrareditarnota2").appendChild(divNotaModulo);
        }
    }
    else{
        alert("El estudiante no está matriculado en el módulo seleccionado");
    }
}

// Función para mostrar los mensajes en pantalla
function mostrarMensaje(opcion, modulo, clase, limpiar){
    mensaje = [
        "El estudiante no está matriculado en el módulo seleccionado",
        "Cantidad NO válida",
        "Tiempo Transcurrido: <b> " + (fin - inicio) + "ms</b>",
        "Cantidad NO válida",
        "La cantidad total supera el número de personas permitidas",
        "Número de Personas: <b>" + personas.length + "</b>",
        personaaux
    ];

    limpiar == 1 ? document.getElementById(modulo).innerHTML = "" : null

    let divMensaje = document.createElement('div');
    divMensaje.className = clase;
    divMensaje.innerHTML = mensaje[opcion];
    document.getElementById(modulo).appendChild(divMensaje);
}

// Función para volver al menú principal
function volver(opcion){
    accion = [
        "verGenerar",
        "verPersonas",
        "verEstudiantes",
        "verGenerarPersonas",
        "verGenerarEstudiantes",
        "verNota",
        "editarNota",
        "verClaseEstudiantes",
        "verBuscarPorDNI"
    ];
    document.getElementById(accion[(opcion.substring(6, opcion.length)) - 1]).style.display = "none";
    document.getElementById("main").style.display = "flex";
}