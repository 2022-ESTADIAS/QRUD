import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DetallePorRol, RegistroRol } from 'src/app/interfaces/rol.interface';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-actualizar-rol',
  templateUrl: './actualizar-rol.component.html',
  styleUrls: ['./actualizar-rol.component.css']
})
export class ActualizarRolComponent implements OnInit {


  form!: FormGroup;
  existeError: boolean = false;
  errores!:[{msg:string}]
  msgExito:string = "";
  existeMsgExito:boolean = false;

  @Input() rol!:DetallePorRol 
  @Input() idRol:any = ""

  @Output() ocultar:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() rolActualizado:EventEmitter<DetallePorRol[]> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private QRUDService: QRUDService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.FormularioRol();
  }

  FormularioRol(){

    this.form =   this.fb.group({
      rol:[this.rol.rol, Validators.required],
      description:[this.rol.description, Validators.required],
  
    })

  }

  submit(){

    
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const rol:RegistroRol = this.form.value;

    this.QRUDService.ActualizarRegistros("rol",this.idRol,rol).then((data:any) => {
      this.msgExito = "Rol Actualizado Con exito";
      this.existeMsgExito = true;
      this.form.reset();

      this.rolActualizado.emit(data);
      this.ocultar.emit(false);
      setTimeout(() =>{
        this.existeMsgExito = false;
      },2000);


    }).catch(err => {
      console.log(err)
      this.existeError = true
      this.errores = err.error.errors

      if(err.error.msgtk){
        this.router.navigateByUrl("/login");
      }
    })

    
  }
  
  campoValido(campo:string){
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched ;
  }

  removerAlertas(){
    this.existeError = false;
  }
  
  ocultarFormulario(){
    this.ocultar.emit(false);
  }


} 
