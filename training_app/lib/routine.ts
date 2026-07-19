import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Routine, Training } from "@/type/interface";

// 種目(Training)だけを、新しいRoutineとして仮保存する
export const addTrainingAsRoutine = async (
    uid: string,
    training: Training
): Promise<Routine> => {
    const routinesRef = collection(db, "users", uid, "routines");
    const newRoutineRef = doc(routinesRef);

    const routine: Routine = {
        id: newRoutineRef.id,
        training: [training], // sets: [] のまま保存
        datetime: new Date().toISOString(),
    };

    await setDoc(newRoutineRef, routine);
    return routine;
};