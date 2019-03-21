import moment from 'moment';
import * as utils from '../utils/UIUtils';
import { defaults } from './Global';



export function getValidationMessageFor(aliasId: number, validationValue: string) {
    switch (aliasId) {
        case 2:
            return 'Required';
        case 3:
            return 'Cannot not be future date';
        case 4:
            return 'Invalid date';
        case 11:
            return `Text must be less than ${validationValue} characters`;
        case 7:
            return `Number must be greater than ${validationValue}`;
        case 8:
            return `Number must be greater than or equal to ${validationValue}`;
        case 5:
            return `Number must be less than ${validationValue}`;
        case 6:
            return `Number must be less than or equal to ${validationValue}`;
        
        case 12:
            return 'Invalid input';
        case 9:
        case 10:
            return 'Invalid number';
        default:
            return defaults.string;
    }
}


export function isNotFutureDate(testDate: string) {
    try {
        if (!isValidDate(testDate) || testDate === '') {
            return true;
        }
        var testDateParsed = Date.parse(testDate);
        var now = new Date().getTime();
        return (testDateParsed <= now);
    }
    catch (e) {
        // return false;
        return true;
    }
}

export function isValidDate(testDate: string) {
    try {
        if (testDate === '') {
            return true;
        }
        
        const isValid = moment(testDate, ['MM/DD/YYYY', 'M/D/YYYY', 'MM/D/YYYY', 'M/DD/YYYY', 'M/D/YY', 'MM/D/YY', 'M/DD/YY', 'M-D-YYYY', 'MM-D-YYYY', 'M-DD-YYYY', 'M-D-YY', 'MM-D-YY', 'M-DD-YY'], true).isValid();
        return isValid;
    }
    catch (e) {
        return false;
    }
}

export function hasValue(testValue: string) {
    if (testValue === null
        || testValue === undefined
        || testValue === '') {

        return false;
    }
    //returns true if string contains visable character.
    return !(/^[\s]+$/g.test(testValue));
}

export function isLessThan(testValue: number, limit: number) {
    return testValue < limit;
}

export function isLessThanOrEqualTo(testValue: number, limit: number) {
    return testValue <= limit;
}

export function isGreaterThan(testValue: number, limit: number) {
    return testValue > limit;
}

export function isGreaterThanOrEqualTo(testValue: number, limit: number) {
    return testValue >= limit;
}

export function isEqualTo(testValue: number, number: number) {
    return testValue == number;
}

export function isNotEqualTo(testValue: number, number: number) {
    return testValue != number;
}

export function isShorterThan(testValue: string, limit: number) {
    return testValue.length < limit;
}

export function matchesPattern(testValue: string, regExp: string) {
    const rE = new RegExp(regExp);
    return rE.test(testValue);
}