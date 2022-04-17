import { Component, OnInit,Input,  EventEmitter,  Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  RegistroRol, Rol } from 'src/app/interfaces/rol.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-actualizar-rol',
  templateUrl: './actualizar-rol.component.html',
  styleUrls: ['./actualizar-rol.component.css']
})
export class ActualizarRolComponent implements OnInit {

  /**
   * propiedad que contiene el formulario reactivo
   */
  form!: FormGroup;

  /**
   * propiedad para mostrar mensajes de error solo si existe 
   */
  existeError: boolean = false;
    /**
   * propiedad que contiene un arreglo con los mensajes de error proveido por las validaciones del backend
   */
  errores!:[{msg:string}]

  /**
   * propiedad que contiene el rol que se va a actualizar
   */
  @Input() rol!:Rol 
  /**
   * propiedad que contiene el id del rol que se va a actualizar
   */
  @Input() idRol:any = ""
    /**
   * evento que emite el valor para mostrar/ocultar el modal del formulario reactivo
   */
  @Output() ocultar:EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
   * evento que retorna el arreglo de roles actualizado
   */
  @Output() rolActualizado:EventEmitter<Rol[]> = new EventEmitter();

  
  /**
   * inyeccion de servicios
   */
  constructor(
    private fb: FormBuilder,
    private QRUDService: QRUDService,
    private authService: AuthService,
    private ErrorServidor:ErrorServidorService
  ) { }
   /**
     * Inicializando el formulario reactivo
     */
  ngOnInit(): void {
    this.FormularioRol();
  }

     /**
   * metodo que inicializa el formulario reactivo con sus respectivos campos y validaciones
   */
  FormularioRol(){

    this.form =   this.fb.group({
      rol:[this.rol.rol, Validators.required],
      description:[this.rol.description, Validators.required],
  
    })

  }
    /**
   * metodo que actualiza el rol del personal en el backend
   */
  submit(){

    
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const {description,rol:rolActual }:RegistroRol = this.form.value;
    
    const rol ={
      rol:rolActual.toLowerCase().trim(),
      description: description.trim().toLowerCase(),
    }


    this.QRUDService.ActualizarRegistros("rol",this.idRol,rol).then((data:any) => {
      this.form.reset();

      this.rolActualizado.emit(data);
      this.ocultar.emit(false);

    }).catch(err => {
      if(err.error.errors){
        this.existeError = true;
        this.errores = err.error.errors;
        return;
      }

      if(err.error.msgtk){
        this.authService.logout();
        return;
      }

      this.ErrorServidor.error();
    })

    
  }
  
  /**
   * valida campos vacios del formulario reactivo si existen retorna un valor booleano true
   * @param campo recibe un campo del formulario para validar si contiene errores de validacion o no
   */
   campoValido(campo:string){
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched ;
  }
  /**
 * metodo que remueve los mensajes de error solo si existen
 */
  removerAlertas(){
    this.existeError = false;
  }
 /**
  * metodo que oculta el modal del formulario reactivo
  */ 
ocultarFormulario(){
  this.ocultar.emit(false);
}



} 
