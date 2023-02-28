import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.css']
})
export class CreatePermissionComponent {
  constructor(private api: AppService) {}

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  onSubmit(){
    this.api.createPermission(this.createForm.value).subscribe((res: any) => {
      if (res) {
        alert(res['message']);
      } else {
        alert(" error en la consulta");
      }
    })
  }
}
