import User from "@/models/User"
import connectDB from "@/utils/connectDB"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"
import { verifyPassword } from "@/utils/auth"

const handler = async (req:NextApiRequest,res:NextApiResponse)=>{
    const session = await getServerSession(req,res,authOptions)

    try {
        connectDB()
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'failed',message:'Error in connecting to DB'})
    }

    const user = await User.findOne({email:session.user.email})

    if(!user){
        return res.status(404).json({status:'faild',message:"User doesn't exist!"})
    }

    if(req.method == 'POST'){
        const{name,lastName,password} = req.body

        const isValid = await verifyPassword(password,user.password)

        if(!isValid){
            return res.status(422).json({
                status:'failed',
                message:'passwrod is incorrect!'
            })
        }

        user.name = name,
        user.lastName = lastName
        user.save()

        res.status(200).json({
            status:'success',
            data:{name,lastName,email:session.user.email}
        })
    }else if(req.method == 'GET'){
        res.status(200).json({
            status:'success',
            data:{name:user.name,lastName:user.lastName,email:user.email}
        })
    }

}

export default handler