"use client"

import type { IIcon } from "../types";


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
