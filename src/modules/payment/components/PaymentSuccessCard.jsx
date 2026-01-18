const PaymentSuccessCard = () => {
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
            Your ticket has been issued successfully
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
            <div>
              <p className="text-gray-400">TICKET ID</p>
              <p className="font-medium text-gray-900">0120034399434</p>
            </div>

            <div className="text-right">
              <p className="text-gray-400">Amount</p>
              <p className="font-medium text-gray-900">$35.00</p>
            </div>
          </div>

          <div className="text-sm">
            <p className="text-gray-400">DATE & TIME</p>
            <p className="font-medium text-gray-900">19 Jun 2025 • 10:15</p>
          </div>

          {/* Payment Card */}
          <div className="mt-4 flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
            <div className="flex gap-1">
              <span className="w-4 h-4 bg-red-500 rounded-full"></span>
              <span className="w-4 h-4 bg-orange-400 rounded-full -ml-2"></span>
            </div>

            <div className="text-sm">
              <p className="font-medium text-gray-900">Liana Tudakova</p>
              <p className="text-gray-500">•••• 8237</p>
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
            <span>2 8937261</span>
            <span>273610</span>
          </div>
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
