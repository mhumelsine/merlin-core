import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import Loading from '../common/Loading';
import Dropdown from '../common/Dropdown';
import CustomDatePicker from '../common/CustomDatePicker';
import SearchButton from '../common/SearchButton';
import { ClaimType } from '../../store/Session';
import { actionCreators as SmartGoalsActions } from '../../store/SmartGoals';

type Props = {
    claims: any
    onSubmit: (e: any) => void;
    criteria: any;
    userNameInfo: any[];
} & typeof SmartGoalsActions;

type State = {
        loading: boolean;
    };

class SmartGoalsSearch extends React.Component<Props, State> {
    state = {
        loading: false,
    };

    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public async componentWillMount() {
        try {
            this.setState({ loading: true });

            if (this.props.criteria.user === "") {
                await this.props.loadPerformanceSearch(this.props.claims[ClaimType.nameidentifier]);
                await this.props.loadPerformanceResults();
            }

        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public onChange(name: string, value: any) {
        const criteria = { ...this.props.criteria }
        criteria[name] = value;
        this.props.updatePerformanceSearch(criteria);
    }

    public render() {
        const { loading} = this.state;
        const { onSubmit, criteria, userNameInfo } = this.props

        const options = userNameInfo.map(info => {
            return { label: info.value, value: info.id }
        });

        if (loading) {
            return <Loading />;
        }

        return <form onSubmit={onSubmit}>
            <div className="row">
                <CustomDatePicker
                    name='startDate'
                    label='StartDate'
                    hideLabel={false}
                    value={criteria.startDate}
                    cols={2}
                    onChange={this.onChange}
                    isReadOnly={false}
                />
                <CustomDatePicker
                    name='endDate'
                    label='End Date'
                    hideLabel={false}
                    value={criteria.endDate}
                    cols={2}
                    onChange={this.onChange}
                    isReadOnly={false}
                />
                <Dropdown
                    cols={3}
                    label="User"
                    name="user"
                    value={criteria.user}
                    options={options}
                    placeholder={""}
                    onChange={this.onChange}
                    isMulti={false}
                    isReadOnly={false}
                />
                <SearchButton isSubmit={true} iconFontSize={18} className={"btn-primary m-4"} buttonText="Filter" />               
            </div>

        </form>;
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            claims: state.session.claims,
            criteria: state.smartGoals.criteria,
            userNameInfo:state.smartGoals.userNameInfo
        }
    },
    SmartGoalsActions
)(SmartGoalsSearch);
