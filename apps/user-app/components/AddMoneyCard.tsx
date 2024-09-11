"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/centre";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/text-input";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";
import axios from "axios";

const SUPPORTED_BANKS = [{
    name: "HDFC",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "ICICI",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [amount, setAmount] = useState(0);
    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
            setAmount(Number(val))
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setProvider(value);
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
                const response = await createOnRampTransaction(amount, provider);
                {/*window.location.href = redirectUrl || "";*/}
                
                if (response.message === "Error occured" || response.message === "User doesn't exist") {
                    alert("Error");
                    console.log(response.message);
                } else {
                    let url = "";
                    if (provider === "HDFC") {
                        url = "http://localhost:5000/hdfcWebhook";
                    } else {
                        url = "http://localhost:5000/iciciWebhook";
                    }

                    axios.post(url, {
                        token: response.token,
                        userId: Number(response.userId),
                        amount: Number(response.amount),
                    }).then((res) => {
                        console.log(res);
                    }).catch((err) => {
                        console.log(err);
                    })
                }

                
            }}> 
            Add Money
            </Button>
        </div>
    </div>
</Card>
}