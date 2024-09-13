"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/centre";
import { TextInput } from "@repo/ui/text-input";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { TransactionSuccessful } from "@repo/ui/transaction-successful";

export function SendCard() {
    const [number, setNumber] = useState("0");
    const [amount, setAmount] = useState(0);
    const[success, setSuccess] = useState(false);
    
    return <div className="h-[90vh]">
        
        {success? <Center><TransactionSuccessful /></Center> : 
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput error={"Enter a valid number"} errorState={false} placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput error={"Enter a valid number"} errorState={isNaN(amount) || amount < 0? true: false} placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(Number(value))
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button disabledStatus={isNaN(amount) || amount < 0? true: false} onClick={async () => {
                            const response = await p2pTransfer(number, Number(amount)*100); 
                            if (response.message === 'Success') {
                                setSuccess(true);
                            } else {
                                alert(response.message);
                            }
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>}
            
    </div>
}