import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import {FaEdit } from 'react-icons/fa';
import BackButton from '../common/BackButton';
import * as SurveyStore from '../../store/Survey';
import * as SurveySearchStore from '../../store/SurveySearch';
import { ApplicationState } from '../../store/index';
import { connect } from 'react-redux';
import TextInput from '../common/TextInput';
import Dropdown from '../common/Dropdown';
import { ChangeEvent } from 'react';
import CustomDatePicker from '../common/CustomDatePicker';
import Moment from 'moment';
import AffectedSurveysList from './AffectedSurveysList';
import Alert from '../common/Alert';
import ErrorSummary from '../common/ErrorSummary';
import { FaCheck } from 'react-icons/fa';
import Loading from '../common/Loading';
import { defaults } from '../../utils/Global';
import * as CodeStore from '../../store/Code';
import SurveyTypeControl from './SurveyTypeControl';
import { Layout } from '../../store/Layout';
import SaveButton from '../common/SaveButton';

type SurveyEditProps =
    SurveyStore.SurveyState
    & CodeStore.CodeState
    & typeof CodeStore.actionCreators
    & typeof SurveyStore.actionCreators
    & RouteComponentProps<{}>;

class SurveyEdit extends React.Component<SurveyEditProps, {}> {
    state = {
        survey: {
            surveyIdNumber: defaults.string,
            surveyType: defaults.string,
            surveyId: defaults.guid,
            description: defaults.string,
            name: defaults.string,
            icd9: defaults.string,
            icd9Description: defaults.string,
            effectiveDate: defaults.string,
            layoutId: defaults.guid,
            layoutDescription: defaults.string,
            outbreakId: defaults.number,
            outbreakDescription: defaults.string
        } as SurveyStore.Survey,
        errors: {} as any,
        saveSuccessful: defaults.boolean,
        isLoading: defaults.boolean
    };
    input: any = undefined;
    initialLoad: boolean = true;


    constructor(props: SurveyEditProps) {
        super(props);
        this.state.survey = props.survey;
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentWillMount() {
        try {
            const {surveyId} = this.props.match.params as any;

            if (surveyId !== this.props.survey.surveyId) {
                this.setState({ isLoading: true });
                this.props.requestSurveyAndLayout(surveyId, this.props.history);
                this.props.requestAffectedSurveys(surveyId, 1, this.props.history);
            }
        } catch (e) {
            console.log(e);
        }
    }

    componentWillReceiveProps(newProps: SurveyEditProps) {
        if (newProps.survey != this.state.survey) {
            const newState = Object.assign({}, this.state);
            newState.survey = newProps.survey;

            if (newState.survey === undefined || newState.survey.effectiveDate === defaults.string) {
                newState.survey.effectiveDate = defaults.effectiveDate;
            }
            newState.isLoading = defaults.boolean;
            this.setState(newState);
        }
    }

    componentDidUpdate() {
        if (this.input !== undefined && this.initialLoad) {
            this.input.focus();
            this.initialLoad = false;
        }
    }

    public render() {
        const { history, codes, loadDropdown } = this.props;
        const { errors, survey, saveSuccessful, isLoading } = this.state;
        const { surveyTypeInput, outbreakInput, diseaseCodeInput, layoutDescriptionInput } = defaults.inputs.dropdowns;
        const { surveyNameInput, surveyDescriptionInput } = defaults.inputs.textInputs;
        const { effectiveDateInput } = defaults.inputs.datePickers;

        if (isLoading) {
            return <Loading />;
        }

        return <div>
            <h1 className="display-1">Edit Survey</h1>
            {(Object.keys(errors).length > 0) &&
                <ErrorSummary
                    errors={errors}
                />}
            {saveSuccessful &&
                <Alert alertType="success">
                    {'Survey saved!'}
                </Alert>
            }
            <div className="row">
                <div className="col-md-6">
                    <form>
                        {/* <SurveyTypeControl
                            history={this.props.history}
                            survey_Type={survey.surveyType}
                            icd9={survey.icd9}
                            outbreakId={survey.outbreakId}
                            codes={codes}
                            isLoading={false}
                            loadDropdown={loadDropdown}
                            onChange={() => { }}
                            isReadOnly={true}
                            errors={errors}
                        /> */}
                        <Dropdown
                            label={layoutDescriptionInput.label}
                            hideLabel={false}
                            name={layoutDescriptionInput.name}
                            value={survey.layoutDescription || defaults.string}
                            options={[{ value: survey.layoutDescription, label: survey.layoutDescription }]}
                            placeholder={layoutDescriptionInput.placeholder}
                            onChange={this.onChange}
                            isMulti={false}
                            isReadOnly={true}
                        />
                        <TextInput
                            label={surveyNameInput.label}
                            hideLabel={false}
                            name={surveyNameInput.name}
                            value={survey.name}
                            placeholder={surveyNameInput.placeholder}
                            onChange={this.onChange}
                            inputRef={(input: any) => { this.input = input; }}
                            isReadOnly={false}
                            error={errors[surveyNameInput.name]}
                        />
                        <TextInput
                            label={surveyDescriptionInput.label}
                            hideLabel={false}
                            name={surveyDescriptionInput.name}
                            value={survey.description || defaults.string}
                            placeholder={surveyDescriptionInput.placeholder}
                            onChange={this.onChange}
                            inputRef={(input: any) => { }}
                            isReadOnly={false}
                            error={errors[surveyDescriptionInput.name]}
                        />
                        <div className="row">
                            <CustomDatePicker
                                cols={6}
                                label={effectiveDateInput.label}
                                hideLabel={false}
                                name={effectiveDateInput.name}
                                value={survey.effectiveDate}
                                placeholder={effectiveDateInput.placeholder}
                                onChange={this.onChange}
                                isReadOnly={false}
                                error={errors[effectiveDateInput.name]}
                            />
                        </div>
                        <div className="form-group">
                            <BackButton
                                goBack={history.goBack}
                                className="btn-space-right"
                            />
                            <SaveButton onClick={this.onSave} className={'btn-space-right'} />
                            <Link className="btn btn-info" to={`${defaults.urls.layoutEditUrl}/${survey.surveyId}`}><FaEdit fontSize={15} style={{ paddingRight: '5px' }}/>Edit Layout</Link>
                        </div>
                    </form>
                </div>

                <div className="col-md-6">
                    <AffectedSurveysList
                        {...this.props}
                        className="form-group col-sm-12"
                        surveyId={survey.surveyId}
                        maxHeight="400px"
                        noResultsMessage={
                            <Alert alertType="success">
                                <FaCheck /> No other surveys use this layout
                            </Alert>
                        }
                    />
                </div>
            </div>
        </div>;
    }

    private onChange(name: string, newValue: any) {
        const newState = Object.assign({}, this.state);
        (newState.survey as any)[name] = newValue;
        this.setState(newState);
    }

    private onSave(event: any) {
        event.preventDefault();
        this.setState({ isLoading: true });
        (this.props.updateSurvey(this.state.survey) as any)
            .then((res: any) => this.setState({ saveSuccessful: true, isLoading: defaults.boolean }))
            .catch((errors: any) => this.setState({ errors, isLoading: defaults.boolean }));
    }
}
export default connect(
    (state: ApplicationState) => Object.assign({}, state.survey),
    Object.assign({}, SurveyStore.actionCreators)
)(SurveyEdit);
