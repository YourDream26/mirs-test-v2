/* 
============================================= 
======           Modules          =========== 
============================================= 
*/
import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { HttpModule }           from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';


import { AppComponent } from './app.component';

import { GlobalService } from './services/global';

import { MyDatePickerModule } from './modules/my-date-picker/my-date-picker.module';





/* 
============================================= 
=======         Components        =========== 
============================================= 
*/

import { HeaderComponent } 		from './components/header/header.component';
import { HomeComponent } 	 		from './components/home/home.component';
import { NotFoundComponent } 	from './components/404/not-found.component';

import { GenreAddComponent } 	 			from './components/genre/genre-add/genre-add.component';
import { GenreEditComponent } 	 		from './components/genre/genre-edit/genre-edit.component';
import { GenreListComponent } 	 		from './components/genre/genre-list/genre-list.component';

import { AuthorAddComponent } 	 		from './components/author/author-add/author-add.component';
import { AuthorEditComponent } 	 		from './components/author/author-edit/author-edit.component';
import { AuthorListComponent }        from './components/author/author-list/author-list.component';
import { AuthorBooksComponent } 	 		from './components/author/author-books/author-books.component';

import { BookAddComponent } 	 		from './components/book/book-add/book-add.component';
import { BookEditComponent } 	 		from './components/book/book-edit/book-edit.component';
import { BookListComponent } 	 		from './components/book/book-list/book-list.component';



/* 
============================================= 
=======           Routes          =========== 
============================================= 
*/
const appRoutes: Routes = [

  // { path: '', component: HomeComponent },
  { path: '', component: BookListComponent },

  { path: 'genre-add', component: GenreAddComponent },
  { path: 'genre-edit/:id', component: GenreEditComponent },
  { path: 'genres-list', component: GenreListComponent },

  { path: 'author-add', component: AuthorAddComponent },
  { path: 'author-edit/:id', component: AuthorEditComponent },
  { path: 'author-books/:id', component: AuthorBooksComponent },
  { path: 'authors-list', component: AuthorListComponent },

  { path: 'book-add', component: BookAddComponent },
  { path: 'book-edit/:id', component: BookEditComponent },
  { path: 'books-list', component: BookListComponent },
  
  { path: '**', component: NotFoundComponent }

];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    GenreAddComponent,
		GenreEditComponent,
		GenreListComponent,
		AuthorAddComponent,
		AuthorEditComponent,
    AuthorListComponent,
		AuthorBooksComponent,
		BookAddComponent,
		BookEditComponent,
		BookListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot( appRoutes ),
    HttpModule,
    ReactiveFormsModule,
    MyDatePickerModule
  ],
  providers: [
  	GlobalService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
