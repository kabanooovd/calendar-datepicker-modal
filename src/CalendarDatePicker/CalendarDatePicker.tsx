import moment, { Moment } from "moment";
import style from "./CalendarDatePicker.module.scss";
import { useState } from "react";
import { Control } from "./Control/Control";
import { Days } from "./Days/Days";
import {
    onHandleMonth,
    onGetDaysByMonthAndYear,
    onGetBaseSlotParams,
} from "./helper";
import { Wrapper } from "./Wrapper/Wrapper";

interface IProps {
    show: boolean;
    onClose: () => void;
    slots: string[];
    chosenDate: any | null;
    onHandleChosenDate: (date: string | null) => void;
}

export const CalendarDatePicker = (props: IProps) => {
    const { slots, chosenDate, onHandleChosenDate, show, onClose } = props;

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

    const { maxMonth, minMonth, maxYear, minYear } = onGetBaseSlotParams(slots);

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
    const isDisbleadReduce = minMonth === month && minYear === year;
    const isDisbleadArraise = maxMonth === month && maxYear === year;

    return (
        <Wrapper show={show}>
            <div className={style.container}>
                <div className={style.closeBtn} onClick={onClose}>
                    x
                </div>
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
                <div>
                    <Days
                        onHandleChosenDate={onHandleChosenDate}
                        chosenDate={chosenDate}
                        weekdays={weekdays}
                        daysList={days}
                        prevDaysList={prevDaysList}
                        nextDaysList={nextDaysList}
                        slots={slots}
                    />
                </div>
            </div>
        </Wrapper>
    );
};
