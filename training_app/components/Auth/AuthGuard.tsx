import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/login");
            } else {
                setLoading(false);
            }
        });     
        return () => unsubscribe();
    }, [router]);

    if (loading) return <div>読み込み中...</div>;

    return <>{children}</>;
}