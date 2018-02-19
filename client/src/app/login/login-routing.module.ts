import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/**
 * holds the route related to the login component
 */
const routes: Routes = [{
  path:'',
  component:LoginComponent
}];
/**
 * the Login Route decorator that contains needed modules and routs 
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoginRoutingModule { }
