"use client";

import myFetch from "@/components/utils/myFetch";
import { baseUrl } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import React, { useState } from "react";

const Form = ({ type }: { type: string }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate inputs
    if (type !== "signin" && !name) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
      return;
    }

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }

    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }

    const dto: any = { email, password };
    if (type === "signup") {
      dto.name = name;
    }

    const url =
      type === "signin"
        ? `${baseUrl}/api/auth/signin`
        : `${baseUrl}/api/auth/signup`;

    const { data, error }: any = await myFetch(url, {
      method: "POST",
      body: JSON.stringify(dto),
    });

    if (data) {
      console.log(data);
      login(data); // Log in the user and redirect
    } else if (error) {
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Something went wrong, please try again.",
      }));
    }
  };

  return (
    <div className="grid md:grid-cols-4 items-center rounded-xl overflow-hidden">
      <form
        className="md:col-span-2 w-full py-6 px-6 sm:px-16 mt-10"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <h3 className="text-2xl font-bold">
            {type === "signin"
              ? "Sign In to Your Account"
              : "Create an Account"}
          </h3>
        </div>

        <div className="space-y-6">
          {type !== "signin" && (
            <div>
              <label className="text-sm mb-2 block">Name</label>
              <div className="relative flex items-center">
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`text-gray-900 bg-white border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } w-full text-sm px-4 py-2.5 rounded-md outline-none focus:border-blue-500`}
                  placeholder="Enter name"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
          )}

          <div>
            <label className="text-sm mb-2 block">Email Id</label>
            <div className="relative flex items-center">
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`text-gray-900 bg-white border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } w-full text-sm px-4 py-2.5 rounded-md outline-none focus:border-blue-500`}
                placeholder="Enter email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm mb-2 block">Password</label>
            <div className="relative flex items-center">
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`text-gray-900 bg-white border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } w-full text-sm px-4 py-2.5 rounded-md outline-none focus:border-blue-500`}
                placeholder="Enter password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
        </div>

        {errors.general && (
          <p className="text-red-500 text-sm mt-4">{errors.general}</p>
        )}

        <div className="!mt-12">
          <button
            type="submit"
            className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-[#417bed] hover:bg-[#0056ff] focus:outline-none cursor-pointer"
          >
            {type === "signin" ? "Sign In" : "Create an Account"}
          </button>
        </div>

        <p className="text-sm mt-6 text-center">
          {type === "signin" ? (
            <>
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-600 font-semibold hover:underline ml-1 cursor-pointer"
              >
                Create one here
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-blue-600 font-semibold hover:underline ml-1 cursor-pointer"
              >
                Login here
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Form;
