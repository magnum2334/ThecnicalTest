import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  user: any;
  roles: any;

  constructor(private api: AppService) { }
  createForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    rol: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  async onSubmit(){
    await this.api.createuser(this.createForm.value).subscribe((res:any)=>{
      if(res){
        this.user = res
      }else{
        alert(" no existe el usuario")
      }
    })
  }
  async ngOnInit(){
    this.api.roles().subscribe((res: any) => {
      if (res) {
        this.roles = res['roles'];
      } else {
        alert(" error consult");
      }
    })
  }


}
