import { isNullOrEmpty } from "./UIUtils";
import * as Codes from '../store/Code';

//this is navie and only check the same order.  This is for use in the Redux store to check for updates
//in this context, items should always be in the same order
export function containSameItems(array1: Array<any>, array2: Array<any>): boolean {
    //easiest case
    if (array1.length !== array2.length) {
        return false;
    }

    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }

    return true;
}

export function getFirstIndexIfObject(element: any) {
    return (typeof(element) === "object" && !isNullOrEmpty(element)) ? element[0] : element;
}

export function queryStringEncode(key: string, array: Array<any>, selector: (item: any) => any) {    

    if (array) {

        let result: string = "";

        array.map(item => {
            if (item) {
                result += `&${key}=${selector(item)}`;
            }
        });

        //need to remove the leading '&'
        return result.substr(1);
    }

    return "";
}

export function getDescriptionByCode(code: string, codes: Codes.DropdownCode[]) {

    if (isNullOrEmpty(codes)) {
        return "";
    }

    var codeObject = ((codes as Codes.DropdownCode[]).find(o => o.code === code) as any);
    var description = !isNullOrEmpty(codeObject) ? codeObject.description : '';

    return description;
}

export function getCodeByDescription(description: string, codes: Codes.DropdownCode[]) {

    if (isNullOrEmpty(codes)) {
        return "";
    }

    var codeObject = ((codes as Codes.DropdownCode[]).find(o => o.description === description) as any);
    var code = !isNullOrEmpty(codeObject) ? codeObject.code : '';

    return code;
}