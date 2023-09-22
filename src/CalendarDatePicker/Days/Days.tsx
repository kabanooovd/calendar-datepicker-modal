import { Moment } from "moment";
import style from "./Days.module.scss";
import {
    onCheckDateInSlots,
    onCheckDaysEquality,
    onGetHandledWeekday,
} from "../helper";
import classNames from "classnames";

interface IProps {
    weekdays: string[];
    chosenDate: string | null;
    daysList: Moment[];
    prevDaysList: Moment[];
    nextDaysList: Moment[];
    slots: string[];
    onHandleChosenDate: (date: string) => void;
}

export const Days = (props: IProps) => {
    const {
        weekdays,
        daysList,
        nextDaysList,
        prevDaysList,
        slots,
        onHandleChosenDate,
        chosenDate,
    } = props;

    const lastDayPrevMonth: Moment = prevDaysList[prevDaysList.length - 1];
    const firstDayNextMonth: Moment = nextDaysList[0];

    const lastWeekdayPrevMonth: number = onGetHandledWeekday(lastDayPrevMonth);
    const firstWeekdayNextMonth: number =
        onGetHandledWeekday(firstDayNextMonth);

    const prevMonthList = prevDaysList.slice(-lastWeekdayPrevMonth - 1);
    const nextMonthList = nextDaysList.slice(0, 7 - firstWeekdayNextMonth);

    const prevDays = prevMonthList.map((prev) => <div key={prev.format()} />);
    const nextDays = nextMonthList.map((next) => <div key={next.format()} />);

    return (
        <div className={style.container}>
            {weekdays.map((title) => (
                <div key={title} className={style.weekday}>
                    {title.toUpperCase()}
                </div>
            ))}
            {prevDays}
            {daysList.map((day) => {
                const isActiveDate = onCheckDateInSlots(day, slots);

                const isChosenDate: boolean = chosenDate
                    ? onCheckDaysEquality(chosenDate, day.format())
                    : false;

                const setStyles = () => {
                    switch (true) {
                        case isActiveDate && isChosenDate:
                            return classNames(style.day, style.chosenDay);
                        case isActiveDate:
                            return style.day;
                        default:
                            return style.day;
                    }
                };

                return (
                    <button
                        disabled={!isActiveDate}
                        className={setStyles()}
                        key={day.format("DD")}
                        onClick={() => onHandleChosenDate(day.format())}
                    >
                        {day.format("DD")}
                    </button>
                );
            })}
            {nextDays}
        </div>
    );
};
