"use client";

import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { SetDetail } from "@/type/interface";

const Row = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
});

type Props = {
    sets: SetDetail[];
    onChange: (sets: SetDetail[]) => void;
};

const SetEditor = ({ sets, onChange }: Props) => {

    const handleAdd = () => {
        // 前のセットと同じ重量・回数を初期値にすると入力が楽
        const last = sets[sets.length - 1];
        const newSet: SetDetail = {
            weight: last?.weight ?? 0,
            reps: last?.reps ?? 10,
        };
        onChange([...sets, newSet]);
    };

    const handleUpdate = (index: number, key: keyof SetDetail, value: string) => {
        const num = Number(value);
        const updated = sets.map((set, i) =>
            i === index ? { ...set, [key]: isNaN(num) ? 0 : num } : set
        );
        onChange(updated);
    };

    const handleDelete = (index: number) => {
        onChange(sets.filter((_, i) => i !== index));
    };

    return (
        <div>
            {sets.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    セットを追加してください
                </Typography>
            )}

            {sets.map((set, index) => (
                <Row key={index}>
                    <Typography variant="body2" sx={{ width: '48px' }}>
                        {index + 1}セット
                    </Typography>
                    <TextField
                        size="small"
                        label="重量（kg）"
                        type="number"
                        value={set.weight}
                        onChange={(e) => handleUpdate(index, "weight", e.target.value)}
                        slotProps={{
                            htmlInput: { step: "0.5", min: 0 }
                        }}
                    />
                    <TextField
                        size="small"
                        label="回数"
                        type="number"
                        value={set.reps}
                        onChange={(e) => handleUpdate(index, "reps", e.target.value)}
                        slotProps={{
                            htmlInput: { step: "1", min: 0 }
                        }}
                    />
                    <Button color="error" size="small" onClick={() => handleDelete(index)}>
                        削除
                    </Button>
                </Row>
            ))}

            <Button variant="outlined" onClick={handleAdd} fullWidth sx={{ mt: 2 }}>
                セットを追加
            </Button>
        </div>
    );
};

export default SetEditor;
