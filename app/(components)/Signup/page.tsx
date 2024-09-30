"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [button, setButton] = useState<string>("Sign Up");

  const router = useRouter();

  // Update event type to React.FormEvent<HTMLFormElement>
  async function SignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setButton("Creating account...");
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setButton("Sign Up");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_API}/api/signup`,
        {
          name,
          email,
          password,
        },
      );

      if (response.status === 200) {
        const token: string = response.data.token;
        localStorage.setItem("token", token);
        alert("Account Created Successfully");
        router.push("/Dashboard/TaskLists");
        setButton("Sign Up");
      }
    } catch (error) {
      console.error(error);
      setButton("Sign Up");
      alert("Error while Creating account");
    }
  }

  return (
    <main className="bg-black h-screen flex flex-col items-center justify-center">
      <div>
        <h1 className="mb-3 text-white text-4xl font-bold">SIGN UP</h1>
      </div>

      <form
        onSubmit={SignUp}
        className="p-6 rounded-md md:border-2 border-white md:p-3 flex items-center flex-col justify-center"
      >
        <Input
          className="rounded-md border-2 border-white p-5 text-xl  w-full  h-14 md:h-12  my-5"
          type="text"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          className="rounded-md border-2 border-white  p-5 text-xl  w-full  h-14 md:h-12  my-5"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          className="rounded-md border-2 border-white  p-5 text-xl  w-full  h-14 md:h-12  my-5"
          type="password"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          className="rounded-md border-2 border-white  p-5 text-xl  w-full  h-14 md:h-12  my-5"
          type="password"
          placeholder="Confirm Password..."
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button className="bg-slate-400 hover:bg-slate-600 text-xl w-3/4 md:w-4/5 p-2 h-12 md:h-13 mx-2 my-5">
          {button}
        </Button>
      </form>

      <div className="mt-3 flex justify-center items-center">
        <div>
          <p className="text-white">Registered User?</p>
        </div>
        <div className="ml-2">
          <Link href="/">
            <p className="text-white cursor-pointer text-xl underline">
              Sign In
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Page;
