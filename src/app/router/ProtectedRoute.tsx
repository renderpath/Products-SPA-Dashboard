import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../shared/hooks/useAppSelector";

type ProtectedRouteProps = {
    children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const location = useLocation();
    const isAuth = useAppSelector((state) => Boolean(state.auth.user));

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}