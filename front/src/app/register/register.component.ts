import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  constructor(private api: AppService,  private router:Router) { }
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name:new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  ngOnInit() {

  }
  async onSubmit(){
    await this.api.register(this.registerForm.value).subscribe((res:any)=>{
      if(res){
        this.router.navigate(['dashboard']);
        localStorage.setItem('token', res['aut'])
        localStorage.setItem('user', JSON.stringify(res['user']))
      }else{
        alert(" no existe el usuario")
      }
    })
  }
}
