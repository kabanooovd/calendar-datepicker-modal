import style from "./Control.module.scss";

interface IProps {
    value: string;
    onReduce: () => void;
    onArraise: () => void;
    isDisbleadReduce: boolean;
    isDisbleadArraise: boolean;
}

export const Control = (props: IProps) => {
    const {
        onReduce,
        onArraise,
        value,
        isDisbleadArraise = false,
        isDisbleadReduce = false,
    } = props;
    return (
        <div className={style.container}>
            <div onClick={onReduce}>
                {isDisbleadArraise ? null : <>&#10092;</>}
            </div>
            <div>{value}</div>
            <div onClick={onArraise}>
                {isDisbleadReduce ? null : <>&#10093;</>}
            </div>
        </div>
    );
};
