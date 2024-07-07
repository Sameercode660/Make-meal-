import React, { useState } from "react";

function NewPassword() {


  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [passwordMatchError, setPasswordMatchError] = useState(false)
  const [emptyInputError, setEmptyInputError] = useState(false)

  async function handleNewPasswordCreation() {
    try {
        
    } catch (error) {
        console.log(error)
        if(error.response) {
            alert(error.response.message)
        }
    }
  }
  return (
    <section>
      <div class="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div class="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 class="text-center text-2xl font-bold leading-tight text-black">
            Create New Password
          </h2>
          <form action="#" method="POST" class="mt-8">
            <div class="space-y-5">
              <div>
                <label for="" class="flex justify-start text-base font-medium text-gray-900">
                  {" "}
                  Password{" "}
                </label>
                <div class="mt-2">
                  <input
                    class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between">
                  <label for="" class="text-base font-medium text-gray-900">
                    {" "}
                    Confirm Password{" "}
                  </label>
                </div>
                <div class="mt-2">
                  <input
                    class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Re-enter Password"
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Password{" "}
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

export default NewPassword;
