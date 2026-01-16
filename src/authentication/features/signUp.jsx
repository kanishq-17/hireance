import { useForm } from "react-hook-form";
import Button from "../../shared/components/common/Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

/* ---------------- LEFT SIDE ---------------- */

export const SignUpLeft = () => {
  return (
    <div
      className="w-full h-full rounded-3xl flex items-end justify-center
      bg-[url(/bg-img.png)] bg-cover bg-center opacity-90
      backdrop-blur-xl border border-white/20 text-white"
    >
      <div className="text-center pb-10">
        <p className="text-sm tracking-wide text-neutral-300">Hireance</p>

        <h2 className="mt-2 mb-1 font-medium text-3xl">
          Get Started with Us
        </h2>

        <p className="text-sm w-[80%] m-auto text-neutral-300">
          Complete these easy steps to register your account.
        </p>

        <div className="flex flex-col items-center justify-center mt-6 gap-3 font-medium">
          <Button
            extraClasses="text-sm p-4 w-full text-left pl-5 bg-white text-black rounded-xl"
            text="1. Sign up your account"
          />
          <Button
            extraClasses="text-sm p-4 w-full text-left pl-5 bg-white/10 text-white rounded-xl"
            text="2. Set up your account"
          />
          <Button
            extraClasses="text-sm p-4 w-full text-left pl-5 bg-white/10 text-white rounded-xl"
            text="3. Set up your profile"
          />
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
      bg-white/10 backdrop-blur-xl border border-white/20
      flex flex-col justify-center"
    >
      <h2 className="mt-10 font-medium text-2xl text-center">
        Sign Up Account
      </h2>

      <p className="text-sm mt-2 text-neutral-300 text-center">
        Enter your personal data to create your account.
      </p>

      {/* social login */}
      <div className="mt-10 mx-10 flex gap-3">
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

      {/* signup form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-10 mt-10 flex flex-col space-y-5">
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

/* ---------------- EXPORT ---------------- */

const SignUp = {
  Left: SignUpLeft,
  Right: SignUpRight,
};

export default SignUp;
