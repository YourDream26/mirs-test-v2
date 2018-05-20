import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Genre } from '../../../classes/genre';
import { GlobalService } from '../../../services/global';


@Component({
  selector: 'genre-add',
  templateUrl: './genre-add.component.html',
  styleUrls: [ './genre-add.component.css' ]
})
export class GenreAddComponent implements OnInit {
  
	form: FormGroup;
	genre: Genre = new Genre( );

	constructor ( public fb: FormBuilder, public global: GlobalService ) {
		this.createForm( );
	}

  ngOnInit ( ) { }

  createForm ( ) {
  	this.form = this.fb.group({
  		name: [ '', Validators.required ]
  	});
  }

  submitForm ( values ) {
  	
  	let params = {};

  	this.genre.name = values.name;

  	params = {
  		method: 'post',
  		entity: 'genres',
  		callback: ( response ) => {
        let data = {
          html: 'Новый жанр успешно создан!',
          redirect: '/genres-list'
        };
  			if ( response.statusText == 'Created' ) {
          this.global.defaultSuccessMessage( data );
        }
  		} 
  	}

  	this.global._Request( this.genre, params );

  }

}
