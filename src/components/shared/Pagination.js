import React from 'react'

import './pagination.css'

const Pagination = (props) => {
    let maxPages = props.maxPages;
    let currentPage = props.currentPage;
    return (
        <div className="paginationContainer">
            <div className="paginator">
                {
                    [...Array(maxPages)].map((e, i) => {
                        let page = i + 1;
                        return (
                            <div key={page} className={
                                page === currentPage ? 'page activePage' : 'page'
                            } onClick={() => { props.handleClick(page) }}>{page}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Pagination;



// for (let i = 1; i < maxPages + 1; i++) {
//     // Runs 5 times, with values of step 0 through 4.
//     console.log('Walking east one step');
// }


// <div className="page activePage">1</div>
// <div className="page">2</div>
// <div className="page">3</div>
// <div className="page">4</div>
// <div className="page">5</div>