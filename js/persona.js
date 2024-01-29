class Persona{
    constructor(dni, nombre, apellidos, genero, fechaNac){
        this._dni = dni;
        this._nombre = nombre;
        this._apellidos = apellidos;
        this._genero = genero;
        this._fechaNac = fechaNac;
    }

    // Getters
    get dni(){
        return this._dni;
    }

    get nombre(){
        return this._nombre;
    }

    get apellidos(){
        return this._apellidos;
    }

    get genero(){
        return this._genero;
    }

    get fechaNac(){
        return this._fechaNac;
    }

    // Setters (Se entiende que el DNI no puede ser modificado)
    set nombre(nombre){
        this._nombre = nombre;
    }
    
    set apellidos(apellidos){
        this._apellidos = apellidos;
    }
    
    set genero(genero){
        this._genero = genero;
    }
    
    set fechaNac(fechaNac){
        this._fechaNac = fechaNac;
    }

    // Metodo toString
    toString(){
        return "DNI: " + this._dni + "<br>Nombre: " + this._nombre + "<br>Apellidos: " + this._apellidos + "<br>Género: " + this._genero + "<br>Fecha de Nacimiento: " + this._fechaNac;
    }
}