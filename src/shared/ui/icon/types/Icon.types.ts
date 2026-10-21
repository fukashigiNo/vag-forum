import type { LucideIcon } from "lucide-react";

export interface IIcon  {
    className?: string;
    color: string;
    icon: LucideIcon;
    size: number
    fill?: string
    strokeWidth?: number;
    handlePress?: () => void
}
