import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, User, Mail, Phone, FileText, CreditCard, Calendar, Building, Download, Loader } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ApplicationSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const receiptRef = useRef(null);
  
  const [applicationData, setApplicationData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    applicationNumber: '',
    submittedDate: '',
    orderId: '',
    paymentId: '',
    amount: '',
    paymentStatus: '',
    paymentMethod: 'Not Available',
    transactionDate: ''
  });

  const [loading, setLoading] = useState(true);
  const [downloadingReceipt, setDownloadingReceipt] = useState(false);

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      console.log('=== APPLICATION SUCCESS PAGE LOADED ===');
      console.log('Current URL:', window.location.href);
      console.log('Search Params:', searchParams.toString());

      const orderId = searchParams.get('order_id');
      const paymentId = searchParams.get('payment_id');
      const applicationId = searchParams.get('application_id');
      const amount = searchParams.get('amount');
      const status = searchParams.get('status');
      const date = searchParams.get('date');

      console.log('Application Success - Received params:', { 
        orderId, paymentId, applicationId, amount, status, date 
      });

      if (!applicationId) {
        console.error('No application ID found, redirecting to home');
        navigate('/');
        return;
      }

      try {
        let applicantInfo = {
          fullName: 'N/A',
          email: 'N/A',
          phone: 'N/A',
          position: 'N/A',
          department: 'N/A'
        };

        try {
          const appResponse = await fetch(`http://localhost:5000/api/applications/${applicationId}`);
          const appResult = await appResponse.json();
          
          if (appResult.success && appResult.data) {
            const app = appResult.data;
            applicantInfo = {
              fullName: app.full_name || 'N/A',
              email: app.email_id || 'N/A',
              phone: app.mobile_no || 'N/A',
              position: app.position_applied_for || 'N/A',
              department: app.department_project || 'N/A'
            };
            console.log('[SUCCESS] Fetched application details:', applicantInfo);
          }
        } catch (error) {
          console.error('[WARNING] Failed to fetch application details:', error);
        }

        let paymentMethod = 'Not Available';
        
        if (orderId) {
          try {
            const paymentResponse = await fetch(`http://localhost:5000/api/payments/details/${orderId}`);
            const paymentResult = await paymentResponse.json();
            
            if (paymentResult.success && paymentResult.payment) {
              paymentMethod = paymentResult.payment.payment_method || 'Not Available';
              console.log('[SUCCESS] Fetched payment method:', paymentMethod);
            }
          } catch (error) {
            console.error('[WARNING] Failed to fetch payment method:', error);
          }
        }

        let formattedSubmissionDate = 'N/A';
        let formattedTransactionDate = 'N/A';
        
        if (date) {
          const dateObj = new Date(date);
          const formatted = dateObj.toLocaleString('en-IN', { 
            timeZone: 'Asia/Kolkata',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
          formattedSubmissionDate = formatted;
          formattedTransactionDate = formatted;
        }

        setApplicationData({
          fullName: applicantInfo.fullName,
          email: applicantInfo.email,
          phone: applicantInfo.phone,
          position: applicantInfo.position,
          department: applicantInfo.department,
          applicationNumber: applicationId,
          submittedDate: formattedSubmissionDate,
          orderId: orderId || 'N/A',
          paymentId: paymentId || 'N/A',
          amount: amount || '0',
          paymentStatus: status || 'UNKNOWN',
          paymentMethod: paymentMethod,
          transactionDate: formattedTransactionDate
        });

        console.log('[SUCCESS] Application data set');

      } catch (error) {
        console.error('Error processing application details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetails();
  }, [searchParams, navigate]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleDownloadReceipt = async () => {
    setDownloadingReceipt(true);
    try {
      if (!receiptRef.current) {
        console.error('Receipt reference not found');
        setDownloadingReceipt(false);
        return;
      }

      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgData = canvas.toDataURL('image/png');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 20;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - 20;
      }

      const fileName = `Receipt_${applicationData.applicationNumber.slice(0, 8)}_${new Date().getTime()}.pdf`;
      pdf.save(fileName);

      console.log('[SUCCESS] Receipt downloaded:', fileName);
    } catch (error) {
      console.error('[ERROR] Failed to generate receipt:', error);
      alert('Failed to generate receipt. Please try again.');
    } finally {
      setDownloadingReceipt(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium text-lg">Loading application details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Application Submitted Successfully!
          </h1>
          <p className="text-gray-600 text-lg">
            Thank you for applying. We've received your application.
          </p>
        </div>

        <div 
          ref={receiptRef} 
          style={{ 
            position: 'absolute',
            left: '-9999px',
            top: '0',
            backgroundColor: 'white',
            padding: '40px',
            width: '800px',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <img 
              src="/hireance-SVG.svg" 
              alt="Hireance Logo" 
              style={{ height: '50px', marginBottom: '20px' }}
            />
            <h1 style={{ margin: '0', fontSize: '28px', color: '#1f2937', fontWeight: 'bold', borderBottom: '3px solid #3b82f6', paddingBottom: '15px' }}>
              APPLICATION RECEIPT
            </h1>
            <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#666' }}>
              Thank you for your application submission
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px', padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
            <div>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase' }}>
                Application Number
              </p>
              <p style={{ margin: '0', fontSize: '14px', color: '#1f2937', fontWeight: 'bold', wordBreak: 'break-all', fontFamily: 'monospace' }}>
                {applicationData.applicationNumber}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase' }}>
                Date of Submission
              </p>
              <p style={{ margin: '0', fontSize: '14px', color: '#1f2937', fontWeight: '500' }}>
                {applicationData.submittedDate}
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'bold', color: '#1f2937', borderBottom: '2px solid #3b82f6', paddingBottom: '10px' }}>
              APPLICANT DETAILS
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <p style={{ margin: '0 0 5px 0', fontSize: '11px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase' }}>
                  Full Name
                </p>
                <p style={{ margin: '0', fontSize: '14px', color: '#1f2937', fontWeight: '500' }}>
                  {applicationData.fullName}
                </p>
              </div>
              <div>
                <p style={{ margin: '0 0 5px 0', fontSize: '11px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase' }}>
                  Email
                </p>
                <p style={{ margin: '0', fontSize: '13px', color: '#1f2937', fontWeight: '500', wordBreak: 'break-all' }}>
                  {applicationData.email}
                </p>
              </div>
              <div>
                <p style={{ margin: '0 0 5px 0', fontSize: '11px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase' }}>
                  Phone
                </p>
                <p style={{ margin: '0', fontSize: '14px', color: '#1f2937', fontWeight: '500' }}>
                  {applicationData.phone}
                </p>
              </div>
              <div>
                <p style={{ margin: '0 0 5px 0', fontSize: '11px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase' }}>
                  Department
                </p>
                <p style={{ margin: '0', fontSize: '14px', color: '#1f2937', fontWeight: '500' }}>
                  {applicationData.department}
                </p>
              </div>
            </div>
            <div style={{ marginTop: '15px' }}>
              <p style={{ margin: '0 0 5px 0', fontSize: '11px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase' }}>
                Position Applied For
              </p>
              <p style={{ margin: '0', fontSize: '16px', color: '#1f2937', fontWeight: 'bold' }}>
                {applicationData.position}
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'bold', color: '#1f2937', borderBottom: '2px solid #3b82f6', paddingBottom: '10px' }}>
              PAYMENT DETAILS
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div style={{ padding: '15px', backgroundColor: '#dbeafe', borderRadius: '8px', border: '2px solid #3b82f6' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '11px', fontWeight: 'bold', color: '#1e40af', textTransform: 'uppercase' }}>
                  Amount Paid
                </p>
                <p style={{ margin: '0', fontSize: '28px', color: '#1e40af', fontWeight: 'bold' }}>
                  Rs {applicationData.amount}
                </p>
              </div>
              <div style={{ padding: '15px', backgroundColor: '#dcfce7', borderRadius: '8px', border: '2px solid #16a34a' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '11px', fontWeight: 'bold', color: '#166534', textTransform: 'uppercase' }}>
                  Payment Status
                </p>
                <p style={{ margin: '0', fontSize: '24px', color: '#15803d', fontWeight: 'bold' }}>
                  {applicationData.paymentStatus}
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '10px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>
                  Order ID
                </p>
                <p style={{ margin: '0', fontSize: '11px', color: '#1f2937', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {applicationData.orderId}
                </p>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '10px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>
                  Payment ID
                </p>
                <p style={{ margin: '0', fontSize: '11px', color: '#1f2937', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {applicationData.paymentId}
                </p>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '10px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>
                  Payment Method
                </p>
                <p style={{ margin: '0', fontSize: '12px', color: '#1f2937', fontWeight: '500' }}>
                  {applicationData.paymentMethod}
                </p>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '10px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>
                  Transaction Date
                </p>
                <p style={{ margin: '0', fontSize: '12px', color: '#1f2937', fontWeight: '500' }}>
                  {applicationData.transactionDate}
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '2px solid #e5e7eb', textAlign: 'center' }}>
            <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666', fontWeight: '500' }}>
              This is an auto-generated receipt. Please keep it for your records.
            </p>
            <p style={{ margin: '0', fontSize: '11px', color: '#999' }}>
              Generated on {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <User className="w-6 h-6" />
              Applicant Details
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-blue-100 text-sm mb-1">Full Name</p>
                <p className="text-white font-semibold text-lg">{applicationData.fullName}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-blue-100 text-sm mb-1 flex items-center gap-1">
                  <Mail className="w-4 h-4" /> Email
                </p>
                <p className="text-white font-semibold break-all">{applicationData.email}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-blue-100 text-sm mb-1 flex items-center gap-1">
                  <Phone className="w-4 h-4" /> Phone
                </p>
                <p className="text-white font-semibold">{applicationData.phone}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-blue-100 text-sm mb-1 flex items-center gap-1">
                  <Building className="w-4 h-4" /> Department
                </p>
                <p className="text-white font-semibold">{applicationData.department}</p>
              </div>
            </div>

            <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-blue-100 text-sm mb-1 flex items-center gap-1">
                <FileText className="w-4 h-4" /> Position Applied For
              </p>
              <p className="text-white font-bold text-xl">{applicationData.position}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-8 py-6 border-b-2 border-dashed border-purple-300">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-purple-700 text-sm font-medium mb-1">APPLICATION NUMBER</p>
                <p className="font-mono text-2xl font-bold text-purple-900 break-all">
                  {applicationData.applicationNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-purple-700 text-sm font-medium mb-1 flex items-center justify-end gap-1">
                  <Calendar className="w-4 h-4" /> Submitted On
                </p>
                <p className="text-purple-900 font-semibold">{applicationData.submittedDate}</p>
              </div>
            </div>
          </div>

          <div className="px-8 py-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Details
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-700 text-xs uppercase tracking-wide mb-1">Amount Paid</p>
                <p className="text-green-600 text-3xl font-bold">Rs {applicationData.amount}</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700 text-xs uppercase tracking-wide mb-1">Payment Status</p>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  <p className="text-blue-900 text-2xl font-bold">{applicationData.paymentStatus}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-gray-600 text-xs uppercase tracking-wide mb-1">Order ID</p>
                <p className="font-mono text-sm text-gray-900 break-all">{applicationData.orderId}</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <p className="text-blue-600 text-xs uppercase tracking-wide mb-1">Payment ID</p>
                <p className="font-mono text-sm text-gray-900 break-all">{applicationData.paymentId}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                  <p className="text-purple-600 text-xs uppercase tracking-wide mb-1">Payment Method</p>
                  <p className="text-gray-900 font-semibold">{applicationData.paymentMethod}</p>
                </div>

                <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
                  <p className="text-indigo-600 text-xs uppercase tracking-wide mb-1">Transaction Date</p>
                  <p className="text-gray-900 font-semibold">{applicationData.transactionDate}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-t border-yellow-200 px-8 py-4">
            <p className="text-yellow-800 text-sm">
              <strong>Important:</strong> Please save your Application Number for future reference. 
              You will receive a confirmation email at <strong>{applicationData.email}</strong> shortly.
            </p>
          </div>

          <div className="px-8 py-6 bg-gray-50 flex gap-4 flex-wrap">
            <button
              onClick={handleDownloadReceipt}
              disabled={downloadingReceipt}
              className="flex-1 min-w-[200px] bg-white border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {downloadingReceipt ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Download Receipt
                </>
              )}
            </button>
            
            <button
              onClick={handleBackToHome}
              className="flex-1 min-w-[200px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Back to Home
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">What's Next?</h3>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span className="text-gray-700">You will receive a confirmation email with your application details.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span className="text-gray-700">Our HR team will review your application within 3-5 business days.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <span className="text-gray-700">If shortlisted, you'll be contacted for the next steps via email or phone.</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSuccessPage;
