import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from '../../../classes/book';
import { Genre } from '../../../classes/genre';
import { GlobalService } from '../../../services/global';

@Component({
  selector: 'book-add',
  templateUrl: './book-add.component.html',
  styleUrls: [ './book-add.component.css' ]
})
export class BookAddComponent implements OnInit {
  
	form: FormGroup;
	genresList: Genre[] = [];
	book: Book = new Book( );

	constructor ( public fb: FormBuilder, public global: GlobalService ) {
		this.createForm( );
	}

  ngOnInit ( ) { 
  	this.getGenresList( );
  }

  getGenresList ( ) {
  	this.global.getRequest( 'genres', ( data ) => {
  		this.genresList = data.json( );
  	});
  }

  createForm ( ) {
  	this.form = this.fb.group({
  		amountOfPages: [ '', Validators.compose([ 
  			Validators.required, 
  			Validators.pattern( /[0-9]+/ ), 
  			Validators.min( 1 ) ]) ],
  		name: [ '', Validators.required ],
  		genre: [ '', Validators.required ]
  	});
  }

  submitForm ( values ) {
  	
  	let params = {};

  	this.book.name = values.name;
  	this.book.amountOfPages = values.amountOfPages;
  	this.book.genreId = +values.genre;

  	params = {
  		method: 'post',
  		entity: 'books',
  		callback: ( response ) => {
        let data = {
          html: 'Новая книга успешно создана!',
          redirect: '/books-list'
        };
        if ( response.statusText == 'Created' ) {
          this.global.defaultSuccessMessage( data );
        }
  		}
  	}

  	this.global._Request( this.book, params );

  }


}
