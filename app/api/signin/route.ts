import { NextRequest , NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import ConnectDB from "@/lib/db";
import User from "@/lib/models";
import mongoose from 'mongoose';

const KEY=process.env.KEY;
console.log(KEY);

export async function POST(req:NextRequest){

    try{
        console.log('indside try');
    const {email,password}=await req.json();
    console.log('body is '+JSON.stringify(req.body));
    //connect to database
    await ConnectDB();
    console.log('connected database');

    console.log('findiing user');
    const user=await User.findOne({email,password});
    console.log('user found');
    if(user){
        const Id=user._id;
        const token=jwt.sign({Id},KEY);
        
        return NextResponse.json({"token":token},{status:200}); 
    }
    console.log('user not found');
    return NextResponse.json({error:'User not exists'},{status:404})

}catch(error){
    console.log('inside catch');
    console.log(error);
    console.log('error while finding user',error);
    return NextResponse.json({error:'Internal Server Error'},{status:500})
}

}