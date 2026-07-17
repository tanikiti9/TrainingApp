import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface UserInfo {
    name: string | null;
    fatPercentage: number | null;
}

export const getUserInfo = async (uid: string): Promise<UserInfo | null> => {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return snap.data() as UserInfo;
};

export const saveUserInfo = async (uid: string, info: UserInfo) => {
    const ref = doc(db, "users", uid);
    await setDoc(ref, info, { merge: true });
};