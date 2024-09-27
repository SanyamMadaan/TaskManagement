import { NextRequest , NextResponse } from "next/server";

export async function GET(req:NextRequest){
    return NextResponse.json({msg:'Get request from Signin route'},{status:200})

}