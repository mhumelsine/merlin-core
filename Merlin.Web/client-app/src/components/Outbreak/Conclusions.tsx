import * as React from 'react';
import Dropdown from '../common/Dropdown';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { actionCreators as CodeActions, Codes, CodeType } from '../../store/Code';
import TextAreaInput from '../common/TextAreaInput';
import * as utils from '../../utils/UIUtils';
import { actionCreators as OutbreakActions, Conclusions as OutbreakConclusions, Document } from '../../store/Outbreak';
import AddButton from '../common/AddButton';
import YesNoUnknown from '../common/YesNoUnknown';
import Loading from '../common/Loading';

type ConclusionProps = {
    conclusions: OutbreakConclusions,
    errors: any,
    codes: Codes,
    documentBeingEdited: Document | undefined
}
    & typeof CodeActions
    & typeof OutbreakActions;

class Conclusions extends React.Component<ConclusionProps> {

    state = {
        loading: true,
        errors: {} as any
    };

    constructor(props: ConclusionProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public async componentDidMount() {
        const { loadConclusions, loadDropdown } = this.props;
        try {
            this.setState({ loading: true });
            await loadConclusions();
            await loadDropdown(CodeType.recommendationTypes);
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }


    public render() {
        const { loading } = this.state;
        const { errors, codes, conclusions, documentBeingEdited, createDocument } = this.props;

        if (loading) {
            return <Loading />;
        }

        return <div>
            <div className="row" >
                <TextAreaInput
                    name={'decisions'}
                    value={conclusions.decisions}
                    label={'Decisions/Conclusions:'}
                    hideLabel={false}
                    placeholder={''}
                    isReadOnly={false}
                    onChange={this.onChange}
                    cols={12}
                    rows={5}
                    error={errors.decisions}
                />
            </div>
            <h4 className="title-underline mt-3">Recommendation Guidance</h4>
            <div className="row" >
                <TextAreaInput
                    name="recommendations"
                    value={conclusions.recommendations}
                    label={'Recommendations/Specific Control Measures:'}
                    hideLabel={false}
                    placeholder={''}
                    isReadOnly={false}
                    onChange={this.onChange}
                    cols={12}
                    rows={5}
                    error={errors.recommendations}
                />
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <YesNoUnknown
                            name={'isRecProvided'}
                            value={conclusions.isRecProvided}
                            label={'Recommendations/specific Control Measures Provided to Site/Facility:'}
                            cols={12}
                            onChange={this.onChange}
                            error={errors.isRecProvided}
                        />
                        <YesNoUnknown
                            name={'recImplemented'}
                            value={conclusions.recImplemented}
                            label={'Recommendations Implemented:'}
                            cols={12}
                            onChange={this.onChange}
                            error={errors.recImplemented}
                        />
                        <YesNoUnknown
                            name={'isReportCompleted'}
                            value={conclusions.isReportCompleted}
                            label={'Internal After Action Report Completed:'}
                            cols={12}
                            onChange={this.onChange}
                            error={errors.isReportCompleted}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <Dropdown
                            name={'methodofRec'}
                            value={conclusions.methodofRec}
                            label={'Method of Providing Recommendations:'}
                            hideLabel={false}
                            placeholder={''}
                            options={utils.getOptions(codes.OB_RECOMMENDATIONS_H)}
                            cols={12}
                            isMulti={false}
                            onChange={this.onChange}
                            isReadOnly={conclusions.isRecProvided !== 'YES'}
                            error={errors.methodOfRec}
                        />
                        <TextAreaInput
                            name={'improvementAreas'}
                            value={conclusions.improvementAreas}
                            label={'Areas of Improvement in Future Investigations:'}
                            hideLabel={false}
                            placeholder={''}
                            isReadOnly={false}
                            onChange={this.onChange}
                            cols={12}
                            rows={5}
                            error={errors.improvementAreas}
                        />
                    </div>
                </div>
            </div>
            {documentBeingEdited === undefined && <AddButton className="btn btn-outline-dark" onClick={createDocument} buttonText="Report" />}
        </div>;
    }

    private onChange(name: string, value: any) {
        let conclusions = Object.assign({}, this.props.conclusions) as any;

        conclusions[name] = value;

        if (name === 'isRecProvided') {
            if (value !== 'YES') {
                conclusions.methodofRec = '';
            }
        }

        this.props.updateConclusions(conclusions);
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            conclusions: state.outbreak.conclusions,
            codes: state.codes.codes,
            outbreakId: state.outbreak.outbreakId,
            documentBeingEdited: state.outbreak.documentBeingEdited
        };
    },
    Object.assign(CodeActions, OutbreakActions)
)(Conclusions);
