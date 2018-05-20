import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Genre } from '../../../classes/genre';
import { GlobalService } from '../../../services/global';

@Component({
  selector: 'genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: [ './genre-edit.component.css' ]
})
export class GenreEditComponent implements OnInit {

	id: number;
	form: FormGroup;
	genre: Genre;

	constructor ( private route: ActivatedRoute, private fb: FormBuilder, private global: GlobalService ) { 
		this.createForm( );
	}

  ngOnInit ( ) { 
    
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getGenre( );
    });

  }

  getGenre ( ) {
  	this.global.getRequest( 'genres/'+this.id, response => {
  		this.genre = response.json( );
  		this.form.get( 'name' ).setValue( this.genre.name );
  	});
  }

  createForm ( ) {
  	this.form = this.fb.group({
  		name: [ '', Validators.required ]
  	});
  }

  submitForm ( values ) {
  	
  	let params = {};

  	this.genre.name = values.name;

  	params = {
  		method: 'put',
  		entity: 'genres',
  		id: this.id,
  		callback: ( response ) => {
        let data = { 
          html: 'Жанр успешно отредактирован!',
          redirect: '/genres-list' 
        };
        if ( response.statusText == 'OK' ) {
          this.global.defaultSuccessMessage( data );
        }
  		}
  	}

  	this.global._Request( this.genre, params );

  }


}
