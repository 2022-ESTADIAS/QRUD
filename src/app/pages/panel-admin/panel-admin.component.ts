import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { QRUDService } from 'src/app/services/qrud.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {
  ocultarForm:boolean = false;
  
  constructor(
    private AuthService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.AuthService.logout();

  }


}
