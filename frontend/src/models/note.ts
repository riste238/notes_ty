export interface Note {
// filter(arg0: (existingNotes: any) => boolean): import("react").SetStateAction<Note[]>;
_id: string,
title: string,
text?: string,
createdAt:string,
updatedAt:string
}