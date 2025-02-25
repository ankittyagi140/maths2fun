import { ComponentType } from "react";

interface CustomButton {
    children: string,
    onClick:(event: React.MouseEvent<HTMLButtonElement>) => void,
    variant?: "secondary" | "default" | "destructive" | "outline" | "ghost" | "link"  | null | undefined
}


interface SubHeadersLinks{
    title:string,
    link:string,
    isActive?:boolean,
    id:string,
    icon:ComponentType<{ size?: number; color?: string }>
}

interface AppCards{
    title:string,
    description:string,
    Icon:ComponentType<{ size?: number; color?: string }>,
    id:string,
    categories?:boolean,
    bg?:string,
    textColor:string
}


// Exporting as a type if needed elsewhere
export type { CustomButton,SubHeadersLinks,AppCards };


