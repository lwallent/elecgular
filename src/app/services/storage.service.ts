import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {

    private storage: Storage;

    constructor() {
        this.storage = localStorage;
    }

    public get(keys: string | string[]): Promise<any | any[]> {
        return new Promise<any>((resolve) => {
            if (typeof keys === 'string') {
                resolve(JSON.parse(this.storage.getItem(keys)));
            } else {
                const items = [];
                for (let i = 0, len = this.storage.length; i < len; ++i) {
                    const key = this.storage.key(i);
                    if (keys.indexOf(key) !== -1) {
                        items.push(JSON.parse(this.storage.getItem(this.storage.getItem(key))));
                    }
                }
                resolve(items);
            }
        });
    }

    public getAll(): Promise<any> {
        return new Promise<any>((resolve) => {
            const items = [];
            for (let i = 0, len = this.storage.length; i < len; ++i) {
                const key = this.storage.key(i);
                items.push(JSON.parse(this.storage.getItem(this.storage.getItem(key))));
            }
            resolve(items);
        });
    }

    public set(key: string, data: any): Promise<any> {
        return new Promise<any>((resolve) => {
            this.storage.setItem(key, JSON.stringify(data));
            resolve(data);
        });
    }

    public exist(key: string): Promise<boolean> {
        return Promise.resolve(!!this.storage.getItem(key));
    }

    public empty(): Promise<any> {
        return this.getAll().then((data) => {
            return data.length !== 0;
        });
    }
}
