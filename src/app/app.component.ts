import { Component, OnInit } from '@angular/core';
import { Persona } from './persona.model';
import { PersonasService } from './personas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  titulo = 'Listado de Personas';


  /*personaAgregada(persona: Persona){
    //this.personas.push(persona);
    this.personasService.agregarPersona(persona);
  }*/

}
