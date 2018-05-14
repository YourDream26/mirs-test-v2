import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  host: {
    '( document: click )': 'onClickDocument( $event )'
  },
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
  
	isDropdownMenuVisible: boolean = false;
  dropdownMenuSelector1;
  dropdownMenuSelector2;

  constructor ( private _el: ElementRef ) {  }


  ngOnInit ( ) { 

  }


  onClickDropdownButton ( ) {
      if ( !this.isDropdownMenuVisible ) this.toggleDropdownMenu( );
      return false;
  }
  toggleDropdownMenu ( ) {
      this.isDropdownMenuVisible = !this.isDropdownMenuVisible;
      return false;
  }

  onClickDocument ( event ) {

    this.dropdownMenuSelector1 = this._el.nativeElement.getElementsByClassName( 'dropdown-menu' )[0];
    this.dropdownMenuSelector2 = this._el.nativeElement.getElementsByClassName( 'dropdown-toggle' )[0];

    if ( this.isDropdownMenuVisible 
        && ( this.dropdownMenuSelector2 != event.target )
        && ( this.dropdownMenuSelector1 != event.target ) ) {

        this.toggleDropdownMenu( );
    }
  }


}
