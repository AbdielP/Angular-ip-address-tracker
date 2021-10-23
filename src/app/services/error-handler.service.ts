import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  simpleErrorHandler(err: any):void {
    console.log(err.error);
    // Forbidden request 
    if ( err.error.code === 403) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.error.messages}`,
        footer: 'Seems like API key ran out of available requests ¯\_(ツ)_/¯'
      });
      return;
    }
    // Any response
    Swal.fire(
      'Problem?',
      `${err.error.messages}`,
      'question'
    )
  }
}
