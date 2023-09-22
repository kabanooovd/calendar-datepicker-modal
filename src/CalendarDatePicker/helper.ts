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
    new Array(
        moment(`${year}-${onAddZero(month + 1)}`, "YYYY-MM").daysInMonth()
    )
        .fill(null)
        .map((_, idx) =>
            moment(`${year}-${onAddZero(month + 1)}-${onAddZero(idx + 1)}`)
        );
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

export const onGetBaseSlotParams = (slots: string[]) => {
    const slotsLength = slots.length;
    const sortedSlots = slots.sort((a, b) => (a > b ? 1 : -1));
    const minDate = moment(sortedSlots[0]);
    const maxDate = moment(sortedSlots[slotsLength - 1]);

    const minMonth = minDate.month();
    const maxMonth = maxDate.month();

    const minYear = minDate.year();
    const maxYear = maxDate.year();

    return {
        minMonth,
        maxMonth,
        minYear,
        maxYear,
    };
};

export const onCheckDateInSlots = (date: Moment, slots: string[]): boolean => {
    let resutl = false;
    slots.forEach((slot) => {
        const isEqual = onCheckDaysEquality(date.format(), slot);
        if (isEqual) {
            resutl = true;
        }
    });
    return resutl;
};

export const onCheckDaysEquality = (incomingDate: string, date: string): boolean => {
    const _format = "YYYY-MM-DD";
    const _incomingDate = moment(incomingDate).format(_format);
    const _date = moment(date).format(_format);
    return moment(_incomingDate).isSame(_date, "day");
};

export const onAddZero = (num: number) => (num > 9 ? num : `0${num}`);
