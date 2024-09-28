import { NextRequest , NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import ConnectDB from "@/lib/db";
import User from "@/lib/models";
import mongoose from 'mongoose';

const KEY=process.env.KEY;
console.log(KEY);

export async function POST(req:NextRequest){

    try{
    const {email,password}=await req.json();
    
    //connect to database
    await ConnectDB();

    //ensuring model is not redifined on reloads
    const existingUser=mongoose.models.User ||mongoose.model('User',User.schema);
    
    const user=await existingUser.findOne({email,password});

    if(user){
        const Id=user._id;
        const token=jwt.sign({Id},KEY);
        
        return NextResponse.json({"token":token},{status:200}); 
    }
    return NextResponse.json({error:'User not exists'},{status:404})

}catch(error){
    console.log('error while finding user',error);
    return NextResponse.json({error:'Internal Server Error'},{status:500})
}

}