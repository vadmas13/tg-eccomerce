import { PrismaArgsOperator } from '@share/consts';
import { isNotDefined } from './functional.utils';

export const getWhereArgs = <T>(
    searchParams: T,
    operator: PrismaArgsOperator = PrismaArgsOperator.AND,
) => {
    const query = Object.keys(searchParams).reduce((result, key) => {
        const value = searchParams[key];
        if (isNotDefined(value)) return result;
        result.push({ [key]: value });
        return result;
    }, []);
    return { [operator]: query };
};
