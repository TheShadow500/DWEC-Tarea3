class Estudiantes{
    constructor(){
        this._estudiantes = [];
    }

    // Método para añadir un nuevo estudiante
    anadirEstudiante(estudiante){
        this._estudiantes.push(estudiante);
    }

    // Método de ordenación. Recibe el campo por el que ser ordenado y se realiza la
    // operación flecha correspondiente
    ordenar(opcion){
        opcion !== "calcularNotaMedia" ? this._estudiantes.sort((a,b) => a[opcion].localeCompare(b[opcion])) : this._estudiantes.sort((a,b) => a[opcion]().localeCompare(b[opcion]()));
    }

    ordenarDesc(opcion){
        opcion !== "calcularNotaMedia" ? this._estudiantes.sort((a,b) => b[opcion].localeCompare(a[opcion])) : this._estudiantes.sort((a,b) => b[opcion]().localeCompare(a[opcion]()));
    }

    cantidadEstudiantes(){
        return this._estudiantes.length;
    }

    solicitarEstudiante(indice){
        return this._estudiantes[indice];
    }

    mostrarPantalla(opcion, orden){
        document.getElementById(opcion).innerHTML = "";
        let divcabecera = document.createElement('div');
        divcabecera.className = "mostrarPersonasCabecera";
        divcabecera.innerHTML = "Orden: <b>" + orden + "</b><br>Número de Estudiantes: <b>" + this._estudiantes.length + "</b>";
        document.getElementById(opcion).appendChild(divcabecera);

        this._estudiantes.forEach(function(estudiante){
            let divEstudiante = document.createElement('div');
            divEstudiante.className = "mostrarPersonas";
            divEstudiante.innerHTML = estudiante + "<br><br>Nota Media: <b>" + estudiante.calcularNotaMedia() + "</b>";
            document.getElementById(opcion).appendChild(divEstudiante);
        });
    }

    mostrarEstudiante(estudiante){
        document.getElementById("mostrarEstudiante").innerHTML = "";
        let divEstudiante = document.createElement('div');
        divEstudiante.className = "mostrarPersonas";
        divEstudiante.innerHTML = estudiante + "<br><br>Nota Media: <b>" + estudiante.calcularNotaMedia() + "</b>";
        document.getElementById("mostrarEstudiante").appendChild(divEstudiante);
    }

    mostrarSinResultado(){
        let divResultado = document.createElement('div');
        divResultado.className = "mostrarPersonas";
        divResultado.innerHTML = "<b>DNI no encontrado</b>";
        document.getElementById("mostrarEstudiante").appendChild(divResultado);
    }

    busquedaSecuencial(dni){
        let coincidencia = 0;
        this._estudiantes.forEach((estudiante) => {
            if(dni == estudiante.dni){
                coincidencia = estudiante.dni;
                this.mostrarEstudiante(estudiante);
            }
        });

        if(coincidencia == 0){ this.mostrarSinResultado(); }
    }

    busquedaBinaria(dni){
        let estudiante;
        let coincidencia = 0;
        let minimo = -1;
        let indice = parseInt(this._estudiantes.length / 2);
        let maximo = this._estudiantes.length;

        do{
            estudiante = this._estudiantes[indice];
            dni === estudiante.dni
                ?   coincidencia = 1
                :   dni > estudiante.dni
                        ?   (minimo = indice,
                            indice += parseInt((maximo - indice) / 2))
                        :   (maximo = indice,
                            indice -= parseInt((indice - minimo) / 2))
        }while(indice != maximo && indice != minimo && coincidencia == 0);

        coincidencia == 1 ? this.mostrarEstudiante(estudiante) : this.mostrarSinResultado();
    }

    mostrarSinResultado(){
        let divEstudiante = document.createElement('div');
        divEstudiante.className = "mostrarPersonas";
        divEstudiante.innerHTML = "Sin Resultados"
        document.getElementById("mostrarEstudiante").appendChild(divEstudiante);

    }
}