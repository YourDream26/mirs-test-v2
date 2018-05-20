import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from '../../../classes/book';
import { Author } from '../../../classes/author';
import { GlobalService } from '../../../services/global';


@Component({
  selector: 'author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: [ './author-edit.component.css' ]
})
export class AuthorEditComponent implements OnInit {
  
	customDatepickerOptions: any = {
	};

	id: number;
	form: FormGroup;
	booksList: Book[] = [];
	author: Author = new Author( );

	constructor ( private route: ActivatedRoute, public fb: FormBuilder, public global: GlobalService ) {
		this.customDatepickerOptions = { ...this.global.defaultDatepickerOptions, ...this.customDatepickerOptions };
		this.createForm( )
	}

  ngOnInit ( ) { 

    this.route.params.subscribe(params => {
      this.id = +params['id'];
	  	this.getBooksList( );
    });
  }

  getBooksList ( ) {
  	this.global.getRequest( 'books?_sort=name&_order=asc', ( data ) => {
  		this.booksList = data.json( );
      this.getAuthor( );
  	});
  }

  getAuthor ( ) {
  	this.global.getRequest( 'authors/'+this.id, response => {
  		this.author = response.json( );
  		this.form.get( 'name' ).setValue( this.author.name );
  		this.form.get( 'surname' ).setValue( this.author.surname );
  		this.form.get( 'patronymic' ).setValue( this.author.patronymic );
  		this.form.get( 'birthdate' ).setValue( this.author.birthdate );
  		this.form.get( 'bookIds' ).setValue( this.author.bookIds );
  	});
  }


  createForm ( ) {
  	this.form = this.fb.group({
  		name: [ '', Validators.compose([ 
  			Validators.required, 
  			Validators.pattern( /[a-zA-Zа-яА-Я\-\s]+/ ) ]) ],
  		surname: [ '', Validators.compose([ 
  			Validators.required, 
  			Validators.pattern( /[a-zA-Zа-яА-Я\-\s]+/ ) ]) ],
  		patronymic: [ '', Validators.pattern( /[a-zA-Zа-яА-Я\-\s]+/ ) ],
  		birthdate: [ '', Validators.required ],
  		bookIds: ''
  	});
  }


  submitForm ( values ) {
  	
  	let params = {};

  	this.author.name = values.name;
  	this.author.surname = values.surname;
  	this.author.patronymic = values.patronymic;
  	this.author.birthdate = values.birthdate;
  	this.author.bookIds = values.bookIds || [];

  	params = {
  		method: 'put',
  		entity: 'authors',
  		id: this.id,
  		callback: ( response ) => {
        let data = {
          html: 'Автор успешно отредактирован!',
          redirect: '/authors-list'
        };
        if ( response.statusText == 'OK' ) {
          this.global.defaultSuccessMessage( data );
        }
  		}
  	}

  	this.global._Request( this.author, params );

  }
}
