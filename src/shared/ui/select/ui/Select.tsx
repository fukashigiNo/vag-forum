"use client"
import type { ISelect } from "../types"

export default function Select({
    value,
    id,
    className,
    itemClass = "bg-[#F9FAFB] border border-[#DAE0E7]",
    required,
    values,
    onChange
}: ISelect) {
    const normalizedValues = values.map((item) =>
        typeof item === "string" ? { value: item, label: item } : item
    )

    return (
        <select
            id={id}
            className={className}
            value={value ?? ""}
            required={required}
            onChange={onChange}
        >
            <option value="" disabled className="font-thin text-[10px]">
                Выберите тип
            </option>
            {normalizedValues.map((item) => (
                <option
                    className={`${itemClass}`}
                    key={item.value}
                    value={item.value}
                >
                    {item.label}
                </option>
            ))}
        </select>
    )
}