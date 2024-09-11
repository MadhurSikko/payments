import express from "express"
import db from "@repo/db/client"

import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors());

app.post("/hdfcWebhook", async (req, res) => {
    console.log("In the webhook server");
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
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token,
                    userId: paymentInformation.userId,
                },
                data: {
                    status: "Success",
                }
            }),

            db.balances.update({
                where: {
                    userId: paymentInformation.userId,
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount,
                    }
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

app.post("/iciciWebhook", async (req, res) => {
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
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token,
                    userId: paymentInformation.userId,
                },
                data: {
                    status: "Success",
                }
            }),

            db.balances.update({
                where: {
                    userId: paymentInformation.userId,
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount,
                    }
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

app.get("/", (req, res) => {
    return res.json({
        message: "The webhook server works",
    })
})

app.listen(5000, () => {
    console.log("Listening on part: 5000");
});