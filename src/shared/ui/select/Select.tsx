"use client"
interface ISelect {
    value: string;
    className?: string;
    itemClass?: string;
    values: string[];
    onChange: (e:React.ChangeEvent<HTMLSelectElement>) => void
}


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
        value={value} 
        onChange={onChange}
        
        >
            <option className="font-thin text-[10px]">Выберите тип</option>
            {values.map(item => 
                <option 
                className={`${itemClass}`}
                key={item}
                >
                    {item}
                </option>
            )}
        </select>
    )
}