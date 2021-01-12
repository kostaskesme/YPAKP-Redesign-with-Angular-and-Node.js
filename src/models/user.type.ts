import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export interface User{
    _id: string,
    firstName: string,
    lastName: string,
    afm: string,
    password: string,
    type: string,
    company: string,
    situation: string,
    situationDate: Date,
    employer: string,
    employees: [{_id: string}],
    showButtonS: boolean,
    showButtonW: boolean,
    showButtonL: boolean,
    applied: boolean
}
