import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import * as SurveyQuestionStore from '../../store/SurveyQuestion';
import TextInput from '../common/TextInput';
import * as CodeStore from '../../store/Code';
import { Survey } from '../../store/Survey';
import CustomDatePicker from '../common/CustomDatePicker';
import Alert from '../common/Alert';
import ErrorSummary from '../common/ErrorSummary';
import { defaults } from '../../utils/Global';
import Loading from '../common/Loading';
import Dropdown from '../common/Dropdown';
import ObjectMappingList from './ObjectMappingList';
import CancelButton from '../common/CancelButton';
import AddButton from '../common/AddButton';
import SaveButton from '../common/SaveButton';

type ObjectMappingManagerProps =
    {
        history?: any,
        match?: any,
        questionId: string,
        questionUid: string
    }
    & SurveyQuestionStore.SurveyQuestionState
    & CodeStore.CodeState
    & typeof CodeStore.actionCreators
    & typeof SurveyQuestionStore.actionCreators;

class ObjectMappingManager extends React.Component<ObjectMappingManagerProps, {}> {
    constructor(props: ObjectMappingManagerProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onReplace = this.onReplace.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.state.objectMapping.questionId = props.questionId;
    }

    state = {
        objectMapping: {
            questionId: defaults.guid,
            mappingType: defaults.string,
            mappingValue: defaults.string,
            uid: defaults.string
        },
        mappingTypeOfMappingToBeReplaced: defaults.string,
        errors: {} as any,
        isLoading: defaults.boolean,
        saveSuccessful: defaults.boolean,
        performReplaceOnSave: defaults.boolean,
        formIsVisible: defaults.boolean
    };

    public componentWillReceiveProps(newProps: ObjectMappingManagerProps) {
        let newState = Object.assign({}, this.state);
        this.setState(newState);
    }

    public componentWillMount() {
        this.props.loadDropdown(CodeStore.CodeType.mappingType, this.props.history);
    }

    private onChange(name: string, newValue: any) {
        let newState = Object.assign({}, this.state);
        (newState.objectMapping as any)[name] = newValue;
        this.setState(newState);
    }

    private onRemove(objectMapping: any) {
        this.setState({ isLoading: true });
        (this.props.removeObjectMapping(objectMapping, this.props.questionUid) as any)
            .then((res: any) => {
                this.props.requestObjectMappings(this.props.questionId, this.props.history);
                let newState = Object.assign({}, this.state);
                newState.isLoading = false;
                if (this.state.mappingTypeOfMappingToBeReplaced === objectMapping.mappingType) {
                    this.resetAll(newState);
                    newState.formIsVisible = this.state.formIsVisible;
                }
                newState.errors = {} as any;
                newState.saveSuccessful = defaults.boolean;
                this.setState(newState);
            })
            .catch((errors: any) => {
                this.setState({ errors, isLoading: defaults.boolean, saveSuccessful: defaults.boolean })
            });
    }

    private onEdit(objectMapping: any) {
        let newState = Object.assign({}, this.state);
        newState.objectMapping = Object.assign({}, objectMapping);
        newState.mappingTypeOfMappingToBeReplaced = objectMapping.mappingType;
        newState.performReplaceOnSave = true;
        newState.formIsVisible = true;
        newState.saveSuccessful = defaults.boolean;
        newState.errors = {} as any;
        this.setState(newState);
    }

    private onSave(event: any) {
        const surveyId = (this.props.match.params as any).surveyId;
        event.preventDefault();
        this.setState({ isLoading: true });
        (this.props.saveObjectMapping(this.state.objectMapping) as any)
            .then((res: any) => {
                this.props.requestObjectMappings(this.props.questionId, this.props.history);
                let newState = Object.assign({}, this.state);
                newState.saveSuccessful = true;
                newState.objectMapping.mappingType = defaults.string;
                newState.objectMapping.mappingValue = defaults.string;
                newState.isLoading = false;
                newState.errors = {} as any;
                this.setState(newState);
            })
            .catch((errors: any) => this.setState({ errors, isLoading: false }));
    }

