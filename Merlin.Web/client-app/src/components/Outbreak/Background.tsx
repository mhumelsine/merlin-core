import * as React from 'react';
import { defaults, int32 } from '../../utils/Global';
import Dropdown from '../common/Dropdown';
import TextInput from '../common/TextInput';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { actionCreators as CodeActions, Codes, CodeType } from '../../store/Code';
import * as utils from '../../utils/UIUtils';
import CustomDatePicker from '../common/CustomDatePicker';
import { actionCreators as OutbreakActions, Background as OutbreakBackground } from '../../store/Outbreak';
import { isNullOrEmpty } from '../../utils/UIUtils';
import Loading from '../common/Loading';
import StaticInput from '../common/StaticInput';
import NumberInput from '../common/NumberInput';
import YesNoUnknown from '../common/YesNoUnknown';

type BackgroundProps = {
    background: OutbreakBackground,
    errors: any,
    codes: Codes
}
    & typeof CodeActions
    & typeof OutbreakActions;

class Background extends React.Component<BackgroundProps> {
    state = {
        loading: true
    };
    constructor(props: BackgroundProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public async componentDidMount() {
        const { loadBackground, loadDropdown } = this.props;

        try {
            this.setState({ loading: true });
            await loadBackground();
            await loadDropdown(CodeType.syndromes);
            await loadDropdown(CodeType.reported);
            await loadDropdown(CodeType.diseases);
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {

        const { loading } = this.state;
        const { errors, codes, background } = this.props;

        if (loading) {
            return <Loading />;
        }

        return <div>
            <div className="row" >
                <StaticInput
                    name="outbreakId"
                    cols={12}
                    label="Outbreak ID:"
                    value={background.outbreakId}
                />
            </div>

            <div className="row" >
                <TextInput
                    name={'eventName'}
                    isRequired={true}
                    value={background.eventName}
                    label={'Outbreak/Event Name:'}
                    hideLabel={false}
                    placeholder={''}
                    isReadOnly={false}
                    onChange={this.onChange}
                    cols={6}
                    maxLength={80}
                    error={errors.eventName}
                />

                <CustomDatePicker
                    name={'notifiedDate'}
                    isRequired={true}
                    value={background.notifiedDate}
                    label={'FDOH Notified Date:'}
                    hideLabel={false}
                    placeholder={'mm/dd/yyyy'}
                    isReadOnly={false}
                    onChange={this.onChange}
                    cols={6}
                    error={errors.notifiedDate}
                    // ignoreError={true}
                />
            </div>
            <div className="row" >
                <Dropdown
                    name="firstNotified"
                    value={background.firstNotified}
                    label={'How FDOH First Notified:'}
                    hideLabel={false}
                    placeholder={''}
                    options={utils.getOptions(codes.REPORTER)}
                    cols={6}
                    isMulti={false}
                    onChange={this.onChange}
                    isReadOnly={false}
                    error={errors.firstNotified}
                />
                <TextInput
                    name={'reporterName'}
                    value={background.reporterName}
                    label={'Reporter Name:'}
                    hideLabel={false}
                    placeholder={''}
                    isReadOnly={false}
                    onChange={this.onChange}
                    cols={6}
                    error={errors.reporterName}
                    maxLength={70}
                />
            </div>

            <div className="row" >
                <StaticInput
                    name="outbreakStatus"
                    label="Outbreak Status:"
                    value={background.outbreakStatus}
                    cols={12}
                />
            </div>
            <div className="row" >
                <CustomDatePicker
                    name={'investigationStarted'}
                    value={background.investigationStarted}
                    label={'Date investigation Started:'}
                    hideLabel={false}
                    placeholder={'mm/dd/yyyy'}
                    isReadOnly={false}
                    onChange={this.onChange}
                    cols={6}
                    error={errors.investigationStarted}
                    // ignoreError={true}
                />

                <CustomDatePicker
                    name={'investigationClosed'}
                    value={background.investigationClosed}
                    label={'Date investigation Closed:'}
                    hideLabel={false}
                    placeholder={'mm/dd/yyyy'}
                    isReadOnly={false}
                    onChange={this.onChange}
                    cols={6}
                    error={errors.investigationClosed}
                    // ignoreError={true}
                />

            </div>

            <hr className="border-primary" />

            <h5>Select a syndrome AND disease</h5>

            <div className="row" >
                <Dropdown
                    name={'syndrome'}
                    isRequired={true}
                    value={background.syndrome}
                    label={'Syndrome:'}
                    hideLabel={false}
                    placeholder={''}
                    options={utils.getOptions(codes.OB_SYNDROMES)}
                    cols={6}
                    isMulti={false}
                    onChange={this.onChange}
                    isReadOnly={false}
                    error={errors.syndrome}
                />
                <TextInput
                    name={'otherSyndrome'}
                    value={background.otherSyndrome}
                    label={'Other Syndrome:'}
                    hideLabel={false}
                    placeholder={''}
                    isReadOnly={background.syndrome !== 'OTHER'}
                    onChange={this.onChange}
                    cols={6}
                    error={errors.otherSyndrome}
                    maxLength={50}
                />
            </div>

            <div className="row" >
                <Dropdown
                    name={'diseaseHazard'}
                    value={background.diseaseHazard}
                    label={'Disease/Hazard:'}
                    hideLabel={false}
                    placeholder={''}
                    options={utils.getOptions(codes.DISEASES)}
                    cols={6}
                    isMulti={false}
                    onChange={this.onChange}
                    isReadOnly={false}
                    error={errors.diseaseHazard}
                />
                <TextInput
                    name={'otherDiseaseHazard'}
                    value={background.otherDiseaseHazard}
                    label={'Other Disease/Hazard:'}
                    hideLabel={false}
                    placeholder={''}
                    isReadOnly={background.diseaseHazard !== '99999'}
                    onChange={this.onChange}
                    cols={6}
                    error={errors.otherDiseaseHazard}
                    maxLength={50}
                />
            </div>

            <hr className="border-primary" />

            <div className="row" >
                <NumberInput
                    name={'estimatedNumber'}
                    isRequired={true}
                    value={background.estimatedNumber}
                    label={'Estimated Number Ill at Initial Report:'}
                    onChange={this.onChange}
                    cols={4}
                    error={errors.estimatedNumber}
                    min={int32.min}
                    max={int32.max}
                />
                <YesNoUnknown
                    name={'isOutbreak'}
                    isRequired={true}
                    value={background.isOutbreak}
                    label={'Outbreak:'}
                    cols={3}
                    onChange={this.onChange}
                    isReadOnly={false}
                    error={errors.isOutbreak}
                />
                <YesNoUnknown
                    name={'isInvestigated'}
                    isRequired={true}
                    value={background.isInvestigated}
                    label={'Investigated:'}
                    cols={3}
                    onChange={this.onChange}
                    isReadOnly={false}
                    error={errors.isInvestigated}
                />
            </div>
        </div>;
    }
    private onChange(name: string, newValue: any) {
        let background = Object.assign({}, this.props.background) as any;

        if ((name === 'syndrome')
            && ((isNullOrEmpty(newValue))
                || ((newValue === 'OTHER') && (background.syndrome !== 'OTHER'))
                || ((!isNullOrEmpty(background.otherSyndrome) && newValue !== 'OTHER')))) {
            background.otherSyndrome = '';
        }

        if ((name === 'diseaseHazard')
            && ((isNullOrEmpty(newValue))
                || ((newValue === '99999') && (background.diseaseHazard !== '99999'))
                || ((!isNullOrEmpty(background.otherDiseaseHazard) && newValue !== '99999')))) {
            background.otherDiseaseHazard = '';
        }

        background[name] = newValue;
        this.props.updateBackground(background);
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            background: state.outbreak.background,
            codes: state.codes.codes,
        };
    },
    Object.assign(CodeActions, OutbreakActions)
)(Background);
