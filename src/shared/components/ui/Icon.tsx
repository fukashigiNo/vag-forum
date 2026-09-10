"use client"

import type { LucideIcon } from "lucide-react";

interface IIcon  {
    className?: string;
    color: string;
    icon: LucideIcon;
    size: number
    strokeWidth?: number;
    handlePress?: () => void
}

export default function Icon ({
    className= "",
    icon: IconComponent,
    size,
    color,
    strokeWidth = 1.5,
    handlePress = () => {}
}:IIcon) {
    return (
        <div className={className}>
            <div onClick={handlePress}>
                <IconComponent size={size} color={color} strokeWidth={strokeWidth} />
            </div>
        </div>
    )
}
