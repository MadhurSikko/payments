import express from "express"
import db from "@repo/db/client"

const app = express();

app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation: {
        token: string,
        userId: number,
        amount: number
    } = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount,
    }
    //Hit the hdfc api and check if the user had the required amount    

    //Add the amount to balance
    try {
        await db.$transaction([
            db.balances.update({
                where:{
                    userId: paymentInformation.userId,
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount,
                    }
                }
            }),

            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success",
                    amount: paymentInformation.amount,
                    provider: "HDFC"
                }
            })
        ])

        res.json({
            message: "Captured",
        })
    } catch (err) {
        console.log(err);
        return res.json({
            message: "Error while processing webhook"
        })
    }
});
