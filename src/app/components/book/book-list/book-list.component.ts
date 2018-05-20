import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global';
import { Book } from '../../../classes/book';
import { Genre } from '../../../classes/genre';


@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: [ './book-list.component.css' ]
})
export class BookListComponent implements OnInit {
  
	booksList: Book[] = [];
	sortInfo: any = {
		field: 'name',
		order: 'asc'
	};

	constructor ( private global: GlobalService ) { }

  ngOnInit ( ) {
  	this.getBooksList( );
  }



  getBooksList ( ) {

  	this.global.getRequest( 'books?_expand=genre&_sort='+this.sortInfo.field+'&_order='+this.sortInfo.order, ( data ) => {
  		this.booksList = data.json( );
  	});

  }

  changeSort ( field ) {
  	if ( this.sortInfo.field == field ) {
  		this.sortInfo.order = (this.sortInfo.order == 'asc') ? 'desc' : 'asc';
  	} else {
  		this.sortInfo.field = field;
  		this.sortInfo.order = 'asc';
  	}
  	this.getBooksList( );
  }

  deleteBook ( id ) {

    let _data = {
      message: "Вы уверены, что хотите удалить данную книгу?",
      confirmButtonText: "Удалить",
      cancelButtonText: "Нет"
    };

    this.global.confirmMessage( _data, ( ) => {    

    	let params = {};

    	params = {
    		method: 'delete',
    		entity: 'books',
    		id: id,
    		callback: ( response ) => {
            let data = { html: 'Книга успешно удалёна!' };
            if ( response.statusText == 'OK' ) {
              this.global.successMessage( data );
    			    this.getBooksList( );
            }
    		}
    	}

    	this.global._Request( id, params );
      
    });
  }
}
