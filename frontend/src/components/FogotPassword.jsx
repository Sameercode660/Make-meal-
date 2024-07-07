import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

function FogotPassword() {
  const [otpVerified, setOtpVerified] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [otpError, setOtpError] = useState(false)
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigation = useNavigate()

  const emailSchema = z.string().email();

  const numericStringSchema = z.string().refine((val) => /^\d+$/.test(val), {
    message: "Input should contain only digits",
  });

  async function handleVerifyEmail() {
    try {


      setEmailError(false)

      if (!email) {
        setEmailError(true);
        return;
      }

    //   checking email using zod 
    const checkEamil = emailSchema.safeParse(email)

    if(!checkEamil.success) {
        setEmailError(true)
        return;
    }

    const data = {
        email
    }

    const response = await axios.post('http://localhost:8080/user/verify-email', data)

    console.log(response)
    localStorage.setItem('_id', response.data.response._id)

    setOtpVerified(true)

    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  async function handleVerifyOtp() {
    try {
        
        setOtpError(false)

        if(!otp) {
            setOtpError(true)
            return
        }

        const checkOtpFormat = numericStringSchema.safeParse(otp)

        if(!checkOtpFormat.success) {
          setOtpError(true)
          return
        }

        const data = {
            _id: localStorage.getItem("_id"),
            otp
        }
        console.log(localStorage.getItem("_id"))

        const response = await axios.post('http://localhost:8080/user/verify-forgot-otp', data)

        navigation('/new-password')
    } catch (error) {
        console.log(error)
        if(error.response) {
            alert(error.response.data.message)
        }
    }

  }
  return (
    <section>
      <div class="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div class="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 class="text-center text-2xl font-bold leading-tight text-black">
            Verify your Email
          </h2>
          <form action="#" method="POST" class="mt-8">
            <div class="space-y-5">
              <div>
                <label for="" class="text-base font-medium text-gray-900">
                  {" "}
                  Email address{" "}
                </label>
                <div class="mt-2">
                  <input
                    class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    autoComplete="on"
                  />
                </div>
              </div>
              {otpVerified ? (
                <div>
                  <div class="flex items-center justify-between">
                    <label for="" class="text-base font-medium text-gray-900">
                      {" "}
                      OTP{" "}
                    </label>
                  </div>
                  <div class="mt-2">
                    <input
                      class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="OTP(One Time Password"
                      onChange={(e) => {
                        setOtp(e.target.value)
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              <div>
                {otpVerified ? (
                  <button
                    type="button"
                    class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={handleVerifyOtp}
                  >
                    Verify OTP{" "}
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
                      class="ml-2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={handleVerifyEmail}
                  >
                    Verify Email{" "}
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
                      class="ml-2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default FogotPassword;
