import React from 'react';
import classnames from 'classnames';
import { useState, useEffect} from 'react';
//import { usePagination} from './usePagination';

export default function Pagination(onPageChange, totalCount, siblingCount = 2, currentPage, pageSize, className) {
    const [paginationRange, setPaginationRange] = useState([]);
    const DOTS = '...'

    const range = (start, end) => {
        let length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
    };
    useEffect(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);

        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) {
            setPaginationRange(range(1, totalPageCount));
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            setPaginationRange([...leftRange, DOTS, totalPageCount]);
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {

            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );
            setPaginationRange([firstPageIndex, DOTS, ...rightRange]);
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            setPaginationRange([firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]);
        }
    }, [totalCount, pageSize, siblingCount, currentPage]);

    // if (currentPage === 0 || paginationRange.length < 2) {
    //     return null;
    // }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
                  <ul
                className={classnames('pagination-container', { [className]: className })}
            >
             {}
                <li
                    className={classnames('pagination-item', {
                        disabled: currentPage === 1
                    })}
                    onClick={onPrevious}
                >
                    <div className="arrow left" />
                </li>
                {paginationRange.map(pageNumber => {

                    if (pageNumber === DOTS) {
                        return <li className="pagination-item dots">&#8230;</li>;
                    }

                    return (
                        <li
                            className={classnames('pagination-item', {
                                selected: pageNumber === currentPage
                            })}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </li>
                    );
                })}
                {}
                <li
                    className={classnames('pagination-item', {
                        disabled: currentPage === lastPage
                    })}
                    onClick={onNext}
                >
                    <div className="arrow right" />
                </li>
            </ul>
        
    );
};