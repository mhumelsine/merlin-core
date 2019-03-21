import { toast } from 'react-toastify';

export function setDefaultValues(obj: any, ...propsToNotReset: string[]) {
    Object.keys(obj)
        .filter(key => propsToNotReset.indexOf(key) === -1)
        .map(key => obj[key] = getDefaultValue(obj[key]));
}

export function createToast(errors: any, successMessage: string) {

    const keys = Object.keys(errors);


    if (keys.length > 0) {
        console.dir(errors);
        console.dir(keys);
        keys.map(key => errors[key].map((error: string) => toast.error(error)));
    } else {
        toast.success(successMessage);
    }
}

// did not find any references
// function getCssTransition() {
//    return cssTransition({
//        enter: 'flip',
//        exit: 'flip'
//    });
// }

function getDefaultValue(instance: any) {
    switch (typeof instance) {
        case 'number':
            return 0;
        case 'string':
            return '';
        case 'object':
            return {};
        case 'boolean':
            return false;
        default:
            return undefined;
    }
}

export function isNullOrEmpty(s: any) {
    return s === undefined
        || s === null
        || (typeof s === 'string' && s.length === 0
            || /^[\s]+$/.test(s));
}

export function getOptions(options: any[]) {
    return options.map(option => {
        return { label: option.description, value: option.code };
    });
}

export function stringContains(testValue: string, keyword: string) {
    return (testValue.search(keyword) >= 0);
}

export function CalculatePercent(partial: any, total: any) {
    return (((partial * 10 / total * 10).toFixed(1))) + '%';
}

export function calculateAttackRate(cases: any, exposedCases: any) {
    let rate = '';
    if (exposedCases > 0 && cases <= exposedCases) {
        rate = CalculatePercent(cases, exposedCases);
    } else {
        if (!isNaN(cases) && !isNaN(exposedCases)) {

            rate = '0';
        } else
            rate = '';
    }
    return rate;
}

export function isViewOnlyPathname(pathname: string) {
    return (pathname.startsWith('/survey/merlin') || /^(\/Outbreak\/(V|v))[0-9]+$/.test(pathname));
}

export function compareValues(key: any, order = 'asc') {
    return function (a: any, b: any) {
        if (!a.hasOwnProperty(key) ||
            !b.hasOwnProperty(key)) {
            return 0;
        }

        const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

        let comparison = 0;

        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order == 'desc') ?
                (comparison * -1) : comparison
        );
    };
}

export function columnOrder(key: any) {
    return function (x: any, y: any) {
        return x == key ? -1 : y == key ? 1 : 0;
    };
}
