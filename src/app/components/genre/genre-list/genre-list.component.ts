import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global';
import { Genre } from '../../../classes/Genre';


@Component({
  selector: 'genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: [ './genre-list.component.css' ]
})
export class GenreListComponent implements OnInit {
  
	genresList: Genre[] = [];

	constructor ( private global: GlobalService ) { }

  ngOnInit ( ) {

  	this.getGenresList( );
  }

  getGenresList ( ) {

  	this.global.getRequest( 'genres?_sort=name&_order=asc', ( data ) => {
  		this.genresList = data.json( );
  	});

  }

  deleteGenre ( id ) {

    let _data = {
      message: "Вы уверены, что хотите удалить данный жанр?",
      confirmButtonText: "Удалить",
      cancelButtonText: "Нет"
    };

    this.global.confirmMessage( _data, ( ) => {    
      
      let params = {};

    	params = {
    		method: 'delete',
    		entity: 'genres',
    		id: id,
    		callback: ( response ) => {
          let data = { html: 'Жанр успешно удалён!' };
          if ( response.statusText == 'OK' ) {
            this.global.successMessage( data );
      			this.getGenresList( );
          }
    		}
    	}

    	this.global._Request( id, params );
      
    });
  }

}
