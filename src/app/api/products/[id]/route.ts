import { NextRequest,NextResponse } from "next/server";
import prisma from "@/utils/prismaConnect";
import { getAuthSession } from "@/utils/options";
export const GET = async(req:NextRequest, {params}:{params:{id:string}})=>{

    const {id} = params;

    try{
        const product = await prisma.product.findUnique({
            where:{
                id:id
            }
        })

        return new NextResponse(JSON.stringify(product),{status:200})
    }
    catch(err){

        return new NextResponse(JSON.stringify("Something went wrong"),{status:500})
    }
}
export const DELETE = async(req:NextRequest, {params}:{params:{id:string}})=>{

    const {id} = params;
    const session = await getAuthSession()
    
    try{
        if(session?.user.isAdmin){

            const product = await prisma.product.delete({
                where:{
                    id:id
                }
            })
            
            return new NextResponse(JSON.stringify(product),{status:200})
        }else{
            return new NextResponse(JSON.stringify({"message":"not allowed"}),{status:405})
        }
    }
    catch(err){

        return new NextResponse(JSON.stringify("Something went wrong"),{status:500})
    }
}
