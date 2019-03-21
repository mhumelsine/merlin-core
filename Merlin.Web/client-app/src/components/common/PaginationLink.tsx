import * as React from 'react';

type PaginationLinkProps = {
    page: number;
    selected: boolean;
    onClick: (page: number) => void;
};

export default class PaginationLink extends React.Component<PaginationLinkProps, {}> {
    public render() {
        const { selected, onClick, page } = this.props;

        return <li className={`page-item ${selected ? 'active' : ''} ${selected ? 'disabled' : ''}`}>

            <button
                type="button"
                className={`page-link ${selected ? 'active' : ''}`}
                disabled={selected}
                onClick={() => onClick(page)}>
                {page}
            </button>

        </li>;
    }
}
