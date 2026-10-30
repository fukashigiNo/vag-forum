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
                    <button 
                        className={item === activeFilter ? 
                            "ml-4 rounded-full text-white border border-zinc-700 bg-blue-500 px-2 py-1 text-[14px] cursor-pointer" 
                            : itemClassName}  
                        onClick={() => handlePress(item)}>{item}
                    </button>
                </li>
            ))}
            </ul>
    )
}