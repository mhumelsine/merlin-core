import * as React from 'react';
import { FaPlus } from 'react-icons/fa';
import * as LayoutStore from '../../store/Layout';
import { ControlType, layoutItemType } from '../../store/Layout';
import { defaults } from '../../utils/Global';

interface ControlListProps {
    canAddControl: (controlId: string) => boolean;
    onAdd: (parentId: string, item: LayoutStore.LayoutItem) => void;
    parentId: string;
};

export default class ControlList extends React.Component<ControlListProps> {

    constructor(props: ControlListProps) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    private onClick(event: any) {
        const { onAdd, parentId } = this.props;
        const name = event.currentTarget.name;

        onAdd(parentId, {
            type: layoutItemType.control,
            title:name,
            id: name,
            width: 12,
            activation: defaults.activation,
            validations: defaults.validations,
            groupAccess:[]
        });
    }

    private createItem(controlType: ControlType) {
        const { canAddControl } = this.props;

        return <li key={controlType} className="list-group-item">
            <div className="d-flex justify-content-between">
                {controlType}
                <button
                    className="btn btn-primary"
                    type="button"
                    title={`Add ${controlType} control`}
                    onClick={this.onClick}
                    name={controlType}
                    disabled={!canAddControl(controlType)}
                >
                    <FaPlus />{" "}Add
                </button>
            </div>
        </li>;
    }

    public render() {
		return <ul className="list-group"> 
            {this.createItem(ControlType.LabResults)}
            {this.createItem(ControlType.Symptoms)}
            {this.createItem(ControlType.HealthCareVisits)}
            {this.createItem(ControlType.TravelHistory)}
            {this.createItem(ControlType.VaccinationHistory)}
            {this.createItem(ControlType.LabSummary)}
            {this.createItem(ControlType.Epilinks)}
            {this.createItem(ControlType.Treatments)}
            {this.createItem(ControlType.OutbreakLabList)}
        </ul>;
    }
}