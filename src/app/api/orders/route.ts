import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaConnect";
import { getAuthSession } from "@/utils/options";

export const GET = async() =>{

    try {
        const session = await getAuthSession()
        if(session?.user.isAdmin){

            const allOrders = await prisma.order.findMany()
            return new NextResponse(JSON.stringify(allOrders),{status:200})
        }
    
            const userOrders = await prisma.order.findMany({
                where:{
                    userEmail:session?.user.email!
                }
            })

            return new NextResponse(JSON.stringify(userOrders),{status:200})
        
        
    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Unauthorized"}),{status:401})
    }
    
}