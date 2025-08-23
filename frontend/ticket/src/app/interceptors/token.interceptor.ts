import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Auth } from "../Services/auth";

export const tokenInterceptor : HttpInterceptorFn = (req , next) =>{
const auth = inject(Auth);
const token = auth.getToken();
console.log('TokenInterceptor: ', token);
if (token) {
req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

}
return next(req);
}