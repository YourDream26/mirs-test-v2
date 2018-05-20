import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global';
import { Author } from '../../../classes/author';

@Component({
  selector: 'author-list',
  templateUrl: './author-list.component.html',
  styleUrls: [ './author-list.component.css' ]
})
export class AuthorListComponent implements OnInit {
  
	authorsList: Author[] = [];
	sortInfo: any = {
		field: 'surname,name,patronymic',
		order: 'asc'
	};

	constructor ( private global: GlobalService ) { }

  ngOnInit ( ) {
  	this.getAuthorsList( );
  }


  getAuthorsList ( ) {

  	this.global.getRequest( 'authors?_sort='+this.sortInfo.field+'&_order='+this.sortInfo.order, ( data ) => {
  		this.authorsList = data.json( );
  	});

  }


  changeSort ( field ) {
  	if ( this.sortInfo.field == field ) {
  		this.sortInfo.order = (this.sortInfo.order == 'asc') ? 'desc' : 'asc';
  	} else {
  		this.sortInfo.field = field;
  		this.sortInfo.order = 'asc';
  	}
  	this.getAuthorsList( );
  }

  deleteAuthor ( id ) {

    let _data = {
      message: "Вы уверены, что хотите удалить данного автора?",
      confirmButtonText: "Удалить",
      cancelButtonText: "Нет"
    };

    this.global.confirmMessage( _data, ( ) => {    

    	let params = {};

    	params = {
    		method: 'delete',
    		entity: 'authors',
    		id: id,
    		callback: ( response ) => {
            let data = { html: 'Автор успешно удалён!' };
            if ( response.statusText == 'OK' ) {
              this.global.successMessage( data );
    			    this.getAuthorsList( );
            }
    		}
    	}

    	this.global._Request( id, params );
      
    });
  }

}
