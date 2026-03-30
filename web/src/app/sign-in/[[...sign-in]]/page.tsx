import { AuthInterface } from "../../../components/ui/AuthInterface";

export default function Page() {
    return (
        <div className="flex justify-center items-center h-screen bg-background-light dark:bg-background-dark p-6">
            <AuthInterface mode="signin" />
        </div>
    );
}
