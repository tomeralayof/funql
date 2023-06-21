interface DbInterface {
    create(data: any) : Promise<void>;
    insert(data: any) : Promise<void>;
    read(data: any) : Promise<void>;
    update(data: any) : Promise<void>;
    delete(data: any) : Promise<void>;
};

export { DbInterface };