import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { TokenService } from "../services/token.service";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const authService = inject(AuthService);

  // ⚠️ Rutas públicas → no agregues Authorization
  const isPublic =
    req.url.includes('/login') ||
    req.url.includes('/refresh-token');

  if (!isPublic) {
    const token = tokenService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // Si el token expiró o no es válido → cerrar sesión directamente
      if (err.status === 401 && !isPublic) {
        console.warn("Token expirado o inválido. Cerrando sesión...");
        authService.onLogout();
        router.navigate(['/login']);
      }

      // En cualquier caso, no se reintenta la request ni se refresca token
      return throwError(() => err);
    })
  );
};
