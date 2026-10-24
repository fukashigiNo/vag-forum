export type SelectOption = string | { value: string; label: string };

export interface ISelect {
    value: string | null;
    id?: string;
    className?: string;
    itemClass?: string;
    required?: boolean;
    values: SelectOption[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
