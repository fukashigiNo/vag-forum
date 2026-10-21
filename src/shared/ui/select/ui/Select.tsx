"use client"
import type { ISelect } from "../types"

export default function Select({
    value,
    className,
    itemClass="bg-[#F9FAFB] border border-[#DAE0E7]",
    values,
    onChange
}: ISelect) {
    return (
        <select 
        className={className} 
        value={value ?? ""}
        onChange={onChange}
        >
            <option value="" disabled className="font-thin text-[10px]">Выберите тип</option>
            {values.map(item => 
                <option 
                className={`${itemClass}`}
                key={item}
                value={item}
                >
                    {item}
                </option>
            )}
        </select>
    )
}