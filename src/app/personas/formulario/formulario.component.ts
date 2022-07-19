import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggingService } from '../../LoggingService.service';
import { Persona } from '../../persona.model';
import { PersonasService } from '../../personas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],


})
export class FormularioComponent implements OnInit{

  //@Output() personaCreada = new EventEmitter<Persona>();

  nombreInput:string;
  apellidoInput:string;
  index : number;
  modoEdicion : number;


  /*agregarPersona()  {
    let persona1 = new Persona (this.nombreInput, this.apellidoInput);
    //this.personas.push(persona1);
    this.personaCreada.emit(persona1);
  }*/

  //viewchild es para recuperar un elemento de la plantilla con referencia local
  //nombreinput de tipo element ref
  //@ViewChild('nombreInput') nombreInput : ElementRef;
  //@ViewChild('apellidoInput') apellidoInput : ElementRef;

  constructor(private personasService: PersonasService,
              private router : Router,
              private route :  ActivatedRoute){
                this.personasService.saludar.subscribe(
                  (indice: number) => alert("El indice es: " + indice)
                );
              }

              //recuperar el index que traía el enlace para poder seleccionar elemento correcto a modificar
  ngOnInit() {
    this.index = this.route.snapshot.params['id'];
    //recuperar parámetro que llega
    //el signo mas convierte a tipo entero
    this.modoEdicion = +this.route.snapshot.queryParams['modoEdicion'];
    //if (this.index){
      //ya no se requiere el índice, en edición se carga la info de la posición indicada
      if (this.modoEdicion != null && this.modoEdicion===1){
      let persona : Persona = this.personasService.encontrarPersona(this.index);
      this.nombreInput = persona.nombre;
      this.apellidoInput = persona.apellido;
    }
  }
  /*
  agregarPersona(){
    let persona1 = new Persona(nombreInput.value, apellidoInput.value);
    this.personaCreada.emit(persona1)
  }*/

  //función con viewchild
  /*agregarPersona(){
    let persona1 = new Persona(
      this.nombreInput.nativeElement.value,
      this.apellidoInput.nativeElement.value);
    //this.loggingService.enviaMensajeAConsola("Enviamos persona con nombre:" + persona1.nombre + " apellido:" + persona1.apellido);
    //this.personaCreada.emit(persona1);
    this.personasService.agregarPersona(persona1);
  }*/

  onGuardarPersona(){
    let persona1 = new Persona(this.nombreInput, this.apellidoInput);
    //if(this.index){
      if(this.modoEdicion != null && this.modoEdicion === 1){
      this.personasService.modificarPersona(this.index, persona1)
    }else{
      this.personasService.agregarPersona(persona1);
    }
    this.router.navigate(['personas']);
  }

  eliminarPersona(){
    if(this.index != null){
      this.personasService.eliminarPersona(this.index);
    }
    this.router.navigate(['personas']);
  }



}
