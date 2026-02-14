
import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex justify-center items-center h-screen bg-background-light dark:bg-background-dark">
            <SignIn />
        </div>
    );
}
