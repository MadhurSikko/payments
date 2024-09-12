import { redirect} from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export default async function() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/")
    }
    
    return (
        <>
        Dashboard page
        </>
    )
}