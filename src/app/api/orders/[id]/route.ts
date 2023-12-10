import { NextResponse,NextRequest } from "next/server"
import prisma from "@/utils/prismaConnect"
import { getAuthSession } from "@/utils/options"
export const PUT = async(req:NextRequest,{params}:{params:{id:string}})=>{

    const {id} = params
    const session = await getAuthSession()

    try{
        if(session?.user.isAdmin){

            const body = await req.json()
            await prisma.order.update({
                where:{
                    id:id
                },
                data:{status:body}
            })
            
            return new NextResponse(JSON.stringify({"message":"Order updated Successfully"}),{status:200})
        }else{
            return new NextResponse(JSON.stringify({"message":"not allowed"}),{status:405})
        }
        
    }catch(err){
        return new NextResponse(JSON.stringify("Something went wrong"),{status:500})
    }

}