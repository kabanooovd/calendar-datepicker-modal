import { ReactNode, useEffect, useMemo } from "react"
import { createPortal } from "react-dom"

import style from './Wrapper.module.scss'

interface IProps {
    show: boolean
    children: ReactNode
}

const modalRootElement = document.querySelector('#calendar_datepicker')

export const Wrapper = (props: IProps) => {
    const { children, show } = props

    const element = useMemo(() => document.createElement('div'), [])

    useEffect(() => {
        if (show) {
            modalRootElement?.appendChild(element)
            return () => {
                modalRootElement?.removeChild(element)
            }
        }
    }, [show, element])

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [show])

    return createPortal(
        <div>
            <div className={style.container}>{children}</div>
        </div>,
        element
    )


}