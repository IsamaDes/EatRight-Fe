import React, { Suspense } from 'react';
import PaymentSuccessClient from './PaymentSuccessClient';

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading payment confirmation...</div>}>
      <PaymentSuccessClient />
    </Suspense>
  );
}
