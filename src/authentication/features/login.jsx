import Button from "../../shared/components/common/Button";
import { FaGithub, FaFacebook } from "react-icons/fa6";
import { SiGoogle } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

// const Login = ({onSwitch}) => {
//   return (
//     <section className="w-full h-screen bg-black flex gap-5 p-5">
//       {/* left section */}
//       <div className="w-2/3 rounded-3xl h-full bg-[url(/login.png)] bg-cover bg-center outline outline-neutral-700/80" />

//       {/* right section */}
//       <div
//         className="w-1/3 h-full rounded-3xl
//         bg-white/10 backdrop-blur-xl border border-white/20
//         px-8 text-white flex flex-col justify-center"
//       >
//         <p className="text-sm tracking-wide text-neutral-300">Hireance</p>

//         <h2 className="text-2xl font-semibold mt-2">Welcome back</h2>

//         <p className="text-sm text-neutral-300 mt-2">
//           Log in to access your customized opportunities and track your
//           progress.
//         </p>

//         {/* form */}
//         <div className="mt-8 space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-3 rounded-xl text-sm
//               bg-white/5 border border-white/20 outline-none
//               focus:border-white transition"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-3 rounded-xl text-sm
//               bg-white/5 border border-white/20 outline-none
//               focus:border-white transition"
//           />

//           {/* forgot password */}
//           <p className="text-xs text-right text-neutral-300 cursor-pointer hover:text-white">
//             Forgot password?
//           </p>

//           <Button
//             extraClasses="w-full bg-purple-300 text-slate-900 p-3 rounded-xl font-medium text-center"
//             text="Continue"
//           />
//         </div>

//         {/* divider */}
//         <div className="flex items-center gap-3 my-6 text-neutral-300">
//           <hr className="w-full border-white/20" />
//           <span className="text-xs">or</span>
//           <hr className="w-full border-white/20" />
//         </div>

//         {/* social login */}
//         <div className="flex justify-between gap-3">
//           <SocialIcon icon={<SiGoogle />} />
//           <SocialIcon icon={<FaGithub />} />
//           <SocialIcon icon={<FaXTwitter />} />
//           <SocialIcon icon={<FaFacebook />} />
//         </div>

//         {/* create account */}
//         <p className="text-xs text-center text-neutral-300 mt-8">
//           Don’t have an account?{" "}
//           <span onClick={onSwitch} className="text-white font-medium cursor-pointer hover:underline">
//             Create new account
//           </span>
//         </p>
//       </div>
//     </section>
//   );
// };

export const LoginLeft = () => (
  <div className="w-full h-full rounded-3xl bg-[url(/login.png)] bg-cover bg-center outline outline-neutral-700/80" />
);

export const LoginRight = ({ onSwitch }) => {
  return (
    <div
      className="w-full h-full rounded-3xl 
        bg-white/10 backdrop-blur-xl border border-white/20 
        px-8 text-white flex flex-col justify-center"
    >
      <p className="text-sm tracking-wide text-neutral-300">Hireance</p>

      <h2 className="text-2xl font-semibold mt-2">Welcome back</h2>

      <p className="text-sm text-neutral-300 mt-2">
        Log in to access your customized opportunities and track your progress.
      </p>

      {/* form */}
      <div className="mt-8 space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl text-sm 
              bg-white/5 border border-white/20 outline-none
              focus:border-white transition"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-xl text-sm 
              bg-white/5 border border-white/20 outline-none
              focus:border-white transition"
        />

        {/* forgot password */}
        <p className="text-xs text-right text-neutral-300 cursor-pointer hover:text-white">
          Forgot password?
        </p>

        <Button
          extraClasses="w-full bg-purple-300 text-slate-900 p-3 rounded-xl font-medium text-center"
          text="Continue"
        />
      </div>

      {/* divider */}
      <div className="flex items-center gap-3 my-6 text-neutral-300">
        <hr className="w-full border-white/20" />
        <span className="text-xs">or</span>
        <hr className="w-full border-white/20" />
      </div>

      {/* social login */}
      <div className="flex justify-between gap-3">
        <SocialIcon icon={<SiGoogle />} />
        <SocialIcon icon={<FaGithub />} />
        <SocialIcon icon={<FaXTwitter />} />
        <SocialIcon icon={<FaFacebook />} />
      </div>

      {/* create account */}
      <p className="text-xs text-center text-neutral-300 mt-8">
        Don’t have an account?{" "}
        <span
          onClick={onSwitch}
          className="text-white font-medium cursor-pointer hover:underline"
        >
          Create new account
        </span>
      </p>
    </div>
  );
};

const Login = {
  Left: LoginLeft,
  Right: LoginRight,
};
export default Login;

/* ---------------- helper ---------------- */

const SocialIcon = ({ icon }) => (
  <span
    className="flex items-center justify-center w-full py-3 rounded-xl
      bg-white/5 border border-white/20 cursor-pointer
      hover:bg-white/10 transition"
  >
    {icon}
  </span>
);
