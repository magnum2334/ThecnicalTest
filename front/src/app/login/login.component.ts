import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private api: AppService, private router:Router) { }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit() {

  }
  async onSubmit(){
    await this.api.login(this.loginForm.value).subscribe((res:any)=>{
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
