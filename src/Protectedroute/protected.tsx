// import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {

  const token = document.cookie.includes("access_token");

  console.log(token);
  

  if (!token) {
    // return <Navigate to="/Dashboard" replace />;
  }

  return <>{children}</>;
}

















// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// interface Props {
//   children: React.ReactNode;
// }

// export default function ProtectedRoute({ children }: Props) {
//   const [loading, setLoading] = useState(true);
//   const [authorized, setAuthorized] = useState(false);

//   useEffect(() => {
//     axios
//       .get("https://bios-jim-existed-mariah.trycloudflare.com/api/super-admin/verify", {
//         withCredentials: true,
//       })
//       .then(() => {
//         setAuthorized(true);
//       })
//       .catch(() => {
//         setAuthorized(false);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   if (!authorized) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// }