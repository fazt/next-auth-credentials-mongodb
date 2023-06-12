"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Signup() {
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const signupResponse = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullname: formData.get("fullname"),
      });
      console.log(signupResponse);
      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) return router.push("/dashboard/profile");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
      <h1 className="text-3xl font-bold my-2">Signup</h1>
      <input
        type="text"
        placeholder="Fullname"
        className="bg-zinc-800 px-4 py-2 block mb-2"
        name="fullname"
      />
      <input
        type="email"
        placeholder="Email"
        className="bg-zinc-800 px-4 py-2 block mb-2"
        name="email"
      />
      <input
        type="password"
        placeholder="Password"
        className="bg-zinc-800 px-4 py-2 block mb-2"
        name="password"
      />
      <button>Signup</button>
    </form>
  );
}

export default Signup;
