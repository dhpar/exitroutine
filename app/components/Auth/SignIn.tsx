"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function SignIn() {
    const { data: session } = useSession();

    if (session?.user) {
        return (
            <>
                <p>Signed in as {session.user?.address}</p>
                <button onClick={() => signOut()} className="py-2 px-4 mr-4 text-slate-50 border-slate-50 border-solid border-2 rounded-lg hover:text-slate-900  hover:bg-slate-50">Sign out</button>
            </>
        );
    }
    return (
        <>
            {/* <p>Not signed in</p> */}
            <button onClick={() => signIn()} className="py-2 px-4 mr-4 text-slate-50 border-slate-50 border-solid border-2 rounded-lg hover:text-slate-900  hover:bg-slate-50">Sign in</button>
        </>
    );
}
