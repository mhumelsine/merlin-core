import * as React from 'react';
import Alert from '../common/Alert';
import { actionCreators, SearchCriteria, ColumnInfo, ColumnProperty } from '../../store/ELRSearch';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import CardBody from '../common/CardBody';
import CardGroup from '../common/CardGroup';
import CardGroupCard from '../common/CardGroupCard';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';
import { defaults } from '../../utils/Global';
import * as AjaxUtils from '../../utils/AjaxUtils';
import InlineLoader from '../common/InlineLoader';
import AssignmentHistory from './AssignmentHistory';
import FilterEvents from './FilterEvents';
import ProcessingHistory from './ProcessingHistory';
import { FaPlus, FaMinus } from 'react-icons/fa';
import LoincMaster from './LoincMaster';
import Snomed from './Snomed';

type Props = {
    item: any;
    selectedObservationKeys: number[];
    properties: ColumnProperty[]
} & typeof actionCreators;

type State = {
    loading: boolean,
    error: string,
    processingShown: boolean
};

class SearchResultsTableRow extends React.Component<Props, State> {

    state = {
        loading: false,
        error: '',
        processingShown: false
    }

    constructor(props: Props) {
        super(props);
        this.onSelectClick = this.onSelectClick.bind(this);
        this.toggleProcessing = this.toggleProcessing.bind(this);
    }

    private toggleProcessing(e: any) {
        this.setState({ processingShown: !this.state.processingShown });
    }

    private async onSelectClick(e: any) {
        e.preventDefault();

        const { selectObservation, unSelectObservation, selectedObservationKeys } = this.props;

        const observationKey = parseInt(e.currentTarget.name);
        const county = e.currentTarget.value;

        if (selectedObservationKeys.indexOf(observationKey) > -1) {
            unSelectObservation(observationKey, county)
        } else {

            try {
                this.setState({ loading: true });

                const hasFilter = await AjaxUtils.get(`api/elrsearch/${observationKey}/has-filter`);

                if (hasFilter) {
                    selectObservation(observationKey, county);
                } else {
                    this.setState({ error: 'No filter found' });
                }

            } catch (err) {
                console.log(err);
            } finally {
                this.setState({ loading: false });
            }
        }
    };

    public shouldComponentUpdate(nextProps: Props, nextState: State) {
        const { selectedObservationKeys, item } = this.props;
        const indexOne = selectedObservationKeys.indexOf(item.observationKey) > -1;
        const indexTwo = nextProps.selectedObservationKeys.indexOf(item.observationKey) > -1;

        return indexOne !== indexTwo || this.state !== nextState;
    }

    public render() {

        const { item, selectedObservationKeys, properties } = this.props;
        const { loading, error, processingShown } = this.state;

        const isSelected = selectedObservationKeys.indexOf(item.observationKey) > -1;

        return <tbody className={`${processingShown ? "shadow rounded" : ""}`}>
            <tr className={`${isSelected ? 'table-success' : ''}`}>
                <td className="no-wrap d-flex-justify-between">
                    <span>
                        {loading && <InlineLoader color="primary" size="sm" />}
                        {!loading && !error &&
                            <button
                                className={`btn ${isSelected ? "btn-success" : "btn-secondary"} btn-round`}
                                type="button" name={item.observationKey} value={item.patientCountyCode}
                                onClick={this.onSelectClick}
                            >
                                {isSelected ? <FaCheckCircle fontSize="22" /> : <FaCircle fontSize="22" />}
                            </button>
                        }
                        {!loading && error && <span className="text-danger">{error}</span>}
                    </span>
                    <button className="btn btn-link" onClick={this.toggleProcessing} title="Show details">
                        {processingShown ? <FaMinus fontSize={defaults.iconSize} /> : <FaPlus fontSize={defaults.iconSize} />}
                    </button>
                </td>
                {properties.map(property => <td className="no-wrap" data-title={property.name} key={property.name}>
                    {property.wasSearched && <mark>{item[property.name]}</mark>}
                    {!property.wasSearched && <span>{item[property.name]}</span>}
                </td>)}
            </tr>
            {processingShown &&
                <tr className={`${processingShown ? 'table-light' : ''}`}>
                    <td colSpan={properties.length + 1} className="border-0 pb-4 pr-4 pl-4 pt-2">
                        <div style={{ width: "90vw" }}>
                            <CardGroup>
                                <CardGroupCard heading="Processing History">
                                    <ProcessingHistory observationKey={item.observationKey} />
                                </CardGroupCard>
                                <CardGroupCard heading="Filter">
                                    <FilterEvents eventId={item.iD_MERLIN_EVENT} />
                                </CardGroupCard>
                                <CardGroupCard heading="LOINC">
                                    <LoincMaster observationCode={item.observationCode} />
                                </CardGroupCard>
                                <CardGroupCard heading="SNOMED">
                                    <Snomed resultCode={item.resultCode} />
                                </CardGroupCard>
                                <CardGroupCard heading="Assignment History">
                                    <AssignmentHistory familyId={item.iD_MERLIN_FAMILY} />
                                </CardGroupCard>                               

                            </CardGroup>
                        </div>
                    </td>
                </tr>
            }
        </tbody>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            selectedObservationKeys: state.elrSearch.selectedObservationKeys,
            properties: state.elrSearch.columnProperties
        }
    },
    actionCreators
)(SearchResultsTableRow);