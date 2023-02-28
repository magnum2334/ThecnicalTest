import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from './dashboard/roles/roles.component';
import { SoftwareErrorsComponent } from './dashboard/software-errors/software-errors.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CreateComponent } from './dashboard/users/create/create.component';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './dashboard/users/users.component';
import { UpdateComponent } from './dashboard/users/update/update.component';
import { CreatePermissionComponent } from './dashboard/roles/create-permission/create-permission.component';
import { CreateRolComponent } from './dashboard/roles/create-rol/create-rol.component';
import { CreateErrorComponent } from './dashboard/software-errors/create-error/create-error.component';
import { UpdatePermissionComponent } from './dashboard/roles/update-permission/update-permission.component';
import { UpdateRolComponent } from './dashboard/roles/update-rol/update-rol.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxPermissionsModule } from 'ngx-permissions';
import { UpdateErrorComponent } from './dashboard/software-errors/update-error/update-error.component';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    RolesComponent,
    SoftwareErrorsComponent,
    CreateComponent,
    UsersComponent,
    UpdateComponent,
    CreatePermissionComponent,
    CreateRolComponent,
    CreateErrorComponent,
    UpdatePermissionComponent,
    UpdateRolComponent,
    UpdateErrorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [ AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
