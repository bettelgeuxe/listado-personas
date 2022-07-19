import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { DataServices } from "./data.services";

import { LoggingService } from "./LoggingService.service";
import { Persona } from "./persona.model";

@Injectable()
export class PersonasService{
  personas : Persona[] = [
    //new Persona ('Juan', 'Perez'),
    //new Persona ('Alejandra', 'Lopez'),
    //new Persona ('Catherine', 'de Lopez')
];

saludar = new EventEmitter<number>();

constructor(private loggingService : LoggingService,
              private dataServices: DataServices)
              {}

  setPersonas(personas :  Persona[]){
      this.personas = personas;
  }

  obtenerPersonas()    {
    return this.dataServices.cargarPersonas();
  }

  agregarPersona(persona: Persona){
    //this.loggingService.enviaMensajeAConsola("agregamos persona: " + persona.nombre);
    this.loggingService.enviaMensajeAConsola("agregamos persona: " + persona.toString());
    if(this.personas == null){
      this.personas=[];
    }
    this.personas.push(persona);
    this.dataServices.guardarPersonas(this.personas);

  }

  encontrarPersona(index : number){
    let persona: Persona = this.personas[index];
    this.loggingService.enviaMensajeAConsola("Persona encontrada: " + persona.toString());
    return persona;
  }

  modificarPersona(index : number, persona: Persona){
    let persona1 = this.personas[index];
    persona1.nombre  = persona.nombre;
    persona1.apellido = persona.apellido;
    this.dataServices.modificarPersona(index, persona);
  }

  modificarPersonas(){
    this.loggingService.enviaMensajeAConsola("modificar todas las personas: ");
    if(this.personas != null){
      this.dataServices.guardarPersonas(this.personas);
    }
  }


  eliminarPersona(index: number){
    this.personas.splice(index,1); //elimina en memoria el registro del arreglo
    this.dataServices.eliminarPersona(index); //elimina en bd el registro según índice
    this.modificarPersonas(); //guarda nuevo arreglo sin el registro eliminado en la bd

  }


}
