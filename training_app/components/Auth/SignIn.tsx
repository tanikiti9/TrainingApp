import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

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

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSend = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("ログイン成功")
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    }

    return (
        <Container>
            <LoginCard>
                <Typography variant="h5" gutterBottom>
                    ログイン
                </Typography>
                <TextField variant="outlined" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth label="ユーザー名" />
                <TextField variant="outlined" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth label="パスワード" type="password" />
                <Button variant="contained" color="primary" onClick={handleSend} fullWidth>
                    ログイン
                </Button>
            </LoginCard>
        </Container>
    );
}

export default SignIn