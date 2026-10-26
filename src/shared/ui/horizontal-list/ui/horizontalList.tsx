"use client"
import { IHorizontalList } from "../types"

export default function HorizontalList({
    list,
    className,
    itemClassName,
    activeFilter,
    handlePress
}:IHorizontalList) {

    return  (
            <ul className={`flex flex-wrap ${className}` }>
            {list.map((item, index) => (
                <li key={index} className="cursor-pointer">
                    <button className={item === activeFilter ? "px-3 py-2 rounded-[8px]  coursor-pointer bg-[#14253D] text-white" : itemClassName}  onClick={() => handlePress(item)}>{item}</button>
                </li>
            ))}
            </ul>
    )
}