import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../services/global';
import { Author } from '../../../classes/author';
import { Book } from '../../../classes/book';

@Component({
  selector: 'author-books',
  templateUrl: './author-books.component.html',
  styleUrls: [ './author-books.component.css' ]
})
export class AuthorBooksComponent implements OnInit {
  
  id: number;
	author: Author;
  booksList: Array<Book> = [];
	sortInfo: any = {
		field: 'name',
		order: 'asc'
	};

	constructor ( private route: ActivatedRoute, private global: GlobalService ) { }

  ngOnInit ( ) {

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getAuthor( );
    });
  }


  getAuthor ( ) {

    // json-server Ну ооооооочень странно работает с _embed и _expand. 
    // По всем правилам не удаётся реализовать элементарный left join
    // Для связи many-to-many. Был бы самый обыкновенный php сервер, всё было бы отлично,
    // но тут придётся делать 2 запроса. Знаю, что плохая практика, но
    // Тут больше вина разработчиков псевдо-сервера. 

  	this.global.getRequest( 'authors/'+this.id, response => {
  		this.author = response.json( );
      this.getBooksOfAuthor( );
  	});

  }

  getBooksOfAuthor ( ) {

    this.global.getRequest( 'books?_expand=genre&_sort='+this.sortInfo.field+'&_order='+this.sortInfo.order+'&id_in='+this.author.bookIds, response => {
      this.booksList = response.json( );
    });

  }


  changeSort ( field ) {
  	if ( this.sortInfo.field == field ) {
  		this.sortInfo.order = (this.sortInfo.order == 'asc') ? 'desc' : 'asc';
  	} else {
  		this.sortInfo.field = field;
  		this.sortInfo.order = 'asc';
  	}
  	this.getAuthor( );
  }


}
