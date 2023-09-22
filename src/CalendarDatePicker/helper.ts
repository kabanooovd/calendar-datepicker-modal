import moment, { Moment } from "moment";

export const onGetHandledWeekday = (date: Moment) => {
    const day = date.day();
    const MAPPER: Record<number, number> = {
        0: 6,
        1: 0,
        2: 1,
        3: 2,
        4: 3,
        5: 4,
        6: 5,
    };
    return MAPPER[day];
};

export const onGetDaysByMonthAndYear = (
    month: number,
    year: number
): Moment[] =>
    new Array(moment(`${year}-${onAddZero(month + 1)}`, "YYYY-MM").daysInMonth())
        .fill(null)
        .map((_, idx) =>
            moment(`${year}-${onAddZero(month + 1)}-${onAddZero(idx + 1)}`)
        )
        // .filter((v) => v.month() === month);

export const onHandleMonth = (month: number, operation: "+" | "-") => {
    switch (operation) {
        case "-":
            return month < 0 ? 11 : month;
        case "+":
            return month >= 12 ? 0 : month;
        default:
            return month;
    }
};

export const onAddZero = (num: number) => (num > 9 ? num : `0${num}`);
