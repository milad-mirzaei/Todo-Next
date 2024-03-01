import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { AuthOptions } from "next-auth";


export const authOptions:AuthOptions = {
    session: { strategy: "jwt" },
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: {  label: "Password", type: "password" }
      },
         async authorize(credentials) {
          const {email, password } = credentials;
  
          try {
            await connectDB();
          } catch (error) {
            throw new Error("Error in connecting to DB!");
          }
  
          console.log(email,password)
          if (!email || !password) {
            throw new Error("Invalid Data!");
          }
  
          const user = await User.findOne({ email: email });
  
          if (!user) throw new Error("User doesn't exist!");
  
          const isValid = await verifyPassword(password, user.password);
  
          if (!isValid) throw new Error("Username or password is incorrect!");
  
          return user;
        },
      }),
    ],
  };
export default NextAuth(authOptions)