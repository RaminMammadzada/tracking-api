export interface CRUD {
    list: (limit: number) => Promise<any>;
    create: (resource: any) => Promise<any>;
}