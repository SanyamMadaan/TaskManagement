import { NextRequest , NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import ConnectDB from "@/lib/db";
import User from "@/lib/models";
const KEY=process.env.KEY;
console.log(KEY);

export async function POST(req:NextRequest){

    try{
    const {name,email,password}=await req.json();
    //connect to database
    await ConnectDB();
    const existingUser=await User.findOne({email,password});

    if(existingUser){
        return NextResponse.json({error:'User already exists'},{status:404}) 
    }

    const user=await User.create({name,email,password});
    const ID=user._id;
    const token=jwt.sign({ID},KEY)

    return NextResponse.json({"token":token},{status:200});

}catch(error){
    console.log('error while Creating user',error);
    return NextResponse.json({error:'Internal Server Error'},{status:500})
}

}