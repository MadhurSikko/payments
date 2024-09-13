"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/centre";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/text-input";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";
import axios from "axios";
import { useRouter } from "next/navigation";
import { failOnRampTransaction } from "../app/lib/actions/failOnRampTransaction";

const SUPPORTED_BANKS = [{
    name: "HDFC",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "ICICI",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const router = useRouter();
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [amount, setAmount] = useState(0);
    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} errorState={isNaN(amount)? true: false} error={"Enter a non zero value"} placeholder={"Amount"} onChange={(val) => {
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
            <Button disabledStatus={isNaN(amount) || amount <= 0? true: false} onClick={async () => {
                const response = await createOnRampTransaction(amount, provider);
                {/*window.location.href = redirectUrl || "";*/}
                
                if (response.hasOwnProperty('error')) {
                    alert(response.message);
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
                    }).then(async (res) => {
                        console.log(res);
                        console.log(res.data);
                        if (res.data.message === "Captured") {
                            router.push("/dashboard");
                        } else {
                            await failOnRampTransaction(response.token, Number(response.userId));
                            alert("Transaction Failed");
                        }
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