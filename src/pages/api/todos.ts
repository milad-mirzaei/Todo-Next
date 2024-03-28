import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { sortTodos } from "@/utils/sortTodos";


const handler = async (req:NextApiRequest,res:NextApiResponse)=>{
    console.log(req)

    try {
        await connectDB()
        console.log('injaaaa')
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'faild',message: 'Error in connecting to DB'})
    }
    console.log(req)
    const session = await getServerSession(req,res,authOptions)
    console.log(session)
    if(!session){
        return res.status(401).json({status:'faild' , message : 'You are not logged in!'})
    }

    const user = await User.findOne({email:session.user.email})

    if(!user){
        return res.status(404).json({status:'faild',message:"User doesn't exist"})
    }

    if(req.method == 'POST'){
        const {title,status} = req.body

        if(!title || !status){
            return res.status(422).json({status:'faild',message:'Invalid Data!'})
        }

        user.todos.push({title,status});
        user.save()

        res.status(201).json({status:'success',message:'Todo created!'})
    }else if(req.method == "GET"){
        console.log(sortTodos(user.todos))
        const sortedData = sortTodos(user.todos)

        res.status(200).json({status:'success',data:{todos:sortedData}})
    }else if(req.method == 'PATCH'){
        const{id,status}=req.body

        if(!id || !status) {
            return res.status(422).json({status:'failed',message:'Invalid data!'})
        }

        const result = await User.updateOne({"todos._id" : id},{$set : {"todos.$.status" : status}})
        console.log(result)

        res.status(200).json({status:'success',message:'todo updated successfully'})

    }
    
}

export default handler