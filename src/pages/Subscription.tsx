import { useState, useEffect } from 'react';
import { createSubscription,  } from '../services/subscriptionService';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getClientProfile } from '../services/clientService';
import { ClientData } from './ClientPages/Profile';
import { useSearchParams } from "react-router-dom";


const paymentErrorMessages: Record<string, string> = {
  PAY_001: "Payment reference was missing. Please try again.",
  PAY_002: "We could not verify your payment. Please retry.",
  PAY_003: "Payment was not successful. No charges were applied.",
  PAY_004: "Subscription record could not be found. Contact support.",
  PAY_500: "An unexpected error occurred. Please try again later.",
};


const plans = [
  {
    title: 'Standard Plan',
    price: '47,000',
    duration: '1 Month',
    features: [
      'Initial Consultation',
      '2 Weeks Meal Plan',
      '20mins Follow Up Consultations',
      'Personalized Recipe Book',
      'Group Chat Accountability',
    ],
    color: 'bg-green-100',
    button: 'bg-green-500',
  },
  {
    title: 'Premium Plan',
    price: '90,000',
    features: [
      'Initial Consultation',
      '3 Weeks Meal Plan',
      'Weekly Follow Up Consultations',
      'Personalized Recipe Book',
      'Group Chat Accountability',
      'Personalized Chat and Consultation',
      'Dedicated Dietician',
    ],
    color: 'bg-yellow-100',
    button: 'bg-yellow-500',
    popular: true,
  },
  {
    title: 'Special Plan',
    price: '150,000',
    duration: '1 Month',
    features: [
      'Initial Consultation',
      '4 Weeks Meal Plan',
      'Weekly Follow Up Consultations',
      'Personalized Recipe Book',
      'Group Chat Accountability',
      'Personalized Chat and Consultation',
      'Dedicated Dietician',
      'Dietitian Care Aligned with your Doctor',
    ],
    color: 'bg-purple-100',
    button: 'bg-purple-600',
  },
];

type Duration = '1 Month' | '3 Months' | '6 Months' | '1 Year';

const billingDurations: Record<Duration, { interval: 'monthly' | 'quarterly' | 'yearly'; count: number }> = {
  '1 Month': { interval: 'monthly', count: 1 },
  '3 Months': { interval: 'monthly', count: 3 },
  '6 Months': { interval: 'monthly', count: 6 },
  '1 Year': { interval: 'yearly', count: 1 },
};


const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const backendErrorCode = searchParams.get("error");
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<Duration>('1 Month');
  const [subscribingPlan, setSubscribingPlan] = useState<string | null>(null);
  const durations: Duration[] = ['1 Month', '3 Months', '6 Months', '1 Year'];

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const backendErrorMessage =
    backendErrorCode ? paymentErrorMessages[backendErrorCode] : null;


  useEffect(() => {

  const token = localStorage.getItem('access_token');

  setAccessToken(token);
}, []);

  useEffect(() => {
    const fetchClientProfile = async () => {
      try {
        const response = await getClientProfile();
        console.log(response.data)
       
        if (response.success) {
          setClientData(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch client profile", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    
    fetchClientProfile();
  }, []);


  const handleSubscribe = async (plan: typeof plans[number]) => {
    setSearchParams({});

     if (!clientData?.id) {
      console.error('Client clientId provided');
      return;
    }

    setLoading(true);
    setSubscribingPlan(plan.title);
    const billing = billingDurations[selectedDuration];
    const numericAmount = Number(plan.price.replace(/,/g, ''));

    const payload = {
      planName: plan.title,
      amount: numericAmount,
      billingInterval: billing.interval,
      billingCycleCount: billing.count,
      currency: 'NGN',
      gateway: 'paystack',  
      metadata: {
        features: plan.features,
        autoRenew: false,
      },
    };

    console.log('Creating subscription with payload:', payload);


    try {
      const response = await createSubscription(payload);
        

      if (!response) {
        throw new Error('Subscription creation failed');
      }
        const authorizationUrl = response.payment?.data?.authorization_url;
        if(!authorizationUrl){
          console.error('Payment URL not found in response');
           throw new Error("Payment URL not found in response")
        }

        console.log('Redirecting to:', authorizationUrl);
       
         navigate("/client/payment-init", {
           state: { authorizationUrl },
         })
      console.log('Subscription created:', response);
    } catch (error) {
      console.error('Error creating subscription:', error);
    } finally {
    setSubscribingPlan(null);
    setLoading(false); 
  }
  };

   if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FFF3]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-green-500" />
          <p className="text-gray-600">Loading subscription plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FFF3] justify-center p-6">

<div className='p-6'>
     
     <div className="flex justify-between mb-6 items-center ">
        <div>
          <h2 className="text-xl font-semibold">Purchase & Subscription</h2>
          <p className="text-sm">Keep track of your subscription details, update your purchase information & control your account payment.</p>
        </div>

       

        <div className="flex gap-2 bg-[#EBFAD7] h-[40px] text-[15px] border-transparent rounded-full p-1">
          {durations.map((duration) => (
            <button
              key={duration}
              onClick={() => setSelectedDuration(duration)}
              className={`px-2   ${
                selectedDuration === duration
                  ? 'bg-white text-black border-white rounded-full border'
                  : ''
              }`}
            >
              {duration}
            </button>
          ))}
        </div>
      </div>
    

     {backendErrorMessage && (
          <div className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {backendErrorMessage}
          </div>
        )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className={`rounded-xl shadow-lg p-6 ${plan.color} relative flex flex-col justify-between`}
          >
            {plan.popular && (
              <span className="absolute top-4 right-4 text-xs font-semibold text-white bg-black px-2 py-1 rounded">
                POPULAR
              </span>
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">{plan.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{plan.duration}</p>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                ₦{plan.price}
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                {plan.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
            <button
            onClick={() => handleSubscribe(plan)}
            disabled={loading && subscribingPlan === plan.title}
            
              className={`mt-6 py-3 w-full text-white font-semibold rounded-xl transition duration-200 ${
                loading && subscribingPlan === plan.title
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : `${plan.button} text-white hover:opacity-90`
              } `}
            >
              {loading && subscribingPlan === plan.title ? (
                <span className="flex items-center justify-center gap-2">
                <Loader2 size={18} className="animate-spin" /> Subscribing...
                </span>
              ) : ('Get Now ')}
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SubscriptionPlans;
