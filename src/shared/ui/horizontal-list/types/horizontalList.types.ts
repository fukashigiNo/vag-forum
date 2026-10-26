export interface IHorizontalList {
    list: string[];
    className?: string;
    itemClassName: string;
    activeFilter: string
    handlePress: (item: string) => void
}
