// import all interfaces
import { IWrite } from '../interfaces/IWrite';
import { IRead } from '../interfaces/IRead';

// that class only can be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    create(_item: T): Promise<boolean> {
        console.log(this);
        throw new Error('Method not implemented.');
    }

    update(_id: string, _item: T): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    delete(_id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    find(_item: T): Promise<T[]> {
        throw new Error('Method not implemented.');
    }

    findOne(_id: string): Promise<T> {
        throw new Error('Method not implemented.');
    }
}
