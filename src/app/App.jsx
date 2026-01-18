import AuthFlip from "../authentication/features/AuthFlip";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Login from "../authentication/features/login";
// // import SignUp from "../authentication/features/signUp";

import JobCard from "../candidate/jobs/JobCard";
import ShortUserProfileCard from "../candidate/profile/ShortUserProfileCard";
import SubscriptionCard from "../candidate/subscription/SubscriptionCard";

import UnauthorizedAccess from "../pages/error/unauthorizedAccess";
import ServerError from "../pages/error/serverError";
import PageNotFound from "../pages/error/pageNotFound";

import Footer from "../shared/components/layout/Footer";
import JobDetailPage from "../candidate/jobs/JobDetailPage";
import ApplyFormPage from "../modules/apply/pages/ApplyFormPage";
import PaymentSuccessCard from "../modules/payment/components/PaymentSuccessCard";
// import AppRouter from "./routes";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Auth Route */}
//         <Route path="/" element={<AuthFlip />} />

//         {/* Error Pages */}
//         <Route path="/401" element={<UnauthorizedAccess />} />
//         <Route path="/500" element={<ServerError />} />

//         {/* 404 Page */}
//         <Route path="*" element={<PageNotFound />} />
//       </Routes>

//       {/* Footer (visible on all pages) */}
//       <Footer />
//     </Router>
//   );
// };

// export default App;

const App = () => {
  return (
    <div className="w-full h-screen  gap-5">
      {/* <SubscriptionCard
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
        theme={false}
      /> */}

      {/* <JobCard
        companyName={"Amazon"}
        jobTitle={"Devops Engineer"}
        jobType={"Intern"}
        uploadDate={"4 days ago"}
        Experience={"0 - 1 Yrs"}
        salary={"25K PM"}
        location={"Hyderabad"}
        techStack={["AWS", "Docker", "Jira", "Kubernetes"]}
      />

      <ShortUserProfileCard />


      <Footer /> */}
      {/* <JobDetailPage />
      <Footer /> */}
      {/* <ApplyFormPage />  */}
      <PaymentSuccessCard />
    </div>
  );
};

export default App;
