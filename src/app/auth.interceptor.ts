import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = getJwtToken()
  if (jwtToken){
    var clone = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })

    return next(clone);
  }

  return next(req);
};

function getJwtToken(): String | null{
  return localStorage.getItem("JWT_TOKEN");
}
