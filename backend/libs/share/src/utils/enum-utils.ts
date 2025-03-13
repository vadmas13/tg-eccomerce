import _ from 'lodash';

type EnumKeys<TEnum> = Exclude<keyof TEnum, number>;

/**
 * В TS enum преобразуется в объект с маппингом ключей на значения и обратно, т.е.
 * enum с двумя ключами будет преобразован в объект с четырьмя.
 *
 * Эта функция возвращает копию enum без ключей обратного маппинга
 * @param obj - входной enum
 * @example
 * Enum { A = "a", B = 1 }
 * Object.keys(Enum) -> ["A", "a", "B", "1"]; // "a", "1" - лишние ключи
 * prepareEnum(Enum) -> { A: "a", B: 1 };
 * Object.keys(prepareEnum(Enum)) -> ["A", "B"]
 */
const prepareEnum = <T extends Record<string, number | string>>(obj: T) => {
    const copy = { ...obj } as { [K in EnumKeys<T>]: T[K] };
    Object.values(obj).forEach((value) => typeof value === 'number' && delete copy[value]);
    return copy;
};

/**
 * Возвращает "прямые" ключи enum
 * @see {@link prepareEnum}
 * @param obj - входной enum
 */
export const enumKeys = <T extends Record<string, number | string>>(obj: T) => {
    return Object.keys(prepareEnum(obj)) as EnumKeys<T>[];
};

export const getEnumKey = <T extends Record<string, number | string>>(
    obj: T,
    predicate: (val: number | string) => boolean,
): keyof T | undefined => {
    return _.findKey(prepareEnum(obj), predicate);
};

/**
 * Возвращает "прямые" значения enum
 * @see {@link prepareEnum}
 * @param obj - входной enum
 */
export const enumValues = <T extends Record<string, number | string>>(obj: T) => {
    const set = new Set(Object.values(prepareEnum(obj)));
    return [...set] as T[keyof T][];
};

export const isEnumValue = <T extends Record<string, string | number>, TVal extends T[keyof T]>(
    enumObject: T,
    value: string | number,
): value is TVal => enumValues(enumObject).includes(value as T[keyof T]);

export const mapEnum = <T extends Record<string, string | number>, TVal extends T[keyof T], U>(
    enumObject: T,
    mapper: (key: string, value: TVal) => U,
    // Функция должна принимать тот тип значений, который по факту присутствует в enum, без учета всех допустимых
) => {
    return Object.keys(prepareEnum(enumObject)).map((key) => mapper(key, enumObject[key] as TVal));
};

// для случаев, когда в качестве ключа в объектах указан enum, но нет значения
export const getPrepareEnumWithoutValues = <
    T extends Record<string, number | string>,
    K extends EnumKeys<T> | string = EnumKeys<T>,
>(
    obj: T,
) => {
    const prepare = prepareEnum(obj);
    return _.keys(prepare).reduce(
        (values: Record<K, undefined>, curr: string) => ({
            ...values,
            [curr]: undefined,
        }),
        {} as Record<K, undefined>,
    );
};
// Когда необходимо получить значение enum, соответствующее по индексу
export const getEnumIterationObject = <T extends Record<string, number | string>>(
    obj: T,
): Record<T[keyof T], number> =>
    enumValues(obj).reduce((result, current, index) => {
        result[current] = index;
        return result;
    }, {} as Record<T[keyof T], number>);
