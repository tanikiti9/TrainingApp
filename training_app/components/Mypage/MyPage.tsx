"use client";

import { useEffect, useState } from "react";
import { Button, TextField, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { useAuth } from "@/contexts/AuthContext";
import { getUserInfo, saveUserInfo, UserInfo } from "@/lib/userInfo";

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
});

const Card = styled('div')({
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '320px',
});

const MyPage = () => {
    const { user, loading: authLoading } = useAuth();

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // フォーム入力用の一時state
    const [nameInput, setNameInput] = useState("");
    const [fatInput, setFatInput] = useState("");
    const [error, setError] = useState("");

    // Firestoreからユーザー情報を取得
    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            const data = await getUserInfo(user.uid);
            setUserInfo(data); // ドキュメントが無ければ null のまま
            if (data === null) {
                setIsEditing(true); // 未入力なら最初から編集モード
            } else {
                setNameInput(data.name ?? "");
                setFatInput(data.fatPercentage?.toString() ?? "");
            }
            setLoading(false);
        };
        if (!authLoading && user) fetchData();
    }, [user, authLoading]);

    const handleSave = async () => {
        if (!user) return;
        setError("");

        const fatValue = parseFloat(fatInput);
        if (nameInput.trim() === "") {
            setError("ユーザーネームを入力してください");
            return;
        }
        if (isNaN(fatValue) || fatValue < 0 || fatValue > 100) {
            setError("体脂肪率は0〜100の数値で入力してください");
            return;
        }

        const newInfo: UserInfo = { name: nameInput, fatPercentage: fatValue };
        await saveUserInfo(user.uid, newInfo);
        setUserInfo(newInfo);
        setIsEditing(false);
    };

    if (authLoading || loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (!user) {
        return (
            <Container>
                <Typography>ログインしてください</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Card>
                <Typography variant="h5" gutterBottom>
                    マイページ
                </Typography>

                {isEditing ? (
                    <>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            fullWidth
                            label="ユーザーネーム"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            value={fatInput}
                            onChange={(e) => setFatInput(e.target.value)}
                            fullWidth
                            label="体脂肪率（%）"
                            type="number"
                            slotProps={{
                                htmlInput: { step: "0.1", min: 0, max: 100 }
                            }}
                        />
                        {error && (
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            保存
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            ユーザーネーム：{userInfo?.name}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            体脂肪率：{userInfo?.fatPercentage}%
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={() => setIsEditing(true)}
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            編集する
                        </Button>
                    </>
                )}
            </Card>
        </Container>
    );
};

export default MyPage;