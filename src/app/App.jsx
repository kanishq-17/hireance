// import AuthFlip from "../authentication/features/AuthFlip";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Login from "../authentication/features/login";
// // import SignUp from "../authentication/features/signUp";

import JobCard from "../candidate/jobs/JobCard";
import SubscriptionCard from "../candidate/subscription/SubscriptionCard";

// import UnauthorizedAccess from "../pages/error/unauthorizedAccess";
// import ServerError from "../pages/error/serverError";
// import PageNotFound from "../pages/error/pageNotFound";

// import Footer from "../shared/components/layout/Footer";

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
<<<<<<< HEAD
    <div className="w-full h-screen flex items-center justify-center gap-5">
      <SubscriptionCard
=======
    <div className="w-full h-screen flex items-center justify-center  gap-5">
      {/* <SubscriptionCard
>>>>>>> 46f9fe49a203b0f04a778c2ad78b4506c10ef3b2
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
<<<<<<< HEAD
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
      />
=======
      /> */}
      <JobCard />
>>>>>>> 46f9fe49a203b0f04a778c2ad78b4506c10ef3b2
    </div>
  );
};

export default App;
