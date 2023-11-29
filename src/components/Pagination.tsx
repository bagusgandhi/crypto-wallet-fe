import React from 'react'
import { Button } from 'antd';
import { debounce } from 'lodash';

interface PaginationProps {
    onPrevPage: () => void;
    onNextPage: () => void;
    page: number;
    totalPage: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ onPageChange, totalPage, page, onPrevPage, onNextPage }) => {

    const handleInputChange = debounce(
        (newPage: number) => {
            onPageChange(newPage);
        }, 300
    );

    return (
        <>
            <div className="text-center mt-[40px] flex gap-4 items-center justify-center">
                <Button disabled={page <= 1} onClick={() => onPrevPage()}>Previous</Button>
                <span>Page <input min={1} max={totalPage} disabled={false} value={page} onChange={() => handleInputChange} type="number" className='!w-[64px] bg-slate-100 rounded text-center' /> of {totalPage}</span>
                <Button disabled={totalPage >= page} onClick={() => onNextPage()}>Next</Button>
            </div>
        </>
    )
}

export default Pagination;
