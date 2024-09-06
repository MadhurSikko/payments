import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any,
    takeHome: any,
}

export const Appbar = ({
    user,
    onSignin,
    onSignout,
    takeHome
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4">
        <div className="text-lg flex flex-col justify-center">
            <button onClick={takeHome}>PayTM</button>
        </div>
        <div className="flex flex-row justify-between pt-2">
            <div className="pt-2 pr-4">
                {user? <p>Hello, {user.name}</p>: <></>}
            </div>
            <div>
                <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
            </div>            
        </div>
        
    </div>
}