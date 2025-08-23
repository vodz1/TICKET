import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Auth } from "../Services/auth";

export const roleGuard: CanActivateFn = (route, state ,) => {
    const auth = inject(Auth);
    const router = inject(Router);

    const user = auth.user(); // decoded payload (UserInfo | null)
    const allowedRoles: string[] = route.data['allowedRoles'] || [];

    if (user && allowedRoles.includes(user.role)) {
      return true;
    }

    // 🚫 Not authorized → redirect
    router.navigate(['/unauthorized']); // or login page
    return false;
};
