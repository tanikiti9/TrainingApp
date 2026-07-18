"use client";

import { useState } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import SetEditor from "@/components/Routine/SetEditor";
import { SetDetail } from "@/type/interface";

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
    width: '360px',
});

const CreateRoutinePage = () => {
    // 種目追加（KA-36）と繋ぐまでは1種目分のセットだけを管理する
    const [sets, setSets] = useState<SetDetail[]>([]);

    return (
        <Container>
            <Card>
                <Typography variant="h5" gutterBottom>
                    セットの設定
                </Typography>
                <SetEditor sets={sets} onChange={setSets} />
            </Card>
        </Container>
    );
};

export default CreateRoutinePage;
