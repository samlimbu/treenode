import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OneComponent } from './one/one.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  
  {path:'home', component: HomeComponent},
  {path:'test', component: TestComponent},
  {path:'one', component: OneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
