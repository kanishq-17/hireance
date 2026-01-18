import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Authentication
import AuthFlip from "../authentication/features/AuthFlip";

// Job Components
import JobCard from "../candidate/jobs/JobCard";
import JobDetailPage from "../candidate/jobs/JobDetailPage";

// Profile & Subscription
import ShortUserProfileCard from "../candidate/profile/ShortUserProfileCard";
import SubscriptionCard from "../candidate/subscription/SubscriptionCard";

// Application & Payment
import ApplyFormPage from "../modules/apply/pages/ApplyFormPage";
import PaymentSuccessCard from "../modules/payment/components/PaymentSuccessCard";

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
        <div className="flex-grow">
          <Routes>
            {/* Home - Job Detail Page */}
            <Route path="/" element={<JobDetailPage />} />
            
            {/* Job Routes */}
            <Route path="/jobs" element={<JobDetailPage />} />
            <Route path="/jobs/:jobId" element={<JobDetailPage />} />
            
            {/* Application Form Routes */}
            <Route path="/apply" element={<ApplyFormPage />} />
            <Route path="/apply/:jobId" element={<ApplyFormPage />} />
            
            {/* Payment Routes */}
            <Route path="/payment/success" element={<PaymentSuccessCard />} />
            
            {/* Authentication */}
            <Route path="/auth" element={<AuthFlip />} />
            
            {/* Profile & Subscription */}
            <Route path="/profile" element={<ShortUserProfileCard />} />
            <Route path="/subscription" element={
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
            } />
            
            {/* Error Pages */}
            <Route path="/401" element={<UnauthorizedAccess />} />
            <Route path="/500" element={<ServerError />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>

        {/* Footer (visible on all pages) */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
