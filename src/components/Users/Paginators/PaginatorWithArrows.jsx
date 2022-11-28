import React from "react";
import s from "../Users.module.css";

import leftArrow from "./images/icons8-налево-96.png"
import rightArrow from "./images/icons8-направо-96.png"
import doubleLeftArrow from "./images/icons8-двойная-стрелка-влево-96.png"
import doubleRightArrow from "./images/icons8-двойная-стрелка-вправо-96.png"

const PaginatorWithArrows = ({pages, currentPage, updateCurrentPage}) => {

    let curP = currentPage
    let curPF = ((curP - 5) < 0) ? 0 : ((curP + 5) > pages.length) ? pages.length - 10 : curP - 5 //4323 - 5 = 4318
    let curPL = ((curP - 5) < 0) ? 10 : ((curP + 5) > pages.length) ? pages.length : curP + 5 //4323 + 5 = 4328
    let slicedPages = pages.slice(curPF, curPL)

    return(
        <div>
            <span><button className={s.arrowBtn} disabled={currentPage === 1} onClick={() => updateCurrentPage(1)}>{`<<`}</button></span>
            <span><button className={s.arrowBtn} disabled={currentPage === 1} onClick={() => updateCurrentPage(curP - 1)}>{`<`}</button></span>
            {slicedPages.map(p => {
                return(
                    <span onClick={() => updateCurrentPage(p)}
                          className={`${s.tab}`}>
                    {<span className={`${s.cell} ${currentPage === p && s.activeTab} `}>{p}</span>}
                </span>
                )
            })}
            <span><button className={s.arrowBtn} disabled={currentPage === pages.length} onClick={() => updateCurrentPage(curP + 1)}>{`>`}</button></span>
            <span><button className={s.arrowBtn} disabled={currentPage === pages.length} onClick={() => updateCurrentPage(pages.length)}>{`>>`}</button></span>
        </div>
    )
}

export default PaginatorWithArrows