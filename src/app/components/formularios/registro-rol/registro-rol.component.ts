import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroRol } from 'src/app/interfaces/rol.interface';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-registro-rol',
  templateUrl: './registro-rol.component.html',
  styleUrls: ['./registro-rol.component.css']
})
export class RegistroRolComponent implements OnInit {


  form!: FormGroup;
  existeError: boolean = false;
  errores!:[{msg:string}]
  msgExito:string = "";
  existeMsgExito:boolean = false;
  constructor(
    private fb: FormBuilder,
    private QRUDService: QRUDService
  ) { }
  ngOnInit(): void {
    this.FormularioRol();
  }

  FormularioRol(){

    this.form =   this.fb.group({
      rol:["", Validators.required],
      description:["rol", Validators.required],
  
    })

  }

  submit(){

    
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const rol:RegistroRol = this.form.value;

    this.QRUDService.crearRegistro("rol",rol).then((data:any) => {
      console.log(data);
      this.msgExito = data.msg;
      this.existeMsgExito = true;
      this.form.reset();

      setTimeout(() =>{
        this.existeMsgExito = false;
      },2000);


    }).catch(err => {
      console.log(err)
      this.existeError = true
      this.errores = err.error.errors
      
    })

    
  }
  
  campoValido(campo:string){
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched ;
  }

  removerAlertas(){
    this.existeError = false;
  }


}
