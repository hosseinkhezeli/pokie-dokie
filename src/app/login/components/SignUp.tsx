"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import TextField from "@/components/ui/text-field/TextField";
import Button from "@/components/ui/button/Button";

interface SignUpFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>();

  const password = watch("password", "");

  const onSubmit = (data: SignUpFormInputs) => {
    console.log("Sign Up data:", data);
    // Add your sign up logic here
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Full Name"
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Minimum 2 characters" },
            })}
            error={errors.name?.message}
            autoComplete="name"
            aria-invalid={!!errors.name}
          />

          <TextField
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            error={errors.email?.message}
            autoComplete="email"
            aria-invalid={!!errors.email}
          />

          <TextField
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            error={errors.password?.message}
            autoComplete="new-password"
            aria-invalid={!!errors.password}
          />

          <TextField
            label="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            error={errors.confirmPassword?.message}
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;