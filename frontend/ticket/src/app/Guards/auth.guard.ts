import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Auth } from "../Services/auth";

export const authGuard : CanActivateFn = (req , err)=>{
    const auth = inject(Auth)
     const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }
  // Redirect to login if not logged in
  router.navigate(['/login']);
  return false;
} 