"use server"
import db from "@repo/db/client"

export async function failOnRampTransaction(token: string | undefined, userId: number) {
    try {
        await db.onRampTransaction.update({
            where: {
                token: token,
                userId: userId,
            },
            data: {
                status: "Failure",
            }
        })
        return {
            message: "Success"
        }
    } catch (err) {
        console.log(err)
        return {
            message: "Error occured",
        }
    }
    
}