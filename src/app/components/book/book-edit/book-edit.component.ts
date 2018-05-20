import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from '../../../classes/book';
import { Genre } from '../../../classes/genre';
import { GlobalService } from '../../../services/global';

@Component({
  selector: 'book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: [ './book-edit.component.css' ]
})
export class BookEditComponent implements OnInit {
  
	id: number;
	form: FormGroup;
	genresList: Genre[] = [];
	book: Book = new Book( );

	constructor ( private route: ActivatedRoute, public fb: FormBuilder, public global: GlobalService ) {
		this.createForm( );
	}


  ngOnInit ( ) { 
     
    this.route.params.subscribe(params => {
      this.id = +params['id'];
	  	this.getGenresList( );
    });

  }
  
  getGenresList ( ) {
  	this.global.getRequest( 'genres', ( data ) => {
  		this.genresList = data.json( );
      this.getBook( );
  	});
  }

  getBook ( ) {
  	this.global.getRequest( 'books/'+this.id, response => {
  		this.book = response.json( );
  		this.form.get( 'name' ).setValue( this.book.name );
  		this.form.get( 'amountOfPages' ).setValue( this.book.amountOfPages );
  		this.form.get( 'genre' ).setValue( this.book.genreId );
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
  		method: 'put',
  		entity: 'books',
  		id: this.id,
  		callback: ( response ) => {
        let data = { 
          html: 'Книга успешно отредактирована!',
          redirect: '/books-list' 
        };
        if ( response.statusText == 'OK' ) {
          this.global.defaultSuccessMessage( data );
        }
  		}
  	}

  	this.global._Request( this.book, params );

  }

}
