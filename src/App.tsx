import { useState } from "react";
import style from "./App.module.scss";
import { CalendarDatePicker } from "./CalendarDatePicker/CalendarDatePicker";
import moment from "moment";

const slots = [
    "2023-09-24T08:00:00+04:00",
    "2023-12-25T08:00:00+04:00",
    "2025-09-25T08:00:00+04:00",
    "2023-11-15T08:00:00+04:00",
    "2023-10-07T10:30:00+04:00",
    "2023-10-10T10:30:00+04:00",
    "2023-10-16T10:30:00+04:00",
    "2023-10-16T12:30:00+04:00",
    "2023-10-24T08:30:00+04:00",
    "2023-10-24T09:00:00+04:00",
    "2023-10-24T17:30:00+04:00",
    "2023-10-28T00:00:00+04:00",
    "2023-10-28T00:30:00+04:00",
    "2023-10-28T10:00:00+04:00",
    "2023-10-28T23:30:00+04:00",
    "2023-09-30T14:00:00+04:00",
    "2023-09-30T17:00:00+04:00",
    "2023-09-28T08:30:00+04:00",
    "2023-09-28T09:00:00+04:00",
    "2023-09-28T09:30:00+04:00",
    "2023-09-28T17:00:00+04:00",
    "2023-11-28T17:00:00+04:00",
    "2023-12-28T17:00:00+04:00",
    "2024-01-28T17:00:00+04:00",
    "2026-01-28T17:00:00+04:00",
];

function App() {
    const [chosenDate, setChosenDate] = useState<string | null>(null);
    const [show, setShow] = useState<boolean>(false);

    const onHandleChosenDate = (date: string | null) => {
        setChosenDate(date);
        setShow(false);
        // rest BL on ChosenDate...
    };

    const onHandlerCloseCalendar = () => {
        setShow(false);
    };

    return (
        <div className={style.container}>
            <CalendarDatePicker
                show={show}
                onClose={onHandlerCloseCalendar}
                slots={slots}
                chosenDate={chosenDate}
                onHandleChosenDate={onHandleChosenDate}
            />
            <div>
                <button onClick={() => setShow(true)}>click</button>
            </div>
            <div>
                {chosenDate ? (
                    <span>{moment(chosenDate).format("DD.MM.YYYY")}</span>
                ) : (
                    <span>Chose date</span>
                )}
            </div>
        </div>
    );
}

export default App;
