import {BindingType} from "./BindingType";
export class Binding<T> {
    public singleTonInstance: T;
    constructor(public key: string,
                public val: any,
                public bindingType: BindingType) {

    }
}