const Footer = () => {
  return (
    <footer className="relative bg-black text-neutral-400 h-screen">
      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-10 pt-14">
        {/* TOP LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-14 text-sm">
          {/* PRODUCTS */}
          <FooterColumn
            title="Products"
            links={["Apps", "Workflows", "Database", "Mobile"]}
          />

          {/* SOLUTIONS */}
          <FooterColumn
            title="Solutions"
            links={["AI apps", "External apps", "Integrations", "Self-hosting"]}
          />

          {/* RESOURCES */}
          <FooterColumn title="Resources" links={["Blog", "Reports"]} />

          {/* DEVELOPERS */}
          <FooterColumn
            title="Developers"
            links={[
              "Documentation",
              "Changelog",
              "Status",
              "Developer Network",
            ]}
          />

          {/* COMPANY */}
          <div className="space-y-5">
            <h4 className="text-xs tracking-widest text-neutral-500 uppercase">
              Company
            </h4>

            <ul className="space-y-3">
              {["About", "Careers", "Partners"].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-white transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA BUTTONS */}
            <div className="space-y-3 pt-2">
              <button
                className="w-full rounded-full bg-white text-black
                text-xs font-medium py-2 hover:bg-neutral-200 transition"
              >
                Start for free
              </button>
              <button
                className="w-full rounded-full border border-white/20
                text-xs font-medium py-2 hover:border-white/40 transition"
              >
                Book a demo
              </button>
            </div>

            {/* LEGAL */}
            <ul className="space-y-2 pt-2 text-xs">
              <li className="hover:text-white cursor-pointer">Terms of Use</li>
              <li className="hover:text-white cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-white cursor-pointer">Security</li>
            </ul>
          </div>
        </div>

        {/* BIG BRAND TEXT */}
        <div className="mt-8 border-t border-white/10 pt-14">
          <h1
            className="text-[120px] md:text-[180px] font-extrabold
            tracking-tight text-white/90 leading-none select-none"
          >
            Hireance
          </h1>

          {/* BOTTOM META */}
          <div
            className="mt-6 flex flex-col md:flex-row 
            justify-between gap-4 text-xs text-neutral-500"
          >
            <p>Address: Ameerpet, Hyderabad, India</p>
            <p>
              Email:{" "}
              <a
                href="mailto:info@hireance.com"
                className="hover:text-white transition"
              >
                info@hireance.com
              </a>
            </p>
            <p>© Hireance 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/* ---------- HELPER ---------- */

const FooterColumn = ({ title, links }) => (
  <div>
    <h4 className="text-xs tracking-widest text-neutral-500 uppercase mb-4">
      {title}
    </h4>
    <ul className="space-y-3">
      {links.map((link, idx) => (
        <li key={idx} className="hover:text-white transition cursor-pointer">
          {link}
        </li>
      ))}
    </ul>
  </div>
);
