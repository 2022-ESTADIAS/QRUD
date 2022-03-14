import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-registro-rol',
  templateUrl: './registro-rol.component.html',
  styleUrls: ['./registro-rol.component.css']
})
export class RegistroRolComponent implements OnInit {


  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private QRUDService: QRUDService
  ) { }
  ngOnInit(): void {
    this.FormularioRol();
  }

  FormularioRol(){

    this.form =   this.fb.group({
      rol:["koso", Validators.required],
      description:["rol creado desde el frontend perro", Validators.required],
  
    })

  }

  submit(){
    
  }

}
