import * as React from 'react';
import { connect } from 'react-redux';
import TextInput from '../common/TextInput';
import Dropdown from '../common/Dropdown';
import Alert from '../common/Alert';
import ErrorSummary from '../common/ErrorSummary';
import { defaults } from '../../utils/Global';
import Loading from '../common/Loading';
import * as CodeStore from '../../store/Code';
import { questionTypesWithCodesArray, Codes } from '../../store/Code';
import { ApplicationState } from '../../store/index';

type QuestionTypeControlProps =
    {
        questionType: string;
        codes: Codes;
        codeType: string;
        isReadOnly?: boolean;
        onChange: (name: string, newValue: any) => any;
        history: any;
        errors: any;
    }
    & typeof CodeStore.actionCreators;

class QuestionTypeControl extends React.Component<QuestionTypeControlProps, {}> {
    constructor(props: QuestionTypeControlProps) {
        super(props);
    }
    state = {
        isLoading: defaults.boolean,
        loadFailed: false
    };

    public componentWillMount() {
        this.setState({ isLoading: true });
        this.props.loadDropdown(CodeStore.CodeType.questionType, this.props.history);
        this.props.loadDropdown(CodeStore.CodeType.distinctCodeType, this.props.history);
    }

    private getCodeOptions(options: any[]) {
        return options.map(option => {
            return { label: option.description, value: option.code }
        });
    }

    public componentWillReceiveProps(newProps: any) {
        let newState = Object.assign({}, this.state);
        if (newProps.loadFailed) {
            newState.loadFailed = true;
            newState.isLoading = defaults.boolean;
            this.setState(newState);
            return;
        }
        if ((Object.keys(newProps.codes.SYSTEM).length > 0) && (Object.keys(newProps.codes.SURVEY_ANSWER_TYPE).length > 0)) {
            newState.isLoading = defaults.boolean;
        }
        this.setState(newState);
    }
    public render() {
        const { questionType, codeType, isReadOnly, codes, onChange, errors } = this.props
        const { questionTypeInput, questionCodeTypeInput } = defaults.inputs.dropdowns;

        if (this.state.isLoading) {
            return <Loading />;
        }

        return <div className=" row">
            <div className="col-md-6">
                <Dropdown
                    cols={12}
                    label={questionTypeInput.label}
                    hideLabel={false}
                    name={questionTypeInput.name}
                    value={questionType}
                    options={this.getCodeOptions(codes.SURVEY_ANSWER_TYPE)}
                    placeholder={questionTypeInput.placeholder}
                    onChange={onChange}
                    isMulti={false}
                    error={errors[questionTypeInput.name]}
                    isReadOnly={isReadOnly}
                />
            </div>
            <div className="col-md-6">
                {(questionType != defaults.string &&
                    questionTypesWithCodesArray.indexOf(questionType) >= 0) &&
                    <Dropdown
                        cols={12}
                        label={questionCodeTypeInput.label}
                        hideLabel={false}
                        name={questionCodeTypeInput.name}
                        value={codeType}
                        options={this.getCodeOptions(codes.SYSTEM)}
                        placeholder={questionCodeTypeInput.placeholder}
                        onChange={onChange}
                        isMulti={false}
                        error={errors[questionCodeTypeInput.name]}
                        isReadOnly={isReadOnly}
                    />
                }
            </div>
        </div>
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            codes: state.codes.codes
        }
    },
    CodeStore.actionCreators
)(QuestionTypeControl);