    private onReplace(event: any) {
        const surveyId = (this.props.match.params as any).surveyId;
        event.preventDefault();
        this.setState({ isLoading: true });
        (this.props.replaceObjectMapping(this.state.objectMapping, this.state.mappingTypeOfMappingToBeReplaced) as any)
            .then((res: any) => {
                this.props.requestObjectMappings(this.props.questionId, this.props.history);
                let newState = Object.assign({}, this.state);
                newState = this.resetAll(newState);
                newState.formIsVisible = true;
                newState.saveSuccessful = true;
                newState.isLoading = false;
                this.setState(newState);
            })
            .catch((errors: any) => this.setState({ errors, isLoading: false }));
    }

    private onCancel(event: any) {
        event.preventDefault();
        let newState = Object.assign({}, this.state);
        newState = this.resetAll(newState);
        this.setState(newState);
    }

    private onCreate(event: any) {
        let newState = Object.assign({}, this.state);
        newState = this.resetAll(newState);
        newState.formIsVisible = true;
        this.setState(newState);
    }

    private resetAll(newState: any) {
        newState.objectMapping.mappingType = defaults.string;
        newState.objectMapping.mappingValue = defaults.string;
        newState.mappingTypeOfMappingToBeReplaced = defaults.string;
        newState.performReplaceOnSave = defaults.boolean;
        newState.formIsVisible = defaults.boolean;
        newState.saveSuccessful = defaults.boolean;
        newState.errors = {} as any;

        return newState;
    }

    private getCodeOptions(options: any[]) {
        return options.map(option => {
            return { label: option.description, value: option.code }
        });
    }



    public render() {
        const { history, loadDropdown, codes, questionId } = this.props
        const { errors, objectMapping, isLoading, saveSuccessful, performReplaceOnSave, formIsVisible } = this.state
        const { objectMappingValueInput } = defaults.inputs.textInputs
        const { objectMappingTypeInput } = defaults.inputs.dropdowns

        if (isLoading) {
            return <Loading />
        }

        return <div>
            <h2>Mapping Manager<AddButton onClick={this.onCreate} buttonText=" Create Mapping" /> </h2>

            {
                [
                    (
                        (Object.keys(errors).length > 0) &&
                        <ErrorSummary
                            errors={errors}
                        />
                    ),
                    (
                        saveSuccessful &&
                        <Alert alertType="success">
                            {"Mapping saved!"}
                        </Alert>
                    ),
                    (formIsVisible &&
                        <form className="row">
                            <Dropdown
                                cols={12}
                                label={objectMappingTypeInput.label}
                                hideLabel={false}
                                name={objectMappingTypeInput.name}
                                value={objectMapping.mappingType}
                                options={this.getCodeOptions(codes.CD_MAPPING_TYPE)}
                                placeholder={objectMappingTypeInput.placeholder}
                                onChange={this.onChange}
                                isMulti={false}
                                error={errors[objectMappingTypeInput.name]}
                                isReadOnly={false}
                            />
                            <TextInput
                                cols={12}
                                label={objectMappingValueInput.label}
                                hideLabel={false}
                                name={objectMappingValueInput.name}
                                value={objectMapping.mappingValue || defaults.string}
                                placeholder={objectMappingValueInput.placeholder}
                                onChange={this.onChange}
                                inputRef={(input: any) => { }}
                                isReadOnly={false}
                                error={errors[objectMappingValueInput.name]}
                            />
                            <div className="form-group col-sm-12">
                                <CancelButton className={"btn-space-right"} onClick={this.onCancel} />
                                <SaveButton onClick={performReplaceOnSave ? this.onReplace : this.onSave} buttonText=" Save Mapping" />                        
                            </div>
                        </form>
                    )
                ]

            }

            {/*  Too much wrong to correct moving to new template.  Functionaly not complete
            <ObjectMappingList
                questionId={questionId}
                className={""}
                noResultsMessage={""}
                onEdit={this.onEdit}
                onRemove={this.onRemove}
                maxHeight={""}
                {...this.props}

            />
            */}
        </div>
    }
}
export default connect(
    (state: ApplicationState) => Object.assign({}, state.surveyQuestion, state.codes),
    Object.assign({}, SurveyQuestionStore.actionCreators, CodeStore.actionCreators)
)(ObjectMappingManager);