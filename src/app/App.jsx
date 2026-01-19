import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Authentication
import AuthFlip from "../authentication/features/AuthFlip";

// Application Success
import ApplicationSuccessPage from './pages/ApplicationSuccessPage';

// Job Components
import JobDetailPage from "../candidate/jobs/JobDetailPage";
import JobsListingPage from "../candidate/jobs/JobsListingPage";

// Profile & Subscription
import ShortUserProfileCard from "../candidate/profile/ShortUserProfileCard";
import SubscriptionCard from "../candidate/subscription/SubscriptionCard";

// Application & Payment
import ApplyFormPage from "../modules/apply/pages/ApplyFormPage";

// Error Pages
import UnauthorizedAccess from "../pages/error/unauthorizedAccess";
import ServerError from "../pages/error/serverError";
import PageNotFound from "../pages/error/pageNotFound";

// Layout
import Footer from "../shared/components/layout/Footer";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            {/* Home - Redirect to Jobs Listing */}
            <Route path="/" element={<Navigate to="/jobs" replace />} />
            
            {/* Job Routes */}
            <Route path="/jobs" element={<JobsListingPage />} />
            <Route path="/jobs/:slug" element={<JobDetailPage />} />
            
            {/* Application Form */}
            <Route path="/apply/:jobId" element={<ApplyFormPage />} />
            
            {/* ✅ FIXED: Application Success Route */}
            <Route path="/payment/success" element={<ApplicationSuccessPage />} />
            
            {/* Payment Error Route */}
            <Route 
              path="/payment/error" 
              element={
                <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
                  <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md w-full">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      Payment Failed
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Something went wrong with your payment. Please try again.
                    </p>
                    <a
                      href="/jobs"
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all"
                    >
                      Back to Jobs
                    </a>
                  </div>
                </div>
              } 
            />
            
            {/* Authentication */}
            <Route path="/auth" element={<AuthFlip />} />
            
            {/* Profile */}
            <Route path="/profile" element={<ShortUserProfileCard />} />
            
            {/* Subscription */}
            <Route 
              path="/subscription" 
              element={
                <SubscriptionCard
                  title="Corporate Plan"
                  subtitle="Recruitment solutions for companies"
                  price="49,999"
                  duration="annually"
                  features={[
                    "Unlimited job postings",
                    "Candidate screening",
                    "Dedicated account manager",
                    "Priority listings",
                  ]}
                  cta1="Buy"
                  cta2="Contact"
                  featured="Most Popular"
                  theme={true}
                />
              } 
            />
            
            {/* Error Pages */}
            <Route path="/401" element={<UnauthorizedAccess />} />
            <Route path="/500" element={<ServerError />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>

        {/* Footer (visible on all pages) */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
