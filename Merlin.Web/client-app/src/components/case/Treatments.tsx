import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import * as CaseState from '../../store/Case';
import Loading from '../common/Loading';
import EditListItem from '../common/EditListItem';
import YesNo from '../common/YesNo';
import TreatmentItem from './TreatmentItem';
import { FaPlusCircle } from 'react-icons/fa';
import { defaults } from '../../utils/Global';

type TreatmentsProps = {
    caseId: number;
    treatments: CaseState.TreatmentItem[];
} & typeof CaseState.actionCreators;

class Treatments extends React.Component<TreatmentsProps> {
    state = {
        isLoading: defaults.boolean,
        wasAntibioticGiven: defaults.boolean
    };

    constructor(props: TreatmentsProps) {
        super(props);
        this.onTreatmentToggle = this.onTreatmentToggle.bind(this);
        this.onAddTreatment = this.onAddTreatment.bind(this);
        this.onRemoveTreatment = this.onRemoveTreatment.bind(this);
        this.onChangeTreatment = this.onChangeTreatment.bind(this);
    }

    public render() {
        const { treatments } = this.props;
        const { isLoading, wasAntibioticGiven } = this.state;
        const fontSize = 15;

        if (isLoading) {
            return <Loading />;
        }

        return <div>

           <YesNo
              name={'treatmentsToggle'}
              label={'Were antibiotic given?'}
              value={wasAntibioticGiven ? 'YES' : 'NO'}
              hideLabel={false}
              onChange={this.onTreatmentToggle}
             />

        {wasAntibioticGiven &&
            <div className={'card'}>
                <div className={'card-header'}>
                <div className="text-center"> <h4> Antibiotics </h4> </div>
                 <button
                    type="button"
                    title="Add"
                    className="btn btn-outline-success btn-roundp"
                    style={{position: 'absolute', top: '.5rem', right: '.5rem'}}
                    onClick={this.onAddTreatment}
                >
                    <FaPlusCircle fontSize={fontSize} />
                </button>

                </div>
                <div className="card-body">
                    {treatments.length > 0 && treatments.map(item => {
                        return <ul key={item.treatmentId} className="list-group list-group-flush">
                            <li className="list-group-item" style={{border: '1px solid lightgray', padding: '15px', marginBottom: '10px'}}>
                            <EditListItem
                                key={item.treatmentId}
                                id={item.treatmentId.toString()}
                                type={'Treatments'}
                                isEditable={false}
                                onEdit={() => {}}
                                onRemove={this.onRemoveTreatment}
                            >
                                <TreatmentItem
                                    key={item.treatmentId}
                                    onChangeTreatment={this.onChangeTreatment}
                                    treatmentItem={item}
                                />
                            </EditListItem>
                            </li>
                        </ul>;
                    })}
                </div>
            </div>
        }
        </div>;
    }

    private onTreatmentToggle() {
        this.setState({wasAntibioticGiven: !this.state.wasAntibioticGiven});
    }

    private onChangeTreatment(treatmentEdited: any) {
       this.props.editTreatment(treatmentEdited);
    }

    private onAddTreatment(event: any) {
        let newItem = {} as CaseState.TreatmentItem;

        this.props.addTreatment(newItem);
    }

    private onRemoveTreatment(treatmentId: any, type: any) {
         this.props.removeTreatment(treatmentId);
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            caseId: state.case.caseDetails.caseId,
            treatments: state.case.treatments
        };
    },
    CaseState.actionCreators
)(Treatments);
