export interface IGroup {
    // OG's Basic information
    id: string;
    name: string;
    ancestors: string[];
    hierarchy: string;
    status: string;
    isLeaf: boolean;
    createdAt: Date;
    updatedAt: Date;
}
