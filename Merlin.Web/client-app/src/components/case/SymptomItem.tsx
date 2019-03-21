import * as React from 'react';
import { CaseSymptom } from '../../store/Case';
import YesNo, { HorizontalYesNo } from '../common/YesNo';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import CustomDatePicker from '../common/CustomDatePicker';
import Dropdown from '../common/Dropdown';
import * as CodeStore from '../../store/Code';
import { defaults } from '../../utils/Global';
import { getOptions } from '../../utils/UIUtils';


type SymptomItemProps= {
    symptom: CaseSymptom,
    codes :CodeStore.DropdownCode[]
}  &typeof CodeStore.actionCreators


class SymptomItem extends React.Component<SymptomItemProps> {
    state = {
        symptom: this.props.symptom,
        hasSymptom: (this.props.symptom.hasSymptom) ? this.props.symptom.hasSymptom :defaults.boolean
    }

    constructor(props: SymptomItemProps) {
        super(props);
        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.onhasSymptomChange = this.onhasSymptomChange.bind(this);
    }

    public async componentWillMount() {
        await this.props.loadDropdown(CodeStore.CodeType.onsettime);   

    }


    private onhasSymptomChange() {

        let newState = Object.assign({}, this.state);

        newState.hasSymptom = !this.state.hasSymptom
        if (this.state.hasSymptom) {
            newState.symptom.onsetDate = defaults.string;
            newState.symptom.onsetTime = defaults.string;
        }

        this.setState(newState);
    }

    private onDropdownChange(name: string, newValue: any) {
        let newState = Object.assign({}, this.state);
        (newState.symptom as any)[name] = newValue;
        this.setState(newState);
    }

    private onsetDate() {
        const { onsetDate } = this.state.symptom;
        
        return <CustomDatePicker
            name={"onsetDate"}
            value={onsetDate}
            placeholder={"select date"}
            cols={12}
            label="Start Date"
            hideLabel={true}
            isReadOnly={!(this.state.hasSymptom) }
            onChange={this.onDropdownChange}
        />;
    } 

    private onsetTime() {
        const { onsetTime } = this.state.symptom;
        return  <Dropdown
            cols={12}
            label={""}
            hideLabel={true}
            name={"onsetTime"}
            value={onsetTime}
            options={getOptions(this.props.codes)}
            placeholder={"select time"}
            onChange={this.onDropdownChange}
            isReadOnly={!(this.state.hasSymptom)}
            isMulti={false}
            error={""}
        />;
    }
    private symptom() {
        const { symptomCode, symptomName, hasSymptom } = this.state.symptom;

        return <HorizontalYesNo
            name={symptomCode}
            label={symptomName}
            value={hasSymptom ? "YES" : "NO"}
            hideLabel={false}
            onChange={this.onhasSymptomChange}
            labelCols={6}
            inputCols={4}
        />
    }


    public render() {

        const { other} = this.state.symptom;
        return <tr>
                <td data-title="Symptom"> {this.symptom()}  </td>
                <td data-title="Other">{other}</td>
                <td data-title="Onset Date">{this.onsetDate()}</td>
                <td data-title="Time"> {this.onsetTime()}</td>
              </tr>;
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            codes: state.codes.codes.TIME
        };
    },
    CodeStore.actionCreators
)(SymptomItem);


