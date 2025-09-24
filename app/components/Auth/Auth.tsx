import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Auth() {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        return <p>Signed in as {session?.user.address}</p>
    }

    return <Link href="/api/auth/signin">Sign in</Link>
}
