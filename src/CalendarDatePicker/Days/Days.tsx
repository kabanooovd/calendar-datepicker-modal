import { Moment } from "moment";
import style from "./Days.module.scss";
import { onGetHandledWeekday } from "../helper";

interface IProps {
    weekdays: string[];
    daysList: Moment[];
    prevDaysList: Moment[];
    nextDaysList: Moment[];
    slots: string[];
}

export const Days = (props: IProps) => {
    const { weekdays, daysList, nextDaysList, prevDaysList, slots } = props;

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
                <div key={title} className={style.weekday}>{title.toUpperCase()}</div>
            ))}
            {prevDays}
            {daysList.map((day) => {
                return <button className={style.day} key={day.format("DD")}>{day.format("DD")}</button>;
            })}
            {nextDays}
        </div>
    );
};
