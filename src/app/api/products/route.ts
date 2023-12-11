import { NextRequest, NextResponse } from "next/server"
import prisma from "@/utils/prismaConnect"
import { getAuthSession } from "@/utils/options"

export const GET = async(req:NextRequest)=>{
    try{

        const {searchParams} = new URL(req.url)
        const cat = searchParams.get("cat")
        console.log(cat)

        const products = await prisma.product.findMany({
            where:{
                ...(cat? {catSlug:cat} : {isFeatured:true})
            }
        })
        return new NextResponse(JSON.stringify(products), {status:200})
    }
    catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({"message":"Something went wrong"}), {status:500})
    }
}

export const POST = async(req:NextRequest) =>{

    try{
    const session = await getAuthSession()
    const body = await req.json()
    console.log(body)
        if(session?.user.isAdmin){
           const product= await prisma.product.create({
                data:{
                    title:body.title,
                    desc:body.desc,
                    price:body.price,
                    options:body.options,
                    img:body.img,
                    category:{
                        connect:{
                            slug:body.catSlug
                        }
                    }
                }
            })
            return new NextResponse(JSON.stringify(product),{status:200})
        }
        else{
            return new NextResponse(JSON.stringify({"message":"Not allowed"}),{status:403})
        }

    }catch(err){
        return new NextResponse(JSON.stringify({"message":"Something went wrong"}),{status:500})
    }
}

