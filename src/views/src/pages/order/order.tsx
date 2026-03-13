import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Order() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Order Page</h1>
    </div>
  );
}
