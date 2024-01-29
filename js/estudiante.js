class Estudiante extends Persona{
    constructor(dni, nombre, apellidos, genero, fechaNac, modulos=[], notas=[]){
        super(dni, nombre, apellidos, genero, fechaNac);
        this._modulos = modulos;
        this._notas = notas;
    }

    // Getters
    get modulos(){
        return this._modulos;
    }

    get notas(){
        return this._notas;
    }

    // Setters
    set modulos(modulos){
        this._modulos = modulos;
    }

    set notas(notas){
        this._notas = notas;
    }

    // Método toString
    toString(){
        let cadena = "<b>DNI:</b> " + this._dni;
        cadena += "<br><b>Nombre:</b> " + this._nombre;
        cadena += "<br><b>Apellidos:</b> " + this._apellidos;
        cadena += "<br><b>Género:</b> " + this._genero;
        cadena += "<br><b>Fecha Nacimiento:</b> " + this._fechaNac;
        cadena += "<br><br><b>Módulos Matriculados</b>";
        for(let i = 0; i < this._modulos.length; i++){
            cadena += "<br>" + this._modulos[i] + ": <b>" + this._notas[i] + "</b>";
        }

        return cadena;
    }

    // Método para obtener nota. Recibe el nombre del módulo y devuelve la nota
    // En caso de no encontrar el módulo devuelve -1
    obtenerNota(modulo){
        let posicion = this._modulos.indexOf(modulo);

        if(posicion >= 0){
            return this._notas[posicion];
        }
        else{
            return -1;
        }
    }

    // Método para asignar nota. Recibe el nombre del módulo y la nota y modifica la nota
    asignarNota(asignatura, nota){
        let posicion = this._modulos.indexOf(asignatura);
        this._notas[posicion] = nota;
    }

    // Método para calcular la nota media de los modulos matriculados del estudiante
    calcularNotaMedia(){
        let notamedia = 0;

        for(let i = 0; i < this._notas.length; i++){
            notamedia += this._notas[i];
        }

        notamedia /= this._notas.length;

        return notamedia.toFixed(1);
    }
}