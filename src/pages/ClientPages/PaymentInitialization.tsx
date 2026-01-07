
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PaymentInit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentUrl = location.state?.paymentUrl;

  useEffect(() => {
    if (!paymentUrl) {
      navigate("/client/subscribe");
      return;
    }

    const timer = setTimeout(() => {
      window.location.href = paymentUrl;
    }, 2000);

    return () => clearTimeout(timer);
  }, [paymentUrl, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-xl p-8 text-center max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Preparing your payment...
        </h2>
        <p className="text-gray-600 mb-6">
          You will be redirected shortly.
        </p>
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInit;

