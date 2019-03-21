import * as React from 'react';
import Dropdown from '../common/Dropdown';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { actionCreators as CodeActions, Codes, CodeType } from '../../store/Code';
import TextAreaInput from '../common/TextAreaInput';
import * as utils from '../../utils/UIUtils';
import { actionCreators as OutbreakActions, CaseReview as OutbreakCaseReview } from '../../store/Outbreak';
import StaticInput from '../common/StaticInput';
import UploadDocument from './UploadDocument';

type CaseReviewProps = {
    caseReview: OutbreakCaseReview,
    codes: Codes
    errors: any
}
    & typeof CodeActions
    & typeof OutbreakActions;

class CaseReview extends React.Component<CaseReviewProps> {

    constructor(props: CaseReviewProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    private onChange(name: string, value: any) {
        const caseReview = Object.assign({}, this.props.caseReview) as any;

        caseReview[name] = value;

        this.props.updateCaseReview(caseReview);
    }

    public async componentDidMount() {
        const { loadCaseReview, loadDropdown } = this.props;

        try {
            this.setState({ loading: true });
            await loadCaseReview();
            await loadDropdown(CodeType.reviewStatus)
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {
        const { errors, caseReview, codes } = this.props

        return <div>

            {caseReview.reviewStatus !== "NOT SUBMITTED" &&
                <div className="row">
                    <StaticInput
                        name="reviewedOn"
                        label="Reviewed On"
                        value={caseReview.reviewedOn}
                        cols={3}
                    />
                    <StaticInput
                        name="reviewedBy"
                        label="Reviewed By"
                        value={caseReview.reviewedBy}
                        cols={3}
                    />
                </div>
            }

            <div className="row" >
                <Dropdown
                    name="reviewStatus"
                    value={caseReview.reviewStatus}
                    label="Review Status:"
                    hideLabel={false}
                    placeholder={''}
                    options={utils.getOptions(codes.OB_REVIEW_STATUS)}
                    cols={3}
                    isMulti={false}
                    onChange={this.onChange}
                    isReadOnly={false}
                    error={errors.reviewStatus}
                />
            </div>

            <div className="row" >
                <TextAreaInput
                    name="comments"
                    value={caseReview.comments}
                    label="Comments:"
                    hideLabel={false}
                    placeholder={''}
                    isReadOnly={false}
                    onChange={this.onChange}
                    cols={12}
                    rows={5}
                    error={errors.comments}
                />
            </div>
        </div>

    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            caseReview: state.outbreak.caseReview,
            codes: state.codes.codes,
        };
    },
    Object.assign(CodeActions, OutbreakActions)
)(CaseReview);
