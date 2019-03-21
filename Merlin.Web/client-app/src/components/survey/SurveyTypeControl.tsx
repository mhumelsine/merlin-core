import * as React from 'react';
import { connect } from 'react-redux';
import Dropdown from '../common/Dropdown';
import ErrorSummary from '../common/ErrorSummary';
import { defaults } from '../../utils/Global';
import Loading from '../common/Loading';
import * as CodeStore from '../../store/Code';
import { diseaseSurveyTypesArray, outbreakSurveyTypesArray } from '../../store/Code';
import { ApplicationState } from '../../store/index';
import { getOptions } from '../../utils/UIUtils';

type SurveyTypeControlProps =
    {
        onChange: (name: string, newValue: any) => any;
        surveyType: any;
        icd9Codes: any;
        outbreakIds: any;
        isMulti: boolean;
    }
    & CodeStore.CodeState
    & typeof CodeStore.actionCreators;

class SurveyTypeControl extends React.Component<SurveyTypeControlProps, {}> {
    state = {
        isLoading: defaults.boolean,
        errors: {} as any
    };
    constructor(props: SurveyTypeControlProps) {
        super(props);
    }

    public async componentWillMount() {
        this.setState({ isLoading: true });
        try {
                this.props.loadDropdown(CodeStore.CodeType.surveyType);
                this.props.loadDropdown(CodeStore.CodeType.icd9);
                this.props.loadDropdown(CodeStore.CodeType.outbreak);
        } catch (errors) {
            this.setState({errors: errors});
        }
    }

    public componentWillReceiveProps(newProps: any) {
        if (!newProps.loadFailed) {
            this.setState({ isLoading: false });
        }
    }

    public render() {
        const { isLoading } = this.state;
        const { codes, isMulti, surveyType, icd9Codes, outbreakIds, onChange } = this.props;
        const { surveyTypeInput, outbreakInput, diseaseCodeInput } = defaults.inputs.dropdowns;

        if (isLoading) {
            return <Loading />;
        }

        return <div>
            <Dropdown
                label={surveyTypeInput.label}
                hideLabel={false}
                name={surveyTypeInput.name}
                value={surveyType}
                options={getOptions(codes.DYN_SURVEY_TYPE)}
                placeholder={surveyTypeInput.placeholder}
                onChange={onChange}
            />
            {(surveyType != defaults.string &&
                diseaseSurveyTypesArray.indexOf(surveyType) >= 0) &&
                <Dropdown
                    label={diseaseCodeInput.label}
                    hideLabel={false}
                    name="icd9Code"
                    value={icd9Codes}
                    options={getOptions(codes.ICD9)}
                    placeholder={diseaseCodeInput.placeholder}
                    onChange={onChange}
                    isMulti={isMulti}
                />
            }
            {(surveyType != defaults.string &&
                outbreakSurveyTypesArray.indexOf(surveyType) >= 0) &&
                <Dropdown
                    label={outbreakInput.label}
                    hideLabel={false}
                    name="outbreakId"
                    value={outbreakIds}
                    options={getOptions(codes.OUTBREAK)}
                    placeholder={outbreakInput.placeholder}
                    onChange={onChange}
                    isMulti={isMulti}
                />
            }
        </div>;
    }
}
export default connect(
    (state: ApplicationState) => Object.assign({}, state.codes),
    Object.assign({}, CodeStore.actionCreators)
)(SurveyTypeControl);
