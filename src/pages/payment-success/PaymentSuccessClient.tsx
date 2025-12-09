'use client';

import React, { Suspense } from 'react';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const PaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('atn');
    localStorage.setItem('access_token', token || '');
    const timeout = setTimeout(() => {
      router.push('/client/profile');
    }, 2000); 

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-white">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      <p className="text-gray-700 mt-2">Redirecting to your profile page...</p>
    </div>
  );
};

export default PaymentSuccess;
