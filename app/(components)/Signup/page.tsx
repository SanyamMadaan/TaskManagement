"use client"
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";

const page = () => {
  
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");

  const[button,setButton]=useState("Sign Up");

  const router=useRouter();

  async function SignUp(e:any){
    e.preventDefault();
    setButton("Creating account...");
    if(password !== confirmPassword){
      alert("Passwords do not match");
      setButton("Sign Up");
      return;      
    }
    try{
      console.log('inside try');
      const response=await axios.post(`${process.env.NEXT_PUBLIC_USER_API}/api/signup`,{name,email,password});
      console.log(response.data);
      if(response.status==200){
        const token=response.data.token;
        localStorage.setItem('token',token);
        alert('Account Created Successfully');
        router.push('/Dashboard/TaskLists');
        setButton("Sign Up");
      }
    }catch(error:any){
      console.log('inside catch');
      setButton("Sign Up");
      alert('Error while Creating account');
    }
  }

  return (
    <main className="bg-black h-screen flex flex-col items-center justify-center">
      <div>
        <h1 className="mb-3 text-white text-4xl font-bold">SIGN UP</h1>
      </div>

      <form onSubmit={SignUp} className="md:border-2 border-white md:p-3 flex items-center flex-col justify-center">
      <Input
          className="border-2 border-white text-slate-400 p-5 text-xl lg:text-slate-100 w-full md:w-4/5 h-14 md:h-12  my-5"
          type="text"
          placeholder="Username"
          onChange={(e)=>setName(e.target.value)}
          required
        ></Input>
        <Input
          className="border-2 border-white text-slate-400 p-5 text-xl lg:text-slate-100 w-full md:w-4/5 h-14 md:h-12  my-5"
          type="email"
          placeholder="Enter your email"
          onChange={(e)=>setEmail(e.target.value)}
          required
        ></Input>
        <Input
          className="border-2 border-white text-slate-400 p-5 text-xl lg:text-slate-100 w-full md:w-4/5 h-14 md:h-12  my-5"
          type="password"
          placeholder="Password..."
          onChange={(e)=>setPassword(e.target.value)}
          required
        ></Input>
        <Input
          className="border-2 border-white text-slate-400 p-5 text-xl lg:text-slate-100 w-full md:w-4/5 h-14 md:h-12  my-5"
          type="password"
          placeholder="Confirm Password..."
          onChange={(e)=>setConfirmPassword(e.target.value)}
          required
        ></Input>
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

export default page;
