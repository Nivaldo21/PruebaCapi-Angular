import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((error: HttpErrorResponse) =>{
    let errorMsg = '';

      if (error.status === 400) {
        errorMsg = 'Solicitud incorrecta (Bad Request). Verifica los datos enviados.';
      } else if (error.status === 500) {
        errorMsg = 'Error interno del servidor. Intenta nuevamente más tarde.';
      } else if (error.status === 404) {
        errorMsg = 'Recurso no encontrado (404).';
      } else {
        errorMsg = `Error inesperado: ${error.message}`;
      }
      return throwError(() => new Error(errorMsg));
  }));
};
