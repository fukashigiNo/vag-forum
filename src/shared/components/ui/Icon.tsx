"use client"

import type { LucideIcon } from "lucide-react";

interface IIcon  {
    className?: string;
    color: string;
    icon: LucideIcon;
    size: number
    fill?: string
    strokeWidth?: number;
    handlePress?: () => void
}

export default function Icon ({
    className= "",
    icon: IconComponent,
    size,
    color,
    fill="none",
    strokeWidth = 1.5,
    handlePress = () => {}
}:IIcon) {
    return (
        <div className={className}>
            <div onClick={handlePress}>
                <IconComponent size={size} color={color} strokeWidth={strokeWidth} fill={fill} />
            </div>
        </div>
    )
}
