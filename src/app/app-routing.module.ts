import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeComponent} from "./components/employee/employee.component";
import {AboutComponent} from "./components/about/about.component";

const routes: Routes = [
  {path: 'employees', component: EmployeeComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', component: EmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
