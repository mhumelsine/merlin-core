import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { FaRegSave } from 'react-icons/fa';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import * as SurveyStore from '../../store/Survey';
import TextInput from '../common/TextInput';
import * as CodeStore from '../../store/Code';
import CustomDatePicker from '../common/CustomDatePicker';
import BackButton from '../common/BackButton';
import { defaults } from '../../utils/Global';
import SurveyTypeControl from './SurveyTypeControl';
import Loading from '../common/Loading';
import { diseaseSurveyTypesArray, outbreakSurveyTypesArray } from '../../store/Code';
import ErrorSummary from '../common/ErrorSummary';
import AddButton from '../common/AddButton';

type SurveyCreateProps =
& typeof SurveyStore.actionCreators
& CodeStore.CodeState
& typeof CodeStore.actionCreators
& RouteComponentProps<{}>;

class SurveyCreate extends React.Component<SurveyCreateProps, {}> {
    state = {
            isLoading: defaults.boolean,
            layoutId: defaults.string,
            name: defaults.string,
            icd9Code: defaults.string,
            outbreakId: defaults.number,
            effectiveDate: defaults.effectiveDate,
            surveyType: defaults.string,
            errors: {} as any
    };
    constructor(props: SurveyCreateProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    public componentWillMount() {
       const { layoutId } = this.props.match.params as any;
       this.setState({layoutId: layoutId});
    }

    public componentDidMount() {
		document.title = defaults.titles.CreateSurveyPage;
    }

    public render() {
        const { surveyNameInput } = defaults.inputs.textInputs;
        const { effectiveDateInput } = defaults.inputs.datePickers;
        const {  history } = this.props;
        const { isLoading , icd9Code, effectiveDate, name, surveyType, outbreakId, errors } = this.state;

        if (isLoading) {
            return <Loading />;
        }

        return <div>
             {(Object.keys(errors).length > 0) &&
                        <ErrorSummary
                            errors={errors}
                        />}
             <div className="row">
                <div className="col-md-8 offset-md-2">
					<h1>Create Survey</h1>
                        <form>
                            <div className="row">
                                <TextInput
                                    name={surveyNameInput.name}
                                    label={surveyNameInput.label}
                                    value={name}
                                    hideLabel={false}
                                    cols={6}
                                    onChange={this.onChange}
                                />
                            </div>

                            <SurveyTypeControl
                                icd9Codes={icd9Code}
                                surveyType={surveyType}
                                outbreakIds={outbreakId}
                                onChange={this.onChange}
                                isMulti={false}
                            />

                            <div className="row">
                                <CustomDatePicker
                                    cols={6}
                                    label={effectiveDateInput.label}
                                    hideLabel={false}
                                    name={effectiveDateInput.name}
                                    value={effectiveDate}
                                    placeholder={effectiveDateInput.placeholder}
                                    onChange={this.onChange}
                                    isReadOnly={false}
                                />
                            </div>
                            <div className="form-group">
                                <BackButton
                                    goBack={history.goBack}
                                    className="btn-space-right"
                            />
                            <AddButton onClick={this.onSave} buttonText=" Create" />
                            </div>
                        </form>
                </div>
            </div>
        </div>;
    }

    private async onSave(event: any) {
        event.preventDefault();
        try {
            this.setState({ isLoading: true });
            await this.props.saveSurvey(this.state);
        } catch (e) {
            this.setState({ errors: e });
        } finally {

            this.setState(
                { isLoading: false },
                () => this.props.history.goBack()
                );
        }
    }

    private getDescription(array: CodeStore.DropdownCode[], value: any): string {
        const results = array.find(item => item.code === value);

        if (results) {
            return results.description;
        }
        return defaults.string;
    }

    private onChange(controlName: string, newValue: any) {
        const { surveyTypeInput, outbreakInput, diseaseCodeInput } = defaults.inputs.dropdowns;
        const { codes } = this.props;
        const { surveyType} = this.state;
        let newState = Object.assign({}, this.state);

        (newState as any)[controlName] = newValue;

        if (controlName === surveyTypeInput.name) {
           if (diseaseSurveyTypesArray.indexOf(newValue) >= 0) {
                newState.outbreakId = defaults.number;
           } else if (outbreakSurveyTypesArray.indexOf(newValue) >= 0) {
                newState.icd9Code = defaults.string;
           } else {
            newState.outbreakId = defaults.number;
            newState.icd9Code = defaults.string;
           }
           newState.name = defaults.string;
        } else if (controlName === diseaseCodeInput.name || controlName === outbreakInput.name) {
            const surveyTypeDescription = this.getDescription(codes.DYN_SURVEY_TYPE, surveyType);
            newState.name = `${surveyTypeDescription} - ${this.getDescription(codes[(controlName == outbreakInput.name ? CodeStore.CodeType.outbreak :  CodeStore.CodeType.icd9)], newValue)}`;
        }
        this.setState(newState);
    }
}
export default connect(
    (state: ApplicationState) => Object.assign({}, state.codes),
    Object.assign({}, CodeStore.actionCreators, SurveyStore.actionCreators)
)(SurveyCreate);
