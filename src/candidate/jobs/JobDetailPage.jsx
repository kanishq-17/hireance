import { useNavigate, useParams } from 'react-router-dom';
import CompanyHeader from "./CompanyHeader";
import CompanyJobs from "./CompanyJobs";
import CompanyOverview from "./CompanyOverview";
import JobDescription from "./JobDescription";
import JobHeader from "./JobHeader";
import JobHighlights from "./JobHighlights";
import JobSkills from "./JobSkills";
import StickyJobHeader from "./StickyJobHeader";

const JobDetailPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const handleApplyClick = () => {
    navigate(`/apply/${jobId || '1'}`);
  };

  return (
    <section className="w-full bg-neutral-50 px-20 py-8">
      <StickyJobHeader
        companyName="Microsoft"
        position="Associate Project Manager"
        location="Los Angeles, USA"
        onApply={handleApplyClick}
      />
      {/* Company Header */}
      <CompanyHeader
        logo={"/microsoft.svg"}
        banner={""}
        position={"Associate Project Manager"}
        companyName={"Microsoft Inc."}
        location={"Los Angeles, USA"}
        uploadDate={"2026-01-16T14:35:23.420Z"}
        onApply={handleApplyClick}
      />

      <div className="flex gap-5 mt-8">
        {/* left section */}
        <div className="w-2/3 rounded-2xl bg-white py-8 px-14 shadow-sm">
          {/* //? job description */}
          <JobDescription
            para={
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo tenetur quia aliquam delectus voluptates hic mollitia sapiente eum veniam! Vero ipsa facere, earum repellat deleniti, incidunt labore ratione, iure rerum dolorem nulla aut quos? Optio aut non sunt, nulla ratione doloribus expedita quasi ea. Libero saepe exercitationem officiis impedit eius. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci assumenda, beatae minus ullam earum dignissimos nostrum cumque non ratione rerum distinctio ipsa laborum exercitationem vero eveniet necessitatibus repellat, quia fuga?"
            }
          />

          {/* //? job highlights */}
          <JobHighlights
            keyPoints={[
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis",
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis",
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis",
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis",
            ]}
          />

          {/* //? Job Skills */}
          <JobSkills
            skills={[
              "Business",
              "Marketing",
              "Project Manager",
              "Development",
              "Human Resource",
            ]}
          />
        </div>
        {/* right section */}
        <aside className="w-1/3 rounded-2xl p-8 bg-white shadow-sm">
          {/* //? Job Header */}
          <JobHeader
            salary={"$140,500"}
            industry={"Software"}
            employmentType={"Full-time"}
            department={"Information Technology"}
            email={"jobs@microsoft.com"}
          />
        </aside>
      </div>

      <div className="flex gap-5 mt-8">
        {/* left section */}
        <div className="w-2/3 rounded-2xl bg-white py-8 px-14 shadow-sm">
          {/* //? Company Overview */}
          <CompanyOverview
            logo={"/microsoft.svg"}
            companyName={"Microsoft"}
            followers={"21,43,522"}
            about={
              " All qualified applicants will receive consideration for employment without regard to age, ancestry, color, family or medical leave, gender identity or expression, genetic information, marital status, medical condition, national origin, physical or mental disability, political affiliation, protected veteran status, race, religion."
            }
          />
        </div>
        {/* right section */}
        <aside className="w-1/3 rounded-2xl p-8 bg-white shadow-sm">
          {/* //? Company Jobs */}
          <CompanyJobs
            totalJobs={96}
            jobs={[
              {
                id: 0,
                position: "Crisis Intervention Specialist",
                companyName: "Microsoft Inc.",
                location: "New York",
              },
              {
                id: 1,
                position: "Virtual Scheduler",
                companyName: "Microsoft Inc.",
                location: "London",
              },
              {
                id: 2,
                position: "Patient Care Advocate",
                companyName: "Microsoft Inc.",
                location: "Washington",
              },
              {
                id: 3,
                position: "Medical Assistant Instructor",
                companyName: "Microsoft Inc.",
                location: "Atlanta",
              },
              {
                id: 4,
                position: "Consultant Manager",
                companyName: "Microsoft Inc.",
                location: "California",
              },
            ]}
          />
        </aside>
      </div>
    </section>
  );
};

export default JobDetailPage;
