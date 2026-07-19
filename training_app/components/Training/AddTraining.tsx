"use client";

import {
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { useState } from "react";
import { Training } from "@/type/interface";
import { addTrainingAsRoutine } from "@/lib/routine";
import { useAuth } from "@/contexts/AuthContext"; // ← 追加

type BodyPart = '胸' | '背中' | '肩' | '脚' | '腕' | '腹';

type AddTrainingProps = {
    onAdd: (training: Training) => void;
};

const AddTraining = ({ onAdd }: AddTrainingProps) => {
    const { user } = useAuth(); // ← 追加：ログイン中のユーザーを取得
    const [isEditing, setIsEditing] = useState(false);
    const [trainingName, setTrainingName] = useState("");
    const [parts, setParts] = useState<BodyPart | "">("");
    const [error, setError] = useState("");

    const handleSend = () => {
        setIsEditing(true);
    };

    const handlePartsChange = (e: SelectChangeEvent) => {
        setParts(e.target.value as BodyPart);
    };

    // ↓ async を追加
    const handleSave = async () => {
        setError("");

        if (trainingName.trim() === "") {
            setError("種目名を入力してください");
            return;
        }
        if (parts === "") {
            setError("部位を選択してください");
            return;
        }
        if (!user) {
            setError("ログインしてください");
            return;
        }

        const newTraining: Training = {
            id: crypto.randomUUID(),
            trainingName,
            parts,
            sets: [], // セット回数と休憩は後で設定
        };

        const savedRoutine = await addTrainingAsRoutine(user.uid, newTraining);
        console.log("Firestoreに保存されたRoutine:", savedRoutine);

        onAdd(newTraining);

        setTrainingName("");
        setParts("");
        setIsEditing(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleSend} sx={{ margin: "5px" }}>
                種目追加＋
            </Button>

            {isEditing && (
                <>
                    <TextField
                        value={trainingName}
                        onChange={(e) => setTrainingName(e.target.value)}
                        label="種目名"
                        sx={{ margin: "5px" }}
                    />

                    <Select
                        value={parts}
                        onChange={handlePartsChange}
                        displayEmpty
                        sx={{ margin: "5px", minWidth: 120 }}
                    >
                        <MenuItem value="" disabled>
                            部位を選択
                        </MenuItem>
                        <MenuItem value="胸">胸</MenuItem>
                        <MenuItem value="背中">背中</MenuItem>
                        <MenuItem value="肩">肩</MenuItem>
                        <MenuItem value="脚">脚</MenuItem>
                        <MenuItem value="腕">腕</MenuItem>
                        <MenuItem value="腹">腹</MenuItem>
                    </Select>

                    {error && <div style={{ color: "red" }}>{error}</div>}

                    <Button variant="contained" onClick={handleSave} sx={{ margin: "5px" }}>
                        追加
                    </Button>
                </>
            )}
        </>
    );
};

export default AddTraining;