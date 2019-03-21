import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import * as OutbreakStore from '../../store/Outbreak';
import { ApplicationState } from '../../store/index';
import Background from './Background';
import GeographicLocation from './GeographicLocation';
import SettingInformation from './SettingInformation';
import Transmission from './Transmission';
import Methods from './Methods';
import Results from './Results';
import ClinicalResults from './ClinicalResults';
import LaboratoryResults from './LaboratoryResults';
import Conclusions from './Conclusions';
import CardGroup from '../common/CardGroup';
import CardGroupCard from '../common/CardGroupCard';
import CardBody from '../common/CardBody';
import Documents from './Documents';
import Notes from './Notes';
import AuditInfo from './AuditInfo';
import CaseReview from './CaseReview';
import Sticky from '../common/Sticky';
import SaveButton from '../common/SaveButton';
import PrintButton from '../common/PrintButton';
import SubmitButton from '../common/SubmitButton';
import SurveyCollection from '../survey/SurveyCollection';
import EpiComPost from './EpiComPost';
import moment from 'moment';
import ErrorSummary from '../common/ErrorSummary';
import { toast } from 'react-toastify';

type OutbreakDetailProps = {
    layoutUid: string,
    surveyAnswers: any
}
    & typeof OutbreakStore.actionCreators
    & RouteComponentProps<any>;

class OutbreakDetailPage extends React.Component<OutbreakDetailProps> {
    state = {
        errors: {},
        loading: true,
        saving: false,
        submitting: false,
        lastSaved: ''
    };

    constructor(props: OutbreakDetailProps) {
        super(props);

        this.save = this.save.bind(this);
        this.submit = this.submit.bind(this);
        this.updateSurveyAnswers = this.updateSurveyAnswers.bind(this);
    }

    private async save() {
        this.setState({ saving: true });
        await this.saveOutbreak(false);
    }

    private async submit() {
        this.setState({ submitting: true });
        await this.saveOutbreak(true);
    }

    private async saveOutbreak(isSubmit: boolean) {
        const { saveOutbreak, loadCaseReview, loadNoteList } = this.props;

        try {
            const errors = await saveOutbreak(isSubmit);

            if (Object.keys(errors).length === 0) {
                this.setState({ lastSaved: moment().format("MM/DD/YYYY hh:mm:ss a") });
                loadCaseReview();
                loadNoteList();
                toast.success("Successfully saved.");
            }
            else {
                toast.error("Unsuccessful save.Check field validation errors.");
            }

            this.setState({ errors });
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ saving: false, submitting: false });
        }
    }

    private updateSurveyAnswers(newAnswers: any) {
        this.props.updateSurveyAnswers(newAnswers);
    }

    public async componentWillMount() {
        const { outbreakId } = this.props.match.params;
        const { setOutbreak, loadOutbreakLayoutUid, loadSurveyAnswers } = this.props;

        try {
            this.setState({ loading: true });
            setOutbreak(outbreakId);
            await loadOutbreakLayoutUid(outbreakId);
            await loadSurveyAnswers();
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: true });
        }
    }

    public render() {
        const { errors, saving, submitting, lastSaved, loading } = this.state;
        const { layoutUid, surveyAnswers } = this.props;
        const disableSave = saving || submitting;

        return <div>
            <Sticky>
                <div className="d-flex justify-content-between d-print-none">
                    <h1 className="mb-0">Outbreak Detail</h1>
                    <div className="d-flex align-items-center">
                        <div>
                            <span className="text-muted">
                                {lastSaved && <span className="text-success">Last saved on: {lastSaved}</span>}
                            </span>
                            {" "}
                            <SaveButton onClick={this.save} buttonText={`${saving ? "Saving..." : "Save"}`} disabled={disableSave} />
                            {" "}
                            <SubmitButton onClick={this.submit} buttonText={`${submitting ? "Submitting..." : "Submit"}`} disabled={disableSave} />
                            {" "}
                            <PrintButton />
                        </div>
                    </div>
                </div>
            </Sticky>
            <ErrorSummary errors={errors} showAll={true}/>
            <CardGroup>
                <CardGroupCard heading="Background">
                    <CardBody>
                        <Background errors={errors} />
                    </CardBody>
                </CardGroupCard>
                <CardGroupCard heading="Geographic Location">
                    <CardBody>
                        <GeographicLocation errors={errors} />
                    </CardBody>
                </CardGroupCard>
                <CardGroupCard heading="Setting Information">
                    <CardBody>
                        <SettingInformation errors={errors} />
                    </CardBody>
                </CardGroupCard>
                <CardGroupCard heading="Transmission">
                    <CardBody>
                        <Transmission errors={errors} />
                    </CardBody>
                </CardGroupCard>
                <CardGroupCard heading="Methods">
                    <CardBody>
                        <Methods errors={errors} />
                    </CardBody>
                </CardGroupCard>
                <CardGroupCard heading="Results">
                    <CardBody>
                        <Results errors={errors} />
                    </CardBody>
                </CardGroupCard>
            </CardGroup>
            {layoutUid &&
                <div className="card mb-0">
                    <div className="card-body">
                        <h1 className="mb-4">Survey</h1>
                        <SurveyCollection
                            layoutUid={layoutUid}
                            onAnswersChanged={this.updateSurveyAnswers}
                            answers={surveyAnswers}
                        />
                    </div>
                </div>
            }
            <CardGroup>
                <CardGroupCard heading="Clinical Results">
                    <CardBody>
                        <ClinicalResults errors={errors} />
                    </CardBody>
                </CardGroupCard>
                <CardGroupCard heading="Laboratory Results">
                    <CardBody>
                        <LaboratoryResults errors={errors} />
                    </CardBody>
                </CardGroupCard>
                <CardGroupCard heading="EpiCom">
                    <CardBody>
                        <EpiComPost />
                    </CardBody>
                </CardGroupCard>
                <CardGroupCard heading="Conclusions/Lessons Learned">
                    <CardBody>
                        <Conclusions errors={errors} />
                    </CardBody>
                </CardGroupCard>
                <CardGroupCard heading="Documents">
                    <CardBody>
                        <Documents />
                    </CardBody>
                </CardGroupCard>
                <CardGroupCard heading="Notes">
                    <CardBody>
                        <Notes />
                    </CardBody>
                </CardGroupCard>
                <CardGroupCard heading="Audit Info">
                    <CardBody>
                        <AuditInfo />
                    </CardBody>
                </CardGroupCard>
                <CardGroupCard heading="Case Review">
                    <CardBody>
                        <CaseReview errors={errors} />
                    </CardBody>
                </CardGroupCard>
            </CardGroup>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            outbreakId: state.outbreak.outbreakId,
            layoutUid: state.outbreak.layoutUid,
            surveyAnswers: state.outbreak.surveyAnswers
        };
    },
    OutbreakStore.actionCreators
)(OutbreakDetailPage);