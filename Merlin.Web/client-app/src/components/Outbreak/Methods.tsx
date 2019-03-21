import * as React from 'react';
import Dropdown from '../common/Dropdown';
import TextInput from '../common/TextInput';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import * as Codes from '../../store/Code';
import * as utils from '../../utils/UIUtils';
import TextAreaInput from '../common/TextAreaInput';
import { defaults } from '../../utils/Global';
import { OutbreakCommonItems } from '../../store/Outbreak';
import * as OutbreakStore from '../../store/Outbreak';
import YesNoUnknown from '../common/YesNoUnknown';


type MethodProps = {
    methods: OutbreakStore.Methods,
    errors: any
} & typeof Codes.actionCreators
    & Codes.CodeState
    & OutbreakStore.OutbreakState
    & typeof OutbreakStore.actionCreators;

class Methods extends React.Component<MethodProps> {

    constructor(props: MethodProps) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    public async componentDidMount() {
        const { loadMethods, loadDropdown } = this.props;
        try {
            this.setState({ loading: true });
            await loadMethods();
            await loadDropdown(Codes.CodeType.studyDesigns);
            await loadDropdown(Codes.CodeType.investigationMethods);
            await loadDropdown(Codes.CodeType.regulatoryAgencies);
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {
        const { methods, errors, codes } = this.props;

        return <div>
            <div className="row" >
                <TextAreaInput
                    name={'caseDefinition'}
                    value={methods.caseDefinition}
                    label={'Outbreak Case Definition:'}
                    hideLabel={false}
                    placeholder={''}
                    isReadOnly={false}
                    onChange={this.onChange}
                    cols={12}
                    rows={5}
                    error={errors.caseDefinition}
                />
            </div>
            <div className="row" >
                <Dropdown
                    name={'studyDesigns'}
                    value={methods.studyDesigns}
                    label={'Primary Study Design:'}
                    hideLabel={false}
                    placeholder={''}
                    options={utils.getOptions(codes.OB_STUDY_DESIGN)}
                    cols={6}
                    isMulti={true}
                    onChange={this.onChange}
                    isReadOnly={false}
                    error={errors.studyDesigns}
                />
                <Dropdown
                    name={'investigationMethods'}
                    value={methods.investigationMethods}
                    label={'Investigation Methods:'}
                    hideLabel={false}
                    placeholder={''}
                    options={utils.getOptions(codes.OB_INVESTIGATION)}
                    cols={6}
                    isMulti={true}
                    onChange={this.onChange}
                    isReadOnly={false}
                    error={errors.investigationMethods}
                />
            </div>
            <div className="row" >
                <div className="col-md-6">
                    <TextAreaInput
                        name={'staffConsulted'}
                        value={methods.staffConsulted}
                        label={'State Office Staff Consulted:'}
                        hideLabel={false}
                        placeholder={''}
                        isReadOnly={false}
                        onChange={this.onChange}
                        rows={5}
                        maxLength={200}
                        error={errors.staffConsulted}
                    />
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <Dropdown
                            name={'regulatoryAgencies'}
                            value={methods.regulatoryAgencies}
                            label={'Regulatory Agencies Contacted:'}
                            hideLabel={false}
                            placeholder={''}
                            options={utils.getOptions(codes.OB_REGULATORY)}
                            isMulti={true}
                            onChange={this.onChange}
                            isReadOnly={false}
                            cols={12}
                            error={errors.regulatoryAgencies}
                        />
                        <TextInput
                            name={'investigator'}
                            value={methods.investigator}
                            label={'Primary Investigator:'}
                            hideLabel={false}
                            placeholder={''}
                            isReadOnly={false}
                            onChange={this.onChange}
                            cols={12}
                            error={errors.investigator}
                            maxLength={70}
                        />
                    </div>
                </div>
            </div>
        </div>;
    }

    private onChange(name: string, newValue: any) {
        const methods = Object.assign({}, this.props.methods) as any;

        methods[name] = newValue;

        this.props.updateMethods(methods);
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            codes: state.codes.codes,
            methods: state.outbreak.methods
        };
    },
    Object.assign(Codes.actionCreators, OutbreakStore.actionCreators)
)(Methods);
