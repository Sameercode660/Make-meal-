import React, { useState } from "react";
import useAuthentication from "../contexts/Authentication.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { z } from 'zod'

function RegisterInfo() {

  // gathering information related to userfrom localstorage 
  const email = localStorage.getItem("email");
  const fullName = localStorage.getItem("name");
  const { setLogin } = useAuthentication();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  // defining schema for password and mobile number input using zod 
  const mobileSchema = z.string().min(10).max(15)
  const passwordSchema = z.string().min(8).max(20)
  
  // state handling the state of error if any invalid input is entered
  const [mobileError, setMobileError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  async function handleLoginWithGoogle() {
    try {
      if (!email || !fullName || !mobile || !password) {
        return;
      }

      setMobileError(false)
      setPasswordError(false)


      const checkMobile = mobileSchema.safeParse(mobile)
      const checkPassword = passwordSchema.safeParse(password)

      if(!checkPassword.success) {
        setPasswordError(true)
        return;
      } else if(!checkMobile.success) {
        setMobileError(true)
        return;
      }

      const data = {
        email,
        fullName,
        mobile,
        password,
      };

      const response = await axios.post(
        "http://localhost:8080/user/login-with-google",
        data
      );

      console.log(response.data);
      console.log(data)
      setLogin(true);
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("_id", response.data.response._id)

      navigation("/home");
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <section>
      <div class="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div class="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 class="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>

          <form action="#" method="POST" class="mt-8">
            <div class="space-y-5">
              <div>
                <label
                  for=""
                  class="flex justify-start text-base font-medium text-gray-900"
                >
                  {" "}
                  Mobile{" "}
                </label>
                <div class="mt-2">
                  <input
                    class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="number"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value)
                    }}
                  />
                </div>
                <div>
                  {
                    mobileError ? (<span className="text-[12px] text-red-500">Invalid mobile number</span>):(<span></span>)
                  }
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between">
                  <label for="" class="text-base font-medium text-gray-900">
                    {" "}
                    Password{" "}
                  </label>
                </div>
                <div class="mt-2">
                  <input
                    class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                  />
                </div>
                <div>
                  {
                    passwordError ? (<span className="text-[12px] text-red-500">Password must be between 8 to 20 character</span>):(<span></span>)
                  }
                </div>
              </div>
              <div>
                <button
                  type="button"
                  class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  onClick={handleLoginWithGoogle}
                >
                  Login{" "}
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default RegisterInfo;
