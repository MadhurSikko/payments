"use server";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";


export async function createOnRampTransaction(amount: number, provider: string ) {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        return {
            message: "User doesn't exist",
        }
    }
    
    const token = (Math.random() * 1000).toString(); 
    
    

    return {
        message: "Success",
    }
      
}

