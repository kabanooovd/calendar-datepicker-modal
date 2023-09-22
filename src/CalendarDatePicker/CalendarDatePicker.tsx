import moment, { Moment } from "moment";
import style from "./CalendarDatePicker.module.scss";
import { useState } from "react";
import { Control } from "./Control/Control";
import { Days } from "./Days/Days";
import { onAddZero, onHandleMonth, onGetDaysByMonthAndYear } from "./helper";

interface IProps {
    slots: string[];
}

export const CalendarDatePicker = (props: IProps) => {
    const { slots } = props;

    moment.updateLocale("ru", {
        weekdaysShort: ["Пн", "Вт", "Ср", "Чт", "Пт", "Вб", "Вс"],
    });

    const now = moment().format();

    const initialMonth = moment(now).month();
    const initialYear = moment(now).year();

    const [month, setMonth] = useState<number>(initialMonth);
    const [year, setYear] = useState<number>(initialYear);

    const nextYaer = month >= 11 ? year + 1 : year;
    const prevYaer = month <= 0 ? year - 1 : year;

    const prevDaysList = onGetDaysByMonthAndYear(
        onHandleMonth(month - 1, "-"),
        prevYaer
    );
    const days = onGetDaysByMonthAndYear(month, year);
    const nextDaysList = onGetDaysByMonthAndYear(
        onHandleMonth(month + 1, "+"),
        nextYaer
    );

    const weekdays = moment.weekdaysShort();

    const onReduceYear = () => {
        setYear((prev) => prev - 1);
    };

    const onArraiseYear = () => {
        setYear((prev) => prev + 1);
    };

    const onReduceMonth = () => {
        setMonth((prev) => onHandleMonth(prev - 1, "-"));
        if (month <= 0) {
            onReduceYear();
        }
    };

    const onArraiseMonth = () => {
        setMonth((prev) => onHandleMonth(prev + 1, "+"));
        if (month >= 11) {
            onArraiseYear();
        }
    };

    const isDisbleadReduce = false
    const isDisbleadArraise = false

    return (
        <div className={style.container}>
            <div className={style.control}>
                {/* <Control
                    onReduce={onReduceYear}
                    onArraise={onArraiseYear}
                    value={moment(`${year}`, "Y").format("YYYY")}
                /> */}
                <Control
                    onReduce={onReduceMonth}
                    onArraise={onArraiseMonth}
                    value={moment(`${month + 1}`, "M").format("MMMM")}
                    isDisbleadReduce={isDisbleadReduce}
                    isDisbleadArraise={isDisbleadArraise}
                />
            </div>
            <div className={style.days}>
                <Days
                    weekdays={weekdays}
                    daysList={days}
                    prevDaysList={prevDaysList}
                    nextDaysList={nextDaysList}
                    slots={slots}
                />
            </div>
        </div>
    );
};
