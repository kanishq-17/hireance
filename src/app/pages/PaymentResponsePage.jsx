import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';

const PaymentResponsePage = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handlePaymentResponse = async () => {
      try {
        const orderId = searchParams.get('order_id');
        const encodedStatus = searchParams.get('status');

        console.log('[PAYMENT RESPONSE] Page loaded');
        console.log('[PAYMENT RESPONSE] Order ID:', orderId);
        console.log('[PAYMENT RESPONSE] Has status param:', !!encodedStatus);

        if (!orderId) {
          console.error('[ERROR] No order ID in URL');
          setError('Invalid payment response - missing order ID');
          return;
        }

        let apiUrl = `http://localhost:5000/api/payments/handle-response?order_id=${orderId}`;
        if (encodedStatus) {
          apiUrl += `&status=${encodeURIComponent(encodedStatus)}`;
        }

        console.log('[API] Calling handle-response endpoint');

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        console.log('[API] Response:', data);

        if (data.success && data.redirectUrl) {
          console.log('[REDIRECT] Redirecting to:', data.redirectUrl);
          window.location.href = data.redirectUrl;
        } else {
          console.error('[ERROR] Failed to process payment');
          setError(data.error || 'Failed to process payment response');
        }

      } catch (err) {
        console.error('[ERROR] Exception:', err);
        setError('An error occurred while processing payment');
      }
    };

    handlePaymentResponse();
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Error</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.href = '/jobs'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center">
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment...</h2>
        <p className="text-gray-600 text-lg mb-1">Please wait while we verify your payment</p>
        <p className="text-gray-400 text-sm">Do not close this window</p>
      </div>
    </div>
  );
};

export default PaymentResponsePage;
