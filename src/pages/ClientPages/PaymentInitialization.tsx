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
    <div>
      <h2>Preparing your payment...</h2>
      <p>You will be redirected shortly.</p>
    </div>
  );
};

export default PaymentInit;
