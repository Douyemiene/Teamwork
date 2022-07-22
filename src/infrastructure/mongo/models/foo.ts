import * as mongoose from "mongoose";


export interface IFoo {
    id: string;
    name: string;
    status: string
}


const FooSchema = new mongoose.Schema<IFoo>({
    name: String,
    id: String,
    status: String,
},
    { timestamps: true });

export const Foo = mongoose.model<IFoo>("Foo", FooSchema);
export default Foo;
