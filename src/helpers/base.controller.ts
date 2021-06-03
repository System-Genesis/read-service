import * as mongoose from 'mongoose';

export default class Crud {
    private model; // we dont want the model being accessed outside the class

    constructor(Model) {
        this.model = Model;
    }

    // alert!!! in this case, the object this is undefined
    // getAll (params, done) {
    //   this.model.find({}).exec(done);
    // }

    //  methodos accessing DB
    public getAll = (params: any, done: Function): void => {
        this.model.find({}, done);
    };

    public getById = (params: any, done: Function): void => {
        const { id, _id } = params;
        this.model.findOne({ _id: id || _id }).exec(done);
    };
}
