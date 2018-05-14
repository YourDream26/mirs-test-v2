import { Book } from './book';


export class Author {
	birthdate: 		any;
	books: 				Book[] = [];
	id: 					number;
	name: 				string;
	patronymic: 	string = '';
	surname: 			string;
}