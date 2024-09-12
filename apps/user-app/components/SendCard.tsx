"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/centre";
import { TextInput } from "@repo/ui/text-input";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { TransactionSuccessful } from "@repo/ui/transaction-successful";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const[success, setSuccess] = useState(false);
    
    return <div className="h-[90vh]">
        
        {success? <Center><TransactionSuccessful /></Center> : 
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            const response = await p2pTransfer(number, Number(amount)*100); 
                            if (response.message === 'Success') {
                                setSuccess(true);
                            }
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>}
            
    </div>
}