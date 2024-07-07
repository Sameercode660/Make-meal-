import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import useAuthentication from "../contexts/Authentication.context.jsx";
import GoogleAuth from './GoogleAuth'

function SignUp() {
  // form input states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  // schema of form data created by 'zod library'
  const fullNameSchema = z.string().refine((value) => {
    return isNaN(Number(value));
  });
  const emailSchema = z.string().email();
  const mobileSchema = z.string().min(10);
  const passwordSchema = z.string().min(8);

  // state for showing the error if inputs does not pass the zod verification
  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // using navigation hook from react-router-dom
  const navigation = useNavigate();

  const {userData} = useAuthentication()

  async function handleFormData() {
    try {
      const checkFullName = fullNameSchema.safeParse(fullName);
      const checkEmail = emailSchema.safeParse(email);
      const checkMobile = mobileSchema.safeParse(mobile);
      const checkPassword = passwordSchema.safeParse(password);

      Array.from([
        setFullNameError,
        setEmailError,
        setMobileError,
        setPasswordError,
      ]).forEach((ErrorFunction) => {
        ErrorFunction(false);
      });

      if (!checkFullName.success) {
        setFullNameError(true);
        return;
      } else if (!checkEmail.success) {
        setEmailError(true);
        return;
      } else if (!checkMobile.success) {
        setMobileError(true);
        return;
      } else if (!checkPassword.success) {
        setPasswordError(true);
        return;
      }

      const data = {
        fullName,
        email,
        mobile,
        password,
      };

      // making an api call for signup the user

      const response = await axios.post(
        "http://localhost:8080/user/signup",
        data
      );

      localStorage.setItem("_id", response.data.response._id)

      navigation("/otp");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign Up
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Have an account?
              <Link
                to={"/login"}
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                LogIn
              </Link>
            </p>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                {/* fullname input section  */}
                <div>
                  <label
                    for=""
                    className=" flex justify-start font-medium text-gray-900"
                  >
                    FullName
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="FullName"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                      }}
                      autoComplete="on"
                    />
                  </div>
                  {/* fullName inputs data error  */}
                  <div>
                    {fullNameError ? (
                      <span className="text-[13px] text-red-600">
                        Name should be valid
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                {/* email input section  */}
                <div>
                  <label
                    for=""
                    className=" flex justify-start font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      autoComplete="on"
                    />
                  </div>
                  {/* email inputs data error  */}
                  <div>
                    {emailError ? (
                      <span className="text-[13px] text-red-600">
                        Email Must be valid
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                {/* mobile number input section  */}

                <div>
                  <label
                    for=""
                    className=" flex justify-start font-medium text-gray-900"
                  >
                    Mobile Number
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="number"
                      placeholder="Mobile Number"
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value);
                      }}
                      autoComplete="on"
                    />
                  </div>
                  {/* mobile inputs data error  */}
                  <div>
                    {mobileError ? (
                      <span className="text-[13px] text-red-600">
                        mobile number must be of 10 digits
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  {/* password input section  */}

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        for=""
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Password{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        autoComplete="on"
                      />
                    </div>
                    {/* password inputs data error  */}
                    <div>
                      {passwordError ? (
                        <span className="text-[13px] text-red-600">
                          Password must be of 8 digits
                        </span>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      onClick={handleFormData}
                    >
                      Get started{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="ml-2"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                    <GoogleAuth></GoogleAuth>
              </button>
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default React.memo(SignUp);
