import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroPersonal } from 'src/app/interfaces/personal.interface';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-registro-personal',
  templateUrl: './registro-personal.component.html',
  styleUrls: ['./registro-personal.component.css']
})
export class RegistroPersonalComponent implements OnInit {

  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private QRUDService: QRUDService
  ) { }

  ngOnInit(): void {
    this.FormularioPersonal();
  }

  FormularioPersonal() {

    this.form =   this.fb.group({
      nombre:["shadow", Validators.required],
      telefono:["12", [Validators.required,Validators.pattern(/^[0-9]\d{9}$/g)] ],
      password:["123456", Validators.required],
      email:["shadow@shadow.com",[Validators.required,Validators.email]  ],
      rol:["1", Validators.required],
    })

  }

  submit(){
    
    const personal:RegistroPersonal = this.form.value;


  }

  campoValido(campo:string){
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched ;
  }

}
