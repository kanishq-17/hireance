import { useForm } from "react-hook-form";
import Button from "../../shared/components/common/Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

/* ---------------- LEFT SIDE ---------------- */

export const SignUpLeft = () => {
  return (
    <div
      className="w-full h-full rounded-3xl relative overflow-hidden
  bg-[url(/bg-img.png)] bg-cover bg-center"
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* content */}
      <div className="relative z-10 h-full flex items-end justify-center pb-12 px-8 text-white">
        <div
          className="w-full max-w-md rounded-2xl
      
      p-6 text-center"
        >
          <p className="text-xs tracking-widest uppercase text-neutral-300">
            Hireance
          </p>

          <h2 className="mt-3 text-2xl font-semibold">Get started with us</h2>

          <p className="mt-2 text-sm text-neutral-300">
            Complete these simple steps to create your account and begin your
            journey.
          </p>

          {/* steps */}
          <div className="mt-6 space-y-3 text-left">
            <Step active text="Create your account" />
            <Step text="Set up account details" />
            <Step text="Complete your profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- RIGHT SIDE ---------------- */

export const SignUpRight = ({ onSwitch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Signup data:", data);
  };

  return (
    <div
      className="w-full h-full text-white rounded-3xl
      bg-white/10 backdrop-blur-xl
      flex flex-col justify-center px-10"
    >
      <h2 className="mt-2 font-medium text-2xl text-center">
        Sign Up Account
      </h2>

      <p className="text-sm mt-2 text-neutral-300 text-center">
        Enter your personal data to create your account.
      </p>

      {/* social login */}
      <div className="mt-10  flex gap-3">
        <div
          className="flex items-center justify-center w-full gap-3 p-3 
          rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition"
        >
          <FcGoogle />
          <p className="text-sm">Google</p>
        </div>

        <div
          className="flex items-center justify-center w-full gap-3 p-3 
          rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition"
        >
          <FaGithub />
          <p className="text-sm">Github</p>
        </div>
      </div>

      {/* divider */}
      <div className="flex items-center gap-3 my-5 text-neutral-600">
        <hr className="w-full border-white/20" />
        <span className="text-xs">or</span>
        <hr className="w-full border-white/20" />
      </div>

      {/* signup form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col space-y-5">
          {/* names */}
          <div className="flex gap-4">
            <div className="w-full">
              <p className="text-left text-sm">First Name</p>
              <input
                type="text"
                placeholder="eg. John"
                className={`rounded-xl p-3 text-sm bg-white/5 outline-none 
                border w-full mt-2
                ${errors.firstName ? "border-red-500" : "border-white/20"}`}
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <p className="text-left text-sm">Last Name</p>
              <input
                type="text"
                placeholder="eg. Francisco"
                className={`rounded-xl p-3 text-sm bg-white/5 outline-none 
                border w-full mt-2
                ${errors.lastName ? "border-red-500" : "border-white/20"}`}
                {...register("lastName", {
                  required: "Last name is required",
                })}
              />
              {errors.lastName && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* email */}
          <div>
            <p className="text-left text-sm">Email</p>
            <input
              type="email"
              placeholder="eg. john@gmail.com"
              className={`rounded-xl p-3 text-sm bg-white/5 outline-none 
              border w-full mt-2
              ${errors.email ? "border-red-500" : "border-white/20"}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* password */}
          <div>
            <p className="text-left text-sm">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              className={`rounded-xl p-3 text-sm bg-white/5 outline-none 
              border w-full mt-2
              ${errors.password ? "border-red-500" : "border-white/20"}`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
              })}
            />
            {errors.password ? (
              <p className="text-xs text-red-400 mt-1">
                {errors.password.message}
              </p>
            ) : (
              <p className="text-xs text-neutral-400 mt-1">
                Must be at least 8 characters
              </p>
            )}
          </div>

          {/* submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="p-3 text-sm bg-white text-black rounded-xl 
            font-medium hover:bg-neutral-200 transition"
          >
            {isSubmitting ? "Creating..." : "Sign up"}
          </button>

          {/* switch to login */}
          <p className="text-neutral-400 text-xs text-center">
            Already have an account?{" "}
            <span
              onClick={onSwitch}
              className="font-medium text-white cursor-pointer hover:underline"
            >
              Log in
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

/* ---------------- HELPER ---------------- */

const Step = ({ text, active }) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm
    border transition
    ${
      active
        ? "bg-white text-black border-white"
        : "bg-white/5 text-white border-white/20"
    }`}
  >
    <span
      className={`h-2 w-2 rounded-full
      ${active ? "bg-black" : "bg-white/40"}`}
    />
    <span>{text}</span>
  </div>
);

/* ---------------- EXPORT ---------------- */

const SignUp = {
  Left: SignUpLeft,
  Right: SignUpRight,
};

export default SignUp;
