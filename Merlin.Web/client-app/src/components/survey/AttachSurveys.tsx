import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store/index';
import { defaults } from '../../utils/Global';
import Loading from '../common/Loading';
import TextInput from '../common/TextInput';
import * as CodeStore from '../../store/Code';
import * as SurveyStore from '../../store/Survey';
import BackButton from '../common/BackButton';
import { FaRegSave } from 'react-icons/fa';
import CustomDatePicker from '../common/CustomDatePicker';
import Dropdown from '../common/Dropdown';
import { getOptions } from '../../utils/UIUtils';
import ErrorSummary from '../common/ErrorSummary';
import SurveyTypeControl from './SurveyTypeControl';
import { diseaseSurveyTypesArray, outbreakSurveyTypesArray } from '../../store/Code';
import LayoutSurveyList from './layout/LayoutSurveyList';
import { Layout, actionCreators } from '../../store/Layout';
import AddButton from '../common/AddButton';

type AttachSurveysProps = {
    errors: any;
    layout: Layout
}
    & typeof SurveyStore.actionCreators
    & CodeStore.CodeState
    & typeof CodeStore.actionCreators
    & typeof actionCreators
    & RouteComponentProps<{}>;

class AttachSurveys extends React.Component<AttachSurveysProps> {
    state = {
        isLoading: false,
        name: defaults.string,
        icd9Code: [],
        outbreakId: [],
        effectiveDate: defaults.effectiveDate,
        surveyType: defaults.string,
        errors: {} as any
    };

    constructor(props: AttachSurveysProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onMultiSelectChange = this.onMultiSelectChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    public componentDidMount() {
        document.title = defaults.titles.AttachSurveys;
    }

    public componentWillReceiveProps(newProps: any) {
        if (!newProps.loadFailed) {
            this.setState({ isLoading: false });
        }
    }

    public render() {
        const { surveyNameInput } = defaults.inputs.textInputs;
        const { effectiveDateInput } = defaults.inputs.datePickers;
        const { history, layout } = this.props;
        const { isLoading, icd9Code, effectiveDate, name, surveyType, outbreakId, errors } = this.state;
        const { diseaseCodeInput } = defaults.inputs.dropdowns;

        if (isLoading) {
            return <Loading />;
        }

        return <div>
            <ErrorSummary errors={errors} />
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h1>Attach Survey</h1>
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
                            onChange={this.onMultiSelectChange}
                            isMulti={true}
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
                    <LayoutSurveyList layout={layout} initiallyCollapsed={false} />
                </div>
            </div>

        </div>;
    }

    private onMultiSelectChange(name: string, value: any) {
        const newState = Object.assign({}, this.state) as any;

        newState[name] = value || [];

        this.setState(newState);
    }

    private onChange(name: string, value: any) {
        const newState = Object.assign({}, this.state) as any;

        newState[name] = value || '';

        this.setState(newState);
    }

    private async onSave(event: any) {
        event.preventDefault();

        const { layout, requestLayout } = this.props;
        const { name, icd9Code, outbreakId, effectiveDate, surveyType } = this.state;

        try {
            this.setState({ isLoading: true });
            await this.props.saveAttachSurveys({
                name,
                icd9Code,
                outbreakId,
                effectiveDate,
                surveyType,
                layoutId: layout.layoutId
            });

            this.setState({
                name: '',
                icd9Code: [],
                outbreakId: [],
                effectiveDate: defaults.effectiveDate,
                surveyType: ''
            });

            await requestLayout(layout.layoutId);

        } catch (e) {
            this.setState({ errors: e });
        } finally {
            this.setState({ isLoading: false });
        }
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            layout: state.layout.layout
        };
    },
    Object.assign(CodeStore.actionCreators, SurveyStore.actionCreators, actionCreators)
)(AttachSurveys);
