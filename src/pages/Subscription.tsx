import React, { useState, useEffect } from 'react';
import { initializeSubscriptionPayment, createSubscription, InitializeSubscriptionPayload } from '../services/subscriptionService';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getClientProfile } from '../services/clientService';
import { ClientData } from './ClientPages/Profile';



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
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<Duration>('1 Month');
  const [subscribingPlan, setSubscribingPlan] = useState<string | null>(null);
  const durations: Duration[] = ['1 Month', '3 Months', '6 Months', '1 Year'];

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


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

     if (!clientData?.id) {
      console.error('Client clientId provided');
      return;
    }

    setLoading(true);
    setSubscribingPlan(plan.title);
    const billing = billingDurations[selectedDuration];
    const numericAmount = Number(plan.price.replace(/,/g, ''));

    const payload = {
      subscriberId: clientData?.id,
      planName: plan.title,
      amount: numericAmount,
      billingInterval: billing.interval,
      currency: 'NGN',
      billingCycleCount: billing.count,
      metadata: {
        features: plan.features,
      },
    };

    try {
      const response = await createSubscription(payload);
      console.log('Subscription created:', response.id);
      const subscriptionId = response.id;

      if (!subscriptionId) {
        throw new Error('Subscription ID missing');
      }

        const paymentPayload: InitializeSubscriptionPayload = {
          gateway: 'paystack',
          reference: `sub_${Date.now()}`,
          metadata: {
            auto_renew: true,
          },  
          redirectUrl: `${import.meta.env.VITE_PUBLIC_BASE_URL}/payment-success?atn=${accessToken}`,
        };

        const paymentResponse = await initializeSubscriptionPayment(subscriptionId, paymentPayload);
        console.log('Payment initialized:', paymentResponse);
        const paymentUrl = paymentResponse.data.authorization_url;
        console.log("paymenturl", paymentUrl)
        if (paymentUrl) {
           navigate("/client/payment-init", {
           state: { paymentUrl },
         });
        } else {
          console.error('Payment URL not found in response');
        }
      console.log('Subscription created:', response);
    } catch (error) {
      console.error('Error creating subscription:', error);
    } finally {
    setSubscribingPlan(null);
    setLoading(false); 
  }
  };

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
