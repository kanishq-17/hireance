import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentSuccessCard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [paymentData, setPaymentData] = useState({
    orderId: '',
    paymentId: '',
    applicationId: '',
    amount: '',
    status: '',
    date: '',
    paymentMethod: 'Not Available'
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      console.log('=== PAYMENT SUCCESS PAGE LOADED ===');
      console.log('Current URL:', window.location.href);
      console.log('Search Params:', searchParams.toString());

      const orderId = searchParams.get('order_id');
      const paymentId = searchParams.get('payment_id');
      const applicationId = searchParams.get('application_id');
      const amount = searchParams.get('amount');
      const status = searchParams.get('status');
      const date = searchParams.get('date');

      console.log('Payment Success - Received params:', { 
        orderId, paymentId, applicationId, amount, status, date 
      });

      if (!orderId) {
        console.error('No order ID found, redirecting to home');
        navigate('/');
        return;
      }

      try {
        let paymentMethod = 'Not Available';
        
        try {
          const response = await fetch(`http://localhost:5000/api/payments/details/${orderId}`);
          const result = await response.json();
          
          if (result.success && result.payment) {
            paymentMethod = result.payment.payment_method || 'Not Available';
            console.log('[SUCCESS] Fetched payment method:', paymentMethod);
          }
        } catch (error) {
          console.error('[WARNING] Failed to fetch payment method:', error);
        }

        // Format the date
        let formattedDate = 'N/A';
        if (date) {
          const dateObj = new Date(date);
          formattedDate = dateObj.toLocaleString('en-IN', { 
            timeZone: 'Asia/Kolkata',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          });
          formattedDate = formattedDate.replace(',', ' •');
        }

        // Set payment data with all IDs
        setPaymentData({
          orderId: orderId || 'N/A',
          paymentId: paymentId || 'N/A',
          applicationId: applicationId || 'N/A',
          amount: amount || '0',
          status: status || 'UNKNOWN',
          date: formattedDate,
          paymentMethod: paymentMethod
        });

        console.log('[SUCCESS] Payment data set:', {
          orderId, paymentId, applicationId, amount, status, paymentMethod
        });

      } catch (error) {
        console.error('Error processing payment details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [searchParams, navigate]);

  const handleBackToHome = () => {
    navigate('/');
  };

  // Generate barcode numbers from order ID
  const generateBarcodeNumbers = () => {
    const orderIdNum = paymentData.orderId.replace(/\D/g, '').substring(0, 12);
    const part1 = orderIdNum.substring(0, 7) || '1768838';
    const part2 = orderIdNum.substring(7, 13) || '13958';
    return { part1, part2 };
  };

  const { part1, part2 } = generateBarcodeNumbers();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      {/* Ticket Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Top Section */}
        <div className="px-6 pt-8 pb-6 text-center bg-gradient-to-br from-green-50 to-blue-50">
          <div className="text-5xl mb-3">🎉</div>

          <h2 className="text-2xl font-bold text-gray-900">
            Payment Successful!
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Your application has been submitted successfully
          </p>
        </div>

        {/* Dashed Divider */}
        <div className="relative border-t border-dashed border-gray-300">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full"></div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full"></div>
        </div>

        {/* Payment Details */}
        <div className="px-6 py-6 space-y-4">
          {/* Amount & Status */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Amount Paid</p>
              <p className="text-3xl font-bold text-green-600 mt-1">₹{paymentData.amount}</p>
            </div>
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              {paymentData.status}
            </div>
          </div>

          <div className="space-y-3">
            {/* Order ID - Full Width */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Order ID</p>
              <p className="font-mono text-xs text-gray-900 break-all">
                {paymentData.orderId}
              </p>
            </div>

            {/* Payment ID - Full Width, NO TRUNCATION */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-blue-600 uppercase tracking-wide mb-1">Payment ID</p>
              <p className="font-mono text-xs text-gray-900 break-all">
                {paymentData.paymentId}
              </p>
            </div>

            {/* Application ID - Full Width, NO TRUNCATION */}
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-xs text-purple-600 uppercase tracking-wide mb-1">Application ID</p>
              <p className="font-mono text-xs text-gray-900 break-all">
                {paymentData.applicationId}
              </p>
            </div>
          </div>

          {/* Transaction Date */}
          <div className="pt-2">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Transaction Date</p>
            <p className="font-medium text-gray-900 mt-1">{paymentData.date}</p>
          </div>

          <div className="mt-4 flex items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
            <div className="flex gap-1">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <span className="w-4 h-4 bg-green-400 rounded-full -ml-2"></span>
            </div>

            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">Application Payment</p>
              <p className="text-gray-600 text-sm">
                Status: <span className="font-medium text-green-700">{paymentData.status}</span>
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Method: <span className="font-medium text-blue-700">{paymentData.paymentMethod}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Dashed Divider */}
        <div className="border-t border-dashed border-gray-300"></div>

        {/* Barcode */}
        <div className="px-6 py-6">
          <div className="h-14 flex items-end gap-[2px] justify-center">
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className={`bg-black ${
                  i % 3 === 0 ? "h-full" : "h-10"
                } w-[2px]`}
              />
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
            <span>{part1}</span>
            <span>{part2}</span>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="px-6 pb-8">
          <button
            onClick={handleBackToHome}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            Back to Home
          </button>
        </div>

        {/* Bottom Ticket Cuts */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-6 translate-y-1/2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-6 h-6 bg-gray-50 rounded-full shadow-inner" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessCard;
