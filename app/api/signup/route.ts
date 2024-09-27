import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    return NextResponse.json({msg:'Get Request from SignUp route '},{status:200})
}