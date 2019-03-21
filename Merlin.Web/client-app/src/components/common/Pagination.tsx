import * as React from 'react';
import { Paging } from '../../store/SurveySearch';
import PaginationLink from './PaginationLink';

interface PaginationProps {
    paging: Paging;
    onPageChange: (newPage: number) => void;
    isTop: boolean;
}

const numberOfPageLinks = 5;

export default class Pagination extends React.Component<PaginationProps, {}> {

    constructor(props: PaginationProps) {
        super(props);
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
    }

    public render() {

        const { paging, isTop, onPageChange } = this.props;

        return <nav aria-label="Page navigation">
            <div className="clearfix">
                <ul className={`pagination pull-right ${isTop ? 'top' : 'bottom'}`}>

                    {paging.page > 1 &&

                        <li className={`page-item ${paging.page === 1 ? 'disabled' : ''}`}
                            style={{ 'display': 'inline-block' }}>
                            <button
                                disabled={paging.page === 1}
                                type="button"
                                className="page-link"
                                onClick={this.previous}>
                                Previous
                        </button>
                        </li>
                    }

                    {this.getPageNumbers().map(page =>
                        <PaginationLink
                            key={page}
                            page={page}
                            onClick={onPageChange}
                            selected={paging.page === page}
                        />)
                    }


                    {paging.page < paging.totalPages &&
                        <li className="page-item" style={{ 'display': 'inline-block' }}>
                            <button
                                disabled={paging.page === paging.totalPages}
                                type="button"
                                className="page-link"
                                onClick={this.next}>
                                Next
                    </button>
                        </li>
                    }
                </ul>
            </div>
        </nav>;
    }

    private previous() {
        this.props.onPageChange(this.props.paging.page - 1);
    }
    private next() {
        this.props.onPageChange(this.props.paging.page + 1);
    }
    private getPageNumbers() {
        const { page, totalPages } = this.props.paging;
        const pageSize = 10;

        const calculatedPage = (page % numberOfPageLinks === 0) ? (page - 1) : page;
        const seed = calculatedPage / numberOfPageLinks;

        const min = (Math.floor(seed) * numberOfPageLinks) + 1;
        let max = Math.ceil(seed) * numberOfPageLinks;

        max = Math.min(max, totalPages);

        let pages = [];
        let index = 0;

        for (let pageNumber = min; pageNumber <= max; pageNumber++) {
            pages[index] = pageNumber;
            index++;
        }

        return pages;
    }
}
