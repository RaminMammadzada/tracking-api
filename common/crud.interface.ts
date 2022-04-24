export interface CRUD {
    list: () => Promise<any>;
    create: (resource?: any) => Promise<any>;
    putByUnequeId: (unequeId: string, resource: any) => Promise<string>;
}