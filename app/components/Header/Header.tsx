import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/authOptions";

export const Header = async () => {
    const session = await getServerSession(authOptions);
    if(!session?.user) {
        return null;
    }

    return (
        <header>
            <p>Welcome {session.user.name}</p>
        </header>
    )
}