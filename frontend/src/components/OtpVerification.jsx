import React, { useState } from "react";
import axios from "axios";
import useAuthentication from "../contexts/Authentication.context.jsx";
import { useNavigate } from "react-router-dom";

function OtpVerification() {
  const [otpInput, setOtpInput] = useState("");
  const navigation = useNavigate();
  const { setLogin} = useAuthentication();
  const [otpInputError, setOtpInputError] = useState(false);

  async function handleOtpVerification() {
    try {
      setOtpInputError(false);

      if (!otpInput) {
        setOtpInputError(true);
        return;
      }

      const data = {
        _id: localStorage.getItem("_id"),
        otp: otpInput
      };

      console.log(data)
      const response = await axios.post(
        "http://localhost:8080/user/verifyOtp",
        data
      );

      console.log(response);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("_id", response.data.response._id)
      
      setLogin(true)

      navigation("/home");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Verify Otp
          </h2>
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label for="" className="text-base font-medium text-gray-900">
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    value={otpInput}
                    onChange={(e) => {
                        setOtpInput(e.target.value)
                    }}
                  />
                </div>
                <div>
                    {
                        otpInputError ? (<span>Please enter valid Otp </span>) : (<span></span>)
                    }
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  onClick={handleOtpVerification}
                >
                  Vefify OTP{" "}
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
          </form>
        </div>
      </div>
    </section>
  );
}

export default React.memo(OtpVerification);
