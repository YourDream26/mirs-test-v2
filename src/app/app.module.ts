/* 
============================================= 
======           Modules          =========== 
============================================= 
*/
import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';



/* 
============================================= 
=======           Routes          =========== 
============================================= 
*/
const appRoutes: Routes = [

];



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot( appRoutes ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
