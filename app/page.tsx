"use client"
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from 'axios';
import { useState } from "react";
import {useRouter} from "next/navigation";

const page = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [btn,setBtn]=useState("Sign In");

  const router=useRouter();

  async function SignIn(e:any){
    e.preventDefault();
    setBtn("Logging in...");
    try{
      console.log('inside try');
      const response=await axios.post(`${process.env.NEXT_PUBLIC_USER_API}/api/signin`,{email,password});
      console.log(response.data);
      if(response.status==200){
        const token=response.data.token;
        localStorage.setItem('token',token);
        alert('SignIn Successfull');
        router.push('/Dashboard/TaskLists');
        setBtn("Sign In");
      }
    }catch(error:any){
      setBtn("Sign In");
      console.log('inside catch');
      alert(error);
      alert('Invalid Email Id');
    }  
  }
  

  return (
    <main className="bg-black h-screen flex flex-col items-center justify-center">
      <div>
        <h1 className="mb-4 text-white text-3xl font-bold">SIGN IN</h1>
      </div>

      <form onSubmit={SignIn} className="md:border-2 border-white md:p-5 flex items-center flex-col justify-center">
        <Input
          className="border-2 border-white text-slate-400 p-4 text-xl lg:text-slate-100 w-full md:w-4/5 h-14  my-5"
          type="email"
          placeholder="Enter your email"
          onChange={(e)=>setEmail(e.target.value)}
          required
        ></Input>
        <Input
          className="border-2 border-white text-slate-400 p-4 text-xl lg:text-slate-100 w-full md:w-4/5 h-14  my-5"
          type="password"
          placeholder="Password..."
          onChange={(e)=>setPassword(e.target.value)}
          required
        ></Input>
        <Button className="bg-slate-400 hover:bg-slate-600 text-xl w-3/4 md:w-4/5 p-2 h-12 md:h-13 mx-2 my-5">
          {btn}
        </Button>
      </form>

      <div className="mt-4 flex justify-center items-center">
        <div>
          <p className="text-white">New User?</p>
        </div>
        <div className="ml-2">
          <Link href="/signup">
            <p className="text-white cursor-pointer text-xl underline">
              Sign Up
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default page;
