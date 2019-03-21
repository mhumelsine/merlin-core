import * as React from 'react';
import { HealthCareVisit } from '../../store/Case';
import { MdArrowForward } from 'react-icons/md';

interface HealthCareVisitProps {
    visit: HealthCareVisit;
}

export default class HealthCareVisitItem extends React.Component<HealthCareVisitProps> {
    public render() {

        const { visit } = this.props;

        return <a href="#" className="list-group-item list-group-item-action">

            <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-1">{visit.hospitalName}</h5>
                <div>
                    <span className="badge badge-pill badge-info">{visit.visitType}</span>
                    {' '}
                    <span className="badge badge-pill badge-info">{visit.visitStartedOn || '?'} - {visit.visitEndedOn || '?'}</span>
                </div>
                <MdArrowForward fontSize={30} />
            </div>
        </a>;
    }
}


