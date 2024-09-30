"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios ,{AxiosError} from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [btn, setBtn] = useState<string>("Sign In");

  const router = useRouter();

  // Update event type to React.FormEvent<HTMLFormElement>
  async function SignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBtn("Logging in...");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_API}/api/signin`,
        {
          email,
          password,
        },
      );

      if (response.status === 200) {
        const token: string = response.data.token;
        localStorage.setItem("token", token);
        alert("Sign In Successful");
        router.push("/Dashboard/TaskLists");
        setBtn("Sign In");
      }
    } catch (error:unknown) {
      setBtn("Sign In");
      if(error instanceof AxiosError && error.response){
        const errorfrombackend=error.response.data.error || "An unexpected error";
        alert(errorfrombackend);
      }
      else{
        alert("Invalid Email or Password");
      }
      console.error(error);
      
    }
  }

  return (
    <main className="bg-black h-screen flex flex-col items-center justify-center">
      <div>
        <h1 className="mb-4 text-white text-4xl font-bold">SIGN IN</h1>
      </div>

      <form
        onSubmit={SignIn}
        className="md:border-2 border-white md:p-5 flex items-center flex-col justify-center p-5 rounded-md"
      >
        <Input
          className="border-2 p-4 rounded-md border-white  text-xl  w-full h-14 my-5 "
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          className="border-2 border-white rounded-md  p-4 text-xl  w-full h-14 my-5 "
          type="password"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button className="bg-slate-400 hover:bg-slate-600 text-xl w-3/4 md:w-4/5 p-2 h-12 md:h-13 mx-2 my-5">
          {btn}
        </Button>
      </form>

      <div className="mt-4 flex justify-center items-center">
        <div>
          <p className="text-white">New User?</p>
        </div>
        <div className="ml-2">
          <Link href="/Signup">
            <p className="text-white cursor-pointer text-xl underline">
              Sign Up
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Page;
