import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const reference = query.get("reference");
    const atn = query.get("atn"); 
    if (!reference) {
      setMessage("Payment reference missing. Redirecting...");
      setTimeout(() => navigate("/client/subscribe"), 3000);
      return;
    }

    const verifyPayment = async () => {
      try {
        // Call your backend verification endpoint
        const response = await axios.get(
          `https://eat-right-be.onrender.com/subscriptions/verify-payment?reference=${reference}`,
          {
            headers: {
              Authorization: `Bearer ${atn}`,
            },
          }
        );

        if (response.data.success) {
          setMessage("Payment successful! Redirecting to your profile...");
          setTimeout(() => navigate("/client/profile"), 3000);
        } else {
          setMessage("Payment failed. Redirecting to subscription page...");
          setTimeout(() => navigate("/client/subscribe?failed=true"), 3000);
        }
      } catch (error) {
        console.error(error);
        setMessage("Payment verification failed. Redirecting...");
        setTimeout(() => navigate("/client/subscribe?failed=true"), 3000);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location.search, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#F8FFF3]">
      <h2 className="text-xl font-semibold mb-4">{message}</h2>
      {loading && <div className="loader">Loading...</div>}
    </div>
  );
};

export default PaymentSuccess;
