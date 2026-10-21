export interface ISelect {
    value: string | null;
    className?: string;
    itemClass?: string;
    values: string[];
    onChange: (e:React.ChangeEvent<HTMLSelectElement>) => void
}
