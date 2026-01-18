import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentSuccessCard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [paymentData, setPaymentData] = useState({
    orderId: '',
    amount: '',
    status: '',
    date: '',
    customerName: 'Payment User'
  });

  useEffect(() => {
    const orderId = searchParams.get('order_id');
    const amount = searchParams.get('amount');
    const status = searchParams.get('status');
    const date = searchParams.get('date');

    console.log('Payment Success - Received params:', { orderId, amount, status, date });

    if (!orderId) {
      console.log('No order ID found, redirecting to home');
      navigate('/');
      return;
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
      // Format: "19 Jan 2026 • 19:03"
      formattedDate = formattedDate.replace(',', ' •');
    }

    setPaymentData({
      orderId: orderId || 'N/A',
      amount: amount || '0',
      status: status || 'UNKNOWN',
      date: formattedDate,
      customerName: 'Application Payment'
    });
  }, [searchParams, navigate]);

  const handleBackToHome = () => {
    navigate('/');
  };

  // Generate barcode numbers from order ID
  const generateBarcodeNumbers = () => {
    const orderIdNum = paymentData.orderId.replace(/\D/g, '').substring(0, 12);
    const part1 = orderIdNum.substring(0, 7) || '2893726';
    const part2 = orderIdNum.substring(7, 13) || '273610';
    return { part1, part2 };
  };

  const { part1, part2 } = generateBarcodeNumbers();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* Ticket Card */}
      <div className="relative w-[340px] bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Top Section */}
        <div className="px-6 pt-8 pb-6 text-center">
          <div className="text-3xl">🎉</div>

          <h2 className="mt-3 text-xl font-semibold text-gray-900">
            Thank you!
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your application has been submitted successfully
          </p>
        </div>

        {/* Dashed Divider */}
        <div className="relative border-t border-dashed border-gray-300">
          {/* Left cut */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full"></div>
          {/* Right cut */}
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full"></div>
        </div>

        {/* Ticket Info */}
        <div className="px-6 py-6 space-y-4">
          <div className="flex justify-between text-sm">
            <div className="flex-1 pr-2">
              <p className="text-gray-400 text-xs uppercase tracking-wide">Order ID</p>
              <p className="font-medium text-gray-900 text-xs break-all mt-1">
                {paymentData.orderId}
              </p>
            </div>

            <div className="text-right flex-shrink-0">
              <p className="text-gray-400 text-xs uppercase tracking-wide">Amount</p>
              <p className="font-medium text-gray-900 text-base mt-1">
                ₹{paymentData.amount}
              </p>
            </div>
          </div>

          <div className="text-sm">
            <p className="text-gray-400 text-xs uppercase tracking-wide">Date & Time</p>
            <p className="font-medium text-gray-900 mt-1">{paymentData.date}</p>
          </div>

          {/* Payment Status Card */}
          <div className="mt-4 flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
            <div className="flex gap-1">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <span className="w-4 h-4 bg-green-400 rounded-full -ml-2"></span>
            </div>

            <div className="text-sm">
              <p className="font-medium text-gray-900">{paymentData.customerName}</p>
              <p className="text-gray-500">{paymentData.status}</p>
            </div>
          </div>
        </div>

        {/* Dashed Divider */}
        <div className="border-t border-dashed border-gray-300"></div>

        {/* Barcode */}
        <div className="px-6 py-6">
          <div className="h-14 flex items-end gap-[2px]">
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className={`bg-black ${
                  i % 3 === 0 ? "h-full" : "h-10"
                } w-[2px]`}
              />
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-2">
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
            <div key={i} className="w-6 h-6 bg-gray-50 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessCard;
