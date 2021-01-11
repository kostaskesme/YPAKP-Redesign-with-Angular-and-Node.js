import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export interface User{
    id: string,
    firstName: string,
    lastName: string,
    afm: string,
    password: string,
    type: string,
    company: string,
    situation: string,
    situationDate: Date,
    employers: [{
        id: string,
        company: string,
        firstName: string,
        lastName: string,
        afm: string
    }],
    employees: [{
        id: string,
        firstName: string,
        lastName: string,
        afm: string
        situation: string,
        situationDate: Date,
    }],
    showButtonS: boolean,
    showButtonW: boolean
    showButtonL: boolean,
}
