import * as React from 'react';

import Pagination from './Pagination';
import Loading from './Loading';
import { Paging } from '../../store/SurveySearch';
import { FaExclamationTriangle } from 'react-icons/fa';
import Alert from './Alert';
import { FontSize } from '../../utils/Global';

interface PagedListProps {
    isLoading: boolean;
	maxHeight?: string;
	fontSize?: FontSize;
	hideNumbersFound?: boolean;
    paging: Paging;
    noResultsMessage?: any;
    onPageChange: (page: number) => void;
}

export default function asPagedList(
    WrappedComponent: any,
    title: string,
    isLoadingAccessor: (props: any) => boolean,
    pagingAccessor: (props: any) => Paging,
    onPageChangedAccessor: (props: any) => (page: number) => void) {

    return class extends React.Component<any> {
        public render() {
            const isLoading = isLoadingAccessor(this.props);
            const paging = pagingAccessor(this.props);
            const onPageChange = onPageChangedAccessor(this.props);

			         const { maxHeight, className, noResultsMessage, fontSize, hideNumbersFound} = this.props;

            // handle no results found
            if (!isLoading && paging.totalItems === 0) {
                if (noResultsMessage) {
                    return noResultsMessage;
                }

                return <Alert alertType="warning">
                    <FaExclamationTriangle /> No results found
                </Alert>;
            }

            // see if we want a max height
            let style = {} as any;

            if (maxHeight) {
                style.maxHeight = maxHeight;
                style.overflowY = 'scroll';
                style.padding = '5px';
                style.margin = '-5px';
			}
			         console.log(this.props);
            return <div className={className}>

                {isLoading && <Loading />}

                <div className="row">
                    <div className="col">
						{!hideNumbersFound &&
						<h2>
							{title}
							<small className="text-muted"> {paging.totalItems} results found</small>
						</h2>
						}
                    </div>
                    <div className="col">
                        <Pagination
                            paging={paging}
                            onPageChange={onPageChange}
                            isTop={true}
                        />
                    </div>
                </div>

                <div className="list" style={style}>
                    <WrappedComponent {...this.props} />
                </div>

                <div className="row">
                    <div className="col-sm-3 offset-sm-9">
                        <Pagination
                            paging={paging}
                            onPageChange={onPageChange}
                            isTop={false}
                        />
                    </div>
                </div>
            </div>;
        }
    };
}
