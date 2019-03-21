import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { SettingInfo, actionCreators as OutbreakActions } from '../../store/Outbreak';
import { CodeType, actionCreators as CodeActions, Codes } from '../../store/Code';
import Dropdown from '../common/Dropdown';
import YesNo from '../common/YesNo';
import TextInput from '../common/TextInput';
import { getOptions } from '../../utils/UIUtils';
import Loading from '../common/Loading';
import SaveButton from '../common/SaveButton';
import ErrorSummary from '../common/ErrorSummary';
import CancelButton from '../common/CancelButton';
import PhoneInput from '../common/PhoneInput';
import Address from '../common/Address';
import * as AjaxUtils from '../../utils/AjaxUtils';
import * as utils from '../../utils/UIUtils';

type SettingFormProps = {
    errors:any,
    setting?: SettingInfo,
    codes?:Codes
}
    & typeof OutbreakActions
    & typeof CodeActions;

class SettingForm extends React.Component<SettingFormProps> {
    state = {
        loading: true,
        saving: false,
        errors: {} as any
    };
    constructor(props: SettingFormProps) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public async componentWillMount() {
        const { loadDropdown } = this.props;

        try {
            this.setState({ loading: true });
            await loadDropdown(CodeType.settings);
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    private async onChange(name: string, value: any) {
        const setting = Object.assign({}, this.props.setting) as any;

        const settingTypeChanged = name === "settingType"
            && setting && setting.settingType !== value;

        setting[name] = value;

        if (name === "settingFacilityId") {
            setting.settingContact = '';
            setting.settingContactPhone = '';

            setting.settingName = getOptions(this.props.codes!.SETTING_NAME || [])
                .filter(option => option.value === value)[0].label;

            try {
                this.setState({ loading: true });

                const facility = await AjaxUtils.get(`api/outbreak/setting/${value}`);

                setting.settingContact = facility.settingContact;
                setting.settingContactPhone = facility.settingContactPhone;
                setting.address.addressLine1 = facility.addressLine1;
                setting.address.addressLine2 = facility.addressLine2;
                setting.address.city = facility.city;
                setting.address.state = facility.state;
                setting.address.zip = facility.zip;
                setting.address.county = facility.county;
                setting.address.country = facility.country;

            } catch (err) {
                console.log(err);
            } finally {
                this.setState({ loading: false });
            }

        }

        if (settingTypeChanged) {
            setting.settingName = '';
            setting.settingFacilityId = '';

            this.props.loadSettingsDropdown(value);
        }

        this.props.updateSetting(setting);
    }

    private async onSubmit(event: any) {
        event.preventDefault();

        this.setState({ saving: true });

        const errors = await this.props.saveSetting();

        this.setState({ errors, saving: false });
    }

    public render() {
        const { errors, loading, saving } = this.state;
        const { codes, setting, cancelSettingEdit } = this.props;
        const hasSettingsDropdown = codes!.SETTING_NAME && codes!.SETTING_NAME.length > 0;
        let isKnownSetting = !utils.isNullOrEmpty(setting!.settingFacilityId);

        if (loading || setting === undefined || codes === undefined) {
            return <Loading />;
        }

        return <div>
            <ErrorSummary errors={errors} />
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <Dropdown
                        name="settingType"
                        value={setting.settingType}
                        options={getOptions(codes.OB_SETTING)}
                        cols={12}
                        label="Setting Type"
                        hideLabel={false}
                        onChange={this.onChange}
                        error={errors.settingType}
                    />

                    {hasSettingsDropdown &&
                        <Dropdown
                            name="settingFacilityId"
                            value={setting.settingFacilityId}
                            options={getOptions(codes.SETTING_NAME)}
                            cols={12}
                            label="Setting Name"
                            hideLabel={false}
                            onChange={this.onChange}
                            error={errors.settingFacilityId}
                        />
                    }
                    {!hasSettingsDropdown &&
                        <TextInput
                            name={"settingName"}
                            value={setting.settingName}
                            label={"Setting Name"}
                            hideLabel={false}
                            placeholder={''}
                            isReadOnly={false}
                            onChange={this.onChange}
                            cols={12}
                            error={errors.settingName}
                        />
                    }

                    {setting.settingName === "OTHER" &&
                        <TextInput
                            name={"otherType"}
                            value={setting.otherType}
                            label={"Other Setting Type"}
                            hideLabel={false}
                            placeholder={''}
                            isReadOnly={false}
                            onChange={this.onChange}
                            cols={12}
                            error={errors.otherType}
                        />
                    }

                    <YesNo
                        name={"isPrimary"}
                        label={"Primary Setting"}
                        value={setting.isPrimary}
                        hideLabel={false}
                        onChange={this.onChange}
                        error={errors.isPrimary}
                        isBoolean={true}
                        cols={12}
                        isReadOnly={false}
                    />

                </div>
                <div className="row" >
                    <TextInput
                        name={"settingContact"}
                        value={setting.settingContact}
                        label={"Setting Contact"}
                        hideLabel={false}
                        placeholder={''}
                        isReadOnly={isKnownSetting}
                        onChange={this.onChange}
                        cols={6}
                        error={errors.settingContact}
                    />
                    <PhoneInput
                        name={"settingContactPhone"}
                        value={setting.settingContactPhone}
                        label={"Setting Contact Phone"}
                        hideLabel={false}
                        placeholder={''}
                        isReadOnly={isKnownSetting}
                        onChange={this.onChange}
                        cols={6}
                        error={errors.settingContactPhone}
                    />
                </div>
                <Address
                    address={setting.address}
                    name="address"
                    onChange={this.onChange}
                    errors={errors}
                    isReadOnly={isKnownSetting}
                />
                <div className="row">
                    <div className="col-md-12 text-right">
                        <SaveButton disabled={saving} buttonText={saving ? "Saving..." : "Save"} />
                        {" "}
                        <CancelButton onClick={cancelSettingEdit} />
                    </div>
                </div>
            </form>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            codes: state.codes.codes,
            setting: state.outbreak.settingBeingEdited
        };
    },
    Object.assign(CodeActions, OutbreakActions)
)(SettingForm);