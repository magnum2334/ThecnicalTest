import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/service/app.service';

export interface User {
  id:number;
  name: string;
  email: string;
  id_rol: string;
}
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  roles: any;
  constructor(
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:User ,
    private api: AppService
  ) {}

  updateForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    id_rol: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    console.log(this.data)
    this.updateForm.patchValue(this.data)
    this.api.roles().subscribe((res: any) => {
      if (res) {
        this.roles = res['roles'];
      } else {
        alert(" error consult");
      }
    })
  }

  onSubmit(){
    this.api.updateuser(this.updateForm.value, this.data.id).subscribe((res: any) => {
      if (res) {
        alert(res['message']);
      } else {
        alert(" error en la consulta");
      }
    })
  }
}
