import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-create-rol',
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.css']
})
export class CreateRolComponent {
  permissions: any = []
  createForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    permissions: new FormControl('', [Validators.required]),
  });
  constructor(private api: AppService) {}
  async ngOnInit() {
    await this.api.permissions().subscribe((res: any) => {
      if (res) {
        this.permissions = res['permission']
      } else {
        alert(" error consult");
      }
    })
  }
  async onSubmit(){
    await this.api.createRol(this.createForm.value).subscribe((res: any) => {
      if (res) {
        alert(" error consult");
      } else {
        alert(" error consult");
      }
    })
  }
  
}
