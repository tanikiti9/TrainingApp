export interface Information {
    email: string,
    name: string,
    fatPercentage: number,
    routines: Routine[]
}

export interface Routine {
    id: string,
    training: Training[],
    datetime: string
}

export interface Training {
    id: string,
    trainingName: string,
    parts: BodyPart,
    sets: SetDetail[]
}

export interface SetDetail {
    reps: number,
    weight: number
}

type BodyPart = '胸' | '背中' | '肩' | '脚' | '腕' | '腹';