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

export const POST = async(req:NextRequest)=>{

    try{
        const session = await getAuthSession()
        const body = await req.json()
        console.log(body)

        const order = await prisma.order.create({
            data:{
                price:body.price,
                products:body.products,
                status:body.status,
                user:{
                    connect:{
                        email:body.userEmail,
                    }
                }
            }
        })

        return new NextResponse(JSON.stringify("Order Place Success"),{status:200})
    }
    catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({"message":"Something went wrong"}),{status:500})
    }
}