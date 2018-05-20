import { Injectable, Inject } from '@angular/core';
import { Title, DOCUMENT } from '@angular/platform-browser';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert2';

@Injectable( )
export class GlobalService {

  displayWidthSubject: Subject<number> = new Subject( );
  displayWidth: number = 1024;

  // I need only change this if server location will be changed
  // I also can get it from environment variable to not change every time if I got dev and prod servers
  requestURL: string = 'http://localhost:3000/';

  defaultDatepickerOptions: any = {
    dayLabels: {
      su: 'Вс', 
      mo: 'Пн', 
      tu: 'Вт', 
      we: 'Ср', 
      th: 'Чт', 
      fr: 'Пт', 
      sa: 'Сб'
    },
    monthLabels: {
      1: 'Янв', 
      2: 'Фев', 
      3: 'Март', 
      4: 'Апр', 
      5: 'Май', 
      6: 'Июнь', 
      7: 'Июль', 
      8: 'Авг', 
      9: 'Сен', 
      10: 'Окт', 
      11: 'Ноя', 
      12: 'Дек' 
    },
    dateFormat: 'dd.mm.yyyy',
    showTodayBtn: false,
    showClearDateBtn: false,
    openSelectorOnInputClick: true,
    editableDateField: false
  };

  constructor (
    @Inject(DOCUMENT) private document: Document,
    private http: Http,
    private _location: Location,
    private router: Router
    ) { 

    // Set starter display width
    this.displayWidth = this.document.body.clientWidth;

    // Update display width on resize
    this.getDisplayWidth( ).subscribe( _width => { this.displayWidth = _width; });

  }

  getDisplayWidth ( ): Observable<any> { return this.displayWidthSubject.asObservable( ); }
  updateWindowResize ( _width: number ) { this.displayWidthSubject.next( _width ); }


  goBack ( ) { this._location.back( ); }


  defaultSuccessMessage ( data ) {
    let messageData = {
      title: '',
      html: data.html || '', 
      showConfirmButton: false
    };
    this.successMessage( messageData );
    setTimeout( ( ) => {
      swal.close( );
      this.redirect( data.redirect || '/' );
    }, 3000 );
  }


  defaultErrorCallback ( message?: string, autoclose?: boolean ) {
    let data = {
      type: 'error',
      title: '',
      html: message || 'Произошла ошибка...'
    }
    this.errorMessage( data );
    if ( autoclose !== false ) setTimeout( ( ) => { swal.close( ); }, 6000 );
  }


  successMessage ( data ) {

    if ( data.title === undefined ) data.title = '';
    if ( data.html === undefined ) data.html = '';
    if ( data.type === undefined ) data.type = 'success';
    if ( data.confirmButtonColor === undefined ) data.confirmButtonColor = "#8ac440";

    swal( data );
  }


  errorMessageFH ( message ) {
    let messageData = {
      title: 'Error!',
      html: message || '', 
      showConfirmButton: true
    };
    // onClose: ( ) => location.reload( )
    this.errorMessage( messageData );
  }


  confirmMessage ( data, cb ) {

    let messageData = {
      title: "Внимание!",
      html: data.message || "Вы уверены, что хотите сделать это?",
      showCancelButton: true,
      confirmButtonColor: "#8ac440"
    };
    
    messageData['type'] = 'question';
    if ( data.confirmButtonText ) messageData['confirmButtonText'] = data.confirmButtonText;
    if ( data.cancelButtonText ) messageData['cancelButtonText'] = data.cancelButtonText;

    swal( messageData ).then( ( result ) => { 
      if ( result.value ) {
        if ( this.isFunction( cb ) ) cb( ); 
      }
    }).catch( swal.noop );

  }


    
  errorMessage ( data ) {

    if ( data.title === undefined ) data.title = '';
    if ( data.html === undefined ) data.html = '';
    if ( data.type === undefined ) data.type = 'error';
    if ( data.confirmButtonColor === undefined ) data.confirmButtonColor = "#fd3753";
    if ( data.confirmButtonText === undefined ) data.confirmButtonText = "OK";

    swal( data );
  }



  redirect ( url ) {
    this.router.navigate( [ url ] );
  }


  // Check if entity is function for callbacks etc.
  isFunction ( entity: any ) {  return ( typeof entity === 'function' ) }



  // Custom wrapper for GET
  getRequest ( URL, callback ) {
    this.http.get( this.requestURL+URL )
    .subscribe( ( data: Response ) => {
        if ( this.isFunction( callback ) ) callback( data );
    });
  }


  // Open link in new tab
  openLinkNewTab ( url ) {
    window.open( url, "_blank" );
  }




  // Custom wrapper for requests (not GET)
  _Request ( data, params ) {

      let _options, headers, _url, _params;

      _params = params || {};

      if ( !_params.method ) {
        this.defaultErrorCallback( 'Метод не указан!' );
        return;
      }

      if ( !_params.entity ) {
        this.defaultErrorCallback( 'Сущность не указана!' );
        return;
      }

      headers = new Headers({ 'Content-Type': 'application/json' });
      _options = new RequestOptions({ headers: headers });

      _url = this.requestURL + _params.entity;
      if ( _params.id != undefined ) _url += '/' + _params.id;

      this.http[_params.method]( 
        _url,
        data,
        _options
        )
      .subscribe( 
        // Success
        ( data: Response ) => {
          if ( _params.callback && this.isFunction( _params.callback ) ) _params.callback( data );
        }, 
        // Error
        ( response ) => {
          if ( response.status == '401' ) {
            if ( _params.callback && this.isFunction( _params.callback ) ) _params.callback( response );
          }
          if ( response.status == '500' ) {
            this.errorMessageFH( response.text( ) );
          }
      } );
  }

}
