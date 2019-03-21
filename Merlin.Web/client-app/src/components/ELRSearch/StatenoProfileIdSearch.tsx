import * as React from 'react';
import { NumberWithAddOn } from '../common/NumberInput';
import { TextInputWithAddOn } from '../common/TextInput';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { defaults, int32 } from '../../utils/Global';
import * as AjaxUtils from '../../utils/AjaxUtils';
import InlineLoader from '../common/InlineLoader';
import SearchButton from '../common/SearchButton';
import Alert from '../common/Alert';
import ButtonRadio from '../common/ButtonRadio';
import { isNullOrEmpty } from '../../utils/UIUtils';

type Props = {
    onChange: (name: string, value: any) => void;
    onError: (errors: any) => void;
    profileId: string;
    stateno: string;
    errors: any
}

type State = {
    searching: boolean,
    profileList: any[],
    profile: {
        name: string
    }
}

export default class StatenoProfileIdSearch extends React.Component<Props, State> {

    state = {
        searching: false,
        profile: {
            name: ""
        },
        profileList: [] as any[]
    }

    constructor(props: Props) {
        super(props);
        this.onProfileIdSearch = this.onProfileIdSearch.bind(this);
        this.onStatenoSearch = this.onStatenoSearch.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    private async onStatenoSearch(e: any) {

        const { stateno, onError } = this.props;

        try {
            this.setState({ searching: true });

            const profileList = await AjaxUtils.get(`api/elrsearch/${stateno}/profiles`);

            if (profileList && profileList.length === 1) {
                this.setState({ profileList }, () =>
                    this.onChange("profileId", `${profileList[0].profileId}`));
            } else {
                this.setState({ profileList });
            }

        } catch (errors) {
            onError(errors);
        } finally {
            this.setState({ searching: false });
        }
    }

    private async onProfileIdSearch(e: any) {

        const { profileId, onError } = this.props;

        try {
            this.setState({ searching: true });

            const profile = await AjaxUtils.get(`api/elrsearch/${profileId}/profile`);

            this.setState({ profile: profile || { name: "" } });
        } catch (errors) {
            onError(errors);
        } finally {
            this.setState({ searching: false });
        }
    }

    private createFeedback() {

        const { profileList } = this.state;
        const { stateno, profileId } = this.props;

        if (profileList.length === 0 && isNullOrEmpty(stateno)) {
            return null;
        }

        if (profileList.length === 0 ) {
            return <Alert alertType="warning">
                <FaExclamationTriangle fontSize={defaults.iconSize} /> No profiles found for state# {stateno}
            </Alert>
        }

        const options = profileList.map(profile => {
            return { label: `${profile.profileId} - ${profile.name}`, value: `${profile.profileId}` };
        });

        return <ButtonRadio
            name="profileId"
            label="Profile ID"
            value={profileId}
            hideLabel={true}
            onChange={this.onChange}
            options={options}
            isVertical={true}
        //block={true}
        />;
    }

    private onChange(name: string, value: any) {
        const { profileList } = this.state;

        if (name === "profileId" && profileList) {
            const matchingProfile = profileList.filter(profile => profile.profileId == value);

            if (matchingProfile.length === 1) {
                this.setState({ profile: matchingProfile[0] });
            }
        }

        this.props.onChange(name, value);
    }

    public render() {

        const { profileId, errors, stateno } = this.props;
        const { profile, searching } = this.state;

        return <div className="row">
            <NumberWithAddOn
                name="profileId"
                value={profileId}
                label="Profile Id"
                hideLabel={false}
                isReadOnly={false}
                onChange={this.onChange}
                error={errors.profileId}
                success={profile && profile.name && <span><FaCheckCircle fontSize={defaults.iconSize} />{" "}{profile.name}</span>}
                cols={6}
                min={int32.min}
                max={int32.max}
            >
                {searching && <InlineLoader size="sm" />}
                {!searching && <SearchButton title="Find profile details" disabled={searching} buttonText={" "} onClick={this.onProfileIdSearch} />}
            </NumberWithAddOn>

            <TextInputWithAddOn
                name="stateno"
                value={stateno}
                label="State #"
                hideLabel={false}
                placeholder=""
                cols={6}
                isReadOnly={false}
                onChange={this.onChange}
                error={errors.stateno}
                feedback={this.createFeedback()}
            >
                {searching && <InlineLoader size="sm" />}
                {!searching && <SearchButton title="Find StateNo details" disabled={searching} buttonText={" "} onClick={this.onStatenoSearch} />}
            </TextInputWithAddOn>

        </div>;
    }
}