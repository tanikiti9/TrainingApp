"use client"

import AddTraining from "@/components/Training/AddTraining";
import { Training } from "@/type/interface";
import { Button } from "@mui/material";

export default function Home() {
  const handleAddTraining = (training: Training) => {
        console.log("受け取ったTraining:", training);
    };
  return (
    <>
    <div><AddTraining　onAdd={handleAddTraining} /></div>
    </>
  );
}
