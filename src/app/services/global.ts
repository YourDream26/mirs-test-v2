import { Injectable, Inject } from '@angular/core';
import { Title, DOCUMENT } from '@angular/platform-browser';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable( )
export class GlobalService {

  displayWidthSubject: Subject<number> = new Subject( );
  displayWidth: number = 1024;
  requestURL: string = '/api/handler.php';

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
      title: 'Success',
      html: data.html || '', 
      showConfirmButton: false
    };
    this.successMessage( messageData );
    setTimeout( ( ) => {
      // swal.close( );
      this.redirect( data.redirect || '/' );
    }, 3000 );
  }


  defaultErrorCallback ( message?: string, autoclose?: boolean ) {
    let data = {
      type: 'error',
      title: '',
      html: message || 'We got some error here...'
    }
    this.errorMessage( data );
    // if ( autoclose !== false ) setTimeout( ( ) => { swal.close( ); }, 6000 );
  }


  successMessage ( data ) {

    if ( data.title === undefined ) data.title = '';
    if ( data.html === undefined ) data.html = '';
    if ( data.type === undefined ) data.type = 'success';
    if ( data.confirmButtonColor === undefined ) data.confirmButtonColor = "#8ac440";

    // swal( data );
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
      title: "Warning!",
      html: data.message || "Are you sure want to do this?",
      showCancelButton: true,
      confirmButtonColor: "#8ac440"
    };
    
    messageData['type'] = 'question';
    if ( data.confirmButtonText ) messageData['confirmButtonText'] = data.confirmButtonText;
    if ( data.cancelButtonText ) messageData['cancelButtonText'] = data.cancelButtonText;

    // swal( messageData ).then( ( result ) => { 
    //   if ( this.isFunction( cb ) ) cb( ); 
    // }).catch( swal.noop );

  }


    
  errorMessage ( data ) {

    if ( data.title === undefined ) data.title = '';
    if ( data.html === undefined ) data.html = '';
    if ( data.type === undefined ) data.type = 'error';
    if ( data.confirmButtonColor === undefined ) data.confirmButtonColor = "#fd3753";
    if ( data.confirmButtonText === undefined ) data.confirmButtonText = "OK";

    // swal( data );
  }



  redirect ( url ) {
    this.router.navigate( [ url ] );
  }


  // Check if entity is function for callbacks etc.
  isFunction ( entity: any ) {  return ( typeof entity === 'function' ) }



  // Custom wrapper for GET
  getRequest ( URL, callback ) {
    this.http.get( this.requestURL+'?method='+URL )
    .subscribe( ( data: Response ) => {
        if ( this.isFunction( callback ) ) callback( data );
    });
  }


  // Open link in new tab
  openLinkNewTab ( url ) {
    window.open( url, "_blank" );
  }




  // Custom wrapper for POST
  postRequestToken ( data, token, callback ) {

      let _options;
      let headers = new Headers({ 'Content-Type': 'application/json' });

      _options = new RequestOptions({ headers: headers });

      this.http.post( 
        this.requestURL,
        data,
        _options
        )
      .subscribe( 
        // Success
        ( data: Response ) => {
          if ( this.isFunction( callback ) ) callback( data );
        }, 
        // Error
        ( response ) => {
          if ( response.status == '401' ) {
            if ( this.isFunction( callback ) ) callback( response );
          }
          if ( response.status == '500' ) {
            this.errorMessageFH( response.text( ) );
          }
      } );
  }

}
