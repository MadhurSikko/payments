"use server";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";


export async function createOnRampTransaction(amount: number, provider: string ) {
    const session = await getServerSession(authOptions);

    if (amount <= 0) {
        return {
            error: "error",
            message: "Enter a positive value",
        }
    }

    if (!(provider === "HDFC" || provider === "ICICI")) {
        return {
            error: "error",
            message: "Invalid bank input",
        }
    }

    if (!session) {
        return {
            error: "error",
            message: "User doesn't exist",
        }
    }
    
    const token = (Math.random() * 1000).toString(); 


    try {
        const response = await db.onRampTransaction.create({
            data: {
                status: "Processing",
                token: token,
                provider: (provider === "HDFC"? "HDFC": "ICICI"),
                amount: amount*100,
                startTime: new Date(),
                userId: Number(session.user.id),
            }
        })
        return {
            message: "Success",
            token: response.token,
            amount: response.amount,
            userId: response.userId,
        }
    } catch (err) {
        console.log(err);
        return {
            error: "error",
            message: "Error Occured",
        }
    }      
}

