export type SelectOption = string | { value: string; label: string };

export interface ISelect {
    value: string | null;
    className?: string;
    itemClass?: string;
    values: SelectOption[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
