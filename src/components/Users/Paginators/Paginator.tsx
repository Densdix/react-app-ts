import React from "react";
import s from "../Users.module.css";

type PropsType = {
    pages: Array<number>
    currentPage: number
    updateCurrentPage: (pageNumber: number) => void
}

const Paginator: React.FC<PropsType> = ({pages, currentPage, updateCurrentPage}) => {

    let curP = currentPage
    let curPF = ((curP - 5) < 0) ? 0 : curP - 5
    let curPL = curP + 5
    let slicedPages = pages.slice(curPF, curPL)

    return(
        <div>
            {slicedPages.map(p => {
                return <span onClick={() => updateCurrentPage(p)}
                             className={`${s.tab} ${currentPage === p ? s.activeTab : ''}`}>{p}</span>
            })}
        </div>
    )
}

export default Paginator