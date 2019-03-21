import * as React from 'react';
import { ApplicationState } from '../../store/index';
import { defaults } from '../../utils/Global';
import { VaccineHistory } from '../../store/Case';
import DeleteButton from '../common/DeleteButton';
import EditButton from '../common/EditButton';

type VaccinationHistItemProps = {
    vaccineHist: VaccineHistory
    onDelete: (vaccineID: number) => void;
    onEdit: (vaccineHistoryItem: VaccineHistory) => void
};


export default class VaccinationHistItem extends React.Component<VaccinationHistItemProps> {

    public render() {

        const { vaccineType, dateGiven, manufacturer, doseNumber, lotNumber } = this.props.vaccineHist;

        return <tr>
                    <td data-title="VaccineType"> {vaccineType}  </td>
                    <td data-title="Date Given">{dateGiven}</td>
                    <td data-title="Manufacturer">{manufacturer}</td>
                    <td data-title="Lot Number"> {lotNumber}</td>
                    <td data-title="Dose Number"> {doseNumber}</td>
                    <td data-title="Action"> {this.actions()}</td>
              </tr>;

    }


    private actions() {
        const { onDelete, onEdit } = this.props;
        return <div> <DeleteButton onClick={() => onDelete(this.props.vaccineHist.vaccineID)}/>
                     {' '}
                    <EditButton onClick={() => onEdit(this.props.vaccineHist)}/>
               </div>;

    }
}



