import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from '../../../classes/book';
import { Author } from '../../../classes/author';
import { GlobalService } from '../../../services/global';

@Component({
  selector: 'author-add',
  templateUrl: './author-add.component.html',
  styleUrls: [ './author-add.component.css' ]
})
export class AuthorAddComponent implements OnInit {
  
	customDatepickerOptions: any = {
	};

	form: FormGroup;
	booksList: Book[] = [];
	author: Author = new Author( );

	constructor ( public fb: FormBuilder, public global: GlobalService ) {
		this.customDatepickerOptions = { ...this.global.defaultDatepickerOptions, ...this.customDatepickerOptions };
		this.createForm( )
	}

  ngOnInit ( ) { 
  	this.getBooksList( );
  }

  getBooksList ( ) {
  	this.global.getRequest( 'books?_sort=name&_order=asc', ( data ) => {
  		this.booksList = data.json( );
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
  	// this.author.birthdate = {
  	// 	human: values.birthdate.formatted,
  	// 	unix: values.birthdate.epoc
  	// }
  	this.author.bookIds = values.bookIds || [];

  	params = {
  		method: 'post',
  		entity: 'authors',
  		callback: ( response ) => {
        let data = {
          html: 'Новый автор успешно добавлен!',
          redirect: '/authors-list'
        };
        if ( response.statusText == 'Created' ) {
          this.global.defaultSuccessMessage( data );
        }
  		}
  	}

  	this.global._Request( this.author, params );

  }

}
