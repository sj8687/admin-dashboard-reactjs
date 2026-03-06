import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {

  const token = document.cookie.includes("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}