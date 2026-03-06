import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyLogin() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("Token");

    if (!token) {
      console.error("No token found!");
      navigate("/login");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/verify", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) {
          throw new Error("Verification failed");
        }

        // backend should set cookie here
        navigate("/dashboard");

      } catch (err) {
        console.error("Error verifying login:", err);
        navigate("/login");
      }
    };

    verify();
  }, [params, navigate]);

  return (
    <p className="text-black text-4xl text-center">
      Verifying login...
    </p>
  );
}