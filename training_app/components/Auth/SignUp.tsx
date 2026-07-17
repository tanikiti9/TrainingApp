import { auth } from '@/lib/firebase';
import { Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
});

const LoginCard = styled('div')({
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
});

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSend = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("登録成功")
            // router.push("/");
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    }

    return (
        <div>
            <Container>
                <LoginCard>
                    <Typography variant="h5" gutterBottom>
                        会員登録
                    </Typography>
                    <TextField variant="outlined" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth label="メールアドレス" />
                    <TextField variant="outlined" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth label="パスワード" type="password" />
                    <TextField variant="outlined" margin="normal" fullWidth label="パスワード（確認）" type="password" />
                    <Button variant="contained" color="primary" onClick={handleSend} fullWidth>
                        登録
                    </Button>
                </LoginCard>
            </Container>
        </div>
    )
}

export default SignUp