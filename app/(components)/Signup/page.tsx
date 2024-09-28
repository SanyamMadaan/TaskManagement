import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <main className="bg-black h-screen flex flex-col items-center justify-center">
      <div>
        <h1 className="mb-3 text-white text-4xl font-bold">SIGN UP</h1>
      </div>

      <form className="md:border-2 border-white md:p-3 flex items-center flex-col justify-center">
      <Input
          className="border-2 border-white text-slate-400 p-5 text-xl lg:text-slate-100 w-full md:w-4/5 h-14 md:h-12  my-5"
          type="text"
          placeholder="Username"
          required
        ></Input>
        <Input
          className="border-2 border-white text-slate-400 p-5 text-xl lg:text-slate-100 w-full md:w-4/5 h-14 md:h-12  my-5"
          type="email"
          placeholder="Enter your email"
          required
        ></Input>
        <Input
          className="border-2 border-white text-slate-400 p-5 text-xl lg:text-slate-100 w-full md:w-4/5 h-14 md:h-12  my-5"
          type="password"
          placeholder="Password..."
          required
        ></Input>
        <Input
          className="border-2 border-white text-slate-400 p-5 text-xl lg:text-slate-100 w-full md:w-4/5 h-14 md:h-12  my-5"
          type="password"
          placeholder="Confirm Password..."
          required
        ></Input>
        <Button className="bg-slate-400 hover:bg-slate-600 text-xl w-3/4 md:w-4/5 p-2 h-12 md:h-13 mx-2 my-5">
          Signin
        </Button>
      </form>

      <div className="mt-3 flex justify-center items-center">
        <div>
          <p className="text-white">Registered User?</p>
        </div>
        <div className="ml-2">
          <Link href="/signin">
            <p className="text-white cursor-pointer text-xl underline">
              Sign in
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default page;
