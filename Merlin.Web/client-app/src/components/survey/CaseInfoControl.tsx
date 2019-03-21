import * as React from 'react';
import { ApplicationState } from '../../store/index';
import * as CaseStore from '../../store/Case';
import { connect } from 'react-redux';
import Loading from '../common/Loading';
import { defaults } from '../../utils/Global';
import TextInput from '../common/TextInput';
import { ChangeEvent } from 'react';

type CaseInfoControlProps = {
}
    & CaseStore.CaseState
    & typeof CaseStore.actionCreators;

class CaseInfoControl extends React.Component<CaseInfoControlProps> {
    state = {
        caseId: defaults.string,
        isLoading: false
    };

    constructor(props: CaseInfoControlProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTextCaseChange = this.onTextCaseChange.bind(this);
    }

    public render() {
        const { caseId, isLoading } = this.state;
        const { caseDetails } = this.props;
        const { name, dateOfBirth, icd9, caseEventDate, caseStatus } = caseDetails;

        if (isLoading) {
            return <Loading />;
        }

        return <div>
            <li className="list-group-item">
                <div className="d-flex" style={{ 'flexWrap': 'wrap' }}>
                    {this.columnRender('Case Id', this.renderCaseInput())}
                    {this.columnRender('Name', name)}
                    {this.columnRender('Date of Birth', dateOfBirth)}
                    {this.columnRender('Disease Code', icd9)}
                    {this.columnRender('Event Date', caseEventDate)}
                    {this.columnRender('Case Status', caseStatus)}
                </div>
            </li>
        </div>;
    }

    private onTextCaseChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({ caseId: event.currentTarget.value });
    }

    private async onSubmit(event: any) {
        const { loadDetailsForCase, caseDetails } = this.props;
        const { caseId } = this.state;

        event.preventDefault();

        try {
            this.setState({ isLoading: true });
            await loadDetailsForCase(parseInt(caseId));
        }
        finally {
            this.setState({ isLoading: false });
        }
    }

    private columnRender(title: string, value: any) {
        if (value) {
            return <div style={{ paddingLeft: '2rem' }}>
                <div>
                    <h6>{title}</h6>
                </div>
                <div>
                    {value}
                </div>
            </div>;
        }
    }

    private renderCaseInput() {
        return <div className="input-group mb-3">
            <input type={'text'} className={'form-control'} placeholder="Enter Case Id" value={this.state.caseId} onChange={this.onTextCaseChange} />
            <div className="input-group-append">
                <button className={defaults.theme.buttons.class} type="button" onClick={this.onSubmit}>Submit</button>
            </div>
        </div>;
    }
}
export default connect(
    (state: ApplicationState) => state.case,
    CaseStore.actionCreators
)(CaseInfoControl);
