"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { MouseEvent } from "react";

export default function SignIn() {
    const { data: session } = useSession();
    const handleSignIn = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signIn();
    }
    const handleSignOut = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signOut();
    }
    if (session?.user) {
        return (
            <div>
                <p className="flex">Signed in as {session.user?.name}</p>
                <button onClick={handleSignOut} className="py-2 px-4 mr-4 text-slate-50 border-slate-50 border-solid border-2 rounded-lg hover:text-slate-900  hover:bg-slate-50">Sign out</button>
            </div>
        );
    }
    return (
        <div>
            <p>Not signed in</p>
            <button onClick={handleSignIn} className="py-2 px-4 mr-4 text-slate-50 border-slate-50 border-solid border-2 rounded-lg hover:text-slate-900  hover:bg-slate-50">Sign in</button>
        </div>
    );
}
