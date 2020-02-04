//3. POJO - BEAN, plain old java object, solo son repositorios de información, crear una entidad que lo represente
//Clases de repositorio de informacion, clases comodines, no envian mensaje a nada, no tienen metodo, contenedores de datos
class Alumno
{
    codigo : string
    nombre : string

    constructor(codigo : string, nombre : string)
    {
        this.codigo = codigo
        this.nombre = nombre
    }
}


//4. Modelo
class AlumnosModel
{
    //11. Definiendo un solo observador
    observer : ControllerObserver
    setObserver(observer : ControllerObserver)
    {
        this.observer = observer
    }

    //4.1
    obtenerAlumno() //11.2comentario : Alumno[]
    {
        //6.1
        {
            let alumnos = []
            alumnos.push(new Alumno("20151456","Pepito"))
            alumnos.push(new Alumno("20151457","Irey"))
            alumnos.push(new Alumno("20151458","Campos"))
            alumnos.push(new Alumno("20151459","Villano"))


            //9. ()=> {} es una funcion que le estoy pasando cuando terminen de pasar esos 3 segundos indicados
            setTimeout(()=> {
                //comentario console.log("Termino")  
                //11.3 pasar los alumnos, le avisamos/notificar a su observador y decirle estos son los alumnos obtenidos
                this.observer.onAlumnosObtenidos(alumnos) 
            }, 3000)
            
            //esta se ejecuta primero porque lo anterior tiene un delay
            //11.1 comentario return alumnos
        } 
    }
}

//10.1 Implementar patrón Observer
abstract class ControllerObserver
{
    abstract onAlumnosObtenidos(alumnos : Alumno[])
}

//10.2 Observador
//2.controller
class AlumnosController extends ControllerObserver
{
    //12.2
    lista : ListaAlumnosView
    constructor()
    {
        super()
        this.lista = new ListaAlumnosView()
    }
    
    //2.1
    start()
    {
        //7.1
        let alumnosModel = new AlumnosModel()
        //12.3 let lista = new ListaAlumnosView()

        //12.1 seteando el observador, decirle que será el mismo el observador
        alumnosModel.setObserver(this)
        alumnosModel.obtenerAlumno()
        /*12.0 pasar a comentario
        let alumnos = alumnosModel.obtenerAlumno()
        lista.alumnos = alumnos

        lista.pintar()*/
    }

    //10.2.1 implementando métodos abstractos
    onAlumnosObtenidos(alumnos : Alumno[])
    {
        //12.4
        this.lista.alumnos = alumnos
        this.lista.pintar()
    }
}

//1.view, porque su responsabilidad es mostrar datos(1 de las 2 responsabilidades) 
class ListaAlumnosView
{
    //5.1
    alumnos : Alumno[]
    //1.1
    pintar()
    {   
        //5.2
        console.log(`----------------------------------------------`)
        if (this.alumnos.length == 0)
        {
            console.log("No hay alumnos para mostrar")
        }else{
            for (let i=0; i < this.alumnos.length; i++)
            {
                let alumno = this.alumnos[i]
                console.log(`${i + 1} ${alumno.codigo} ${alumno.nombre}`)
            }
            console.log(`----------------------------------------------`)
        }
    }
}

//8. Parte del controller, entre controllers se pueden hablar.
let mainMVC = () => {
    let controller = new AlumnosController()
    controller.start()
}

mainMVC()