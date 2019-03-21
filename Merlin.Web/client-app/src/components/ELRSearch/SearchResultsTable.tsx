import * as React from 'react';
import Alert from '../common/Alert';
import { actionCreators, ColumnProperty } from '../../store/ELRSearch';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import CardGroupCard from '../common/CardGroupCard';
import SearchResultTableRow from './SearchResultTableRow';
import DropdownMenu from '../common/DropdownMenu';
import DropdownMenuItem from '../common/DropdownMenuItem';
import Modal, { ModalWidth } from '../common/Modal';
import ForceImport from './ForceImport';
import CreateAssignment from './CreateAssignment';
import { toast } from 'react-toastify';
import { createToast } from '../../utils/UIUtils';
import Secure from '../common/Secure';
import { ClaimType, Role } from '../../store/Session';

type SearchResultsTableProps = {
    items: any[];
    selectedObservationKeys: number[];
    properties: ColumnProperty[]
} & typeof actionCreators;

class SearchResultsTable extends React.Component<SearchResultsTableProps> {

    state = {
        forceImportVisable: false,
        assignElrVisable: false
    };
    constructor(props: SearchResultsTableProps) {
        super(props);
        this.onRefilter = this.onRefilter.bind(this);
        this.toggleForceImport = this.toggleForceImport.bind(this);
        this.toggleAssignElr = this.toggleAssignElr.bind(this);
    }

    public async onRefilter(e: any) {
        e.preventDefault();
        const { refilter } = this.props;

        const errors = await refilter();

        createToast(errors, 'Save Successful.');
    }

    public toggleForceImport() {
        const { forceImportVisable } = this.state;

        this.setState({ forceImportVisable: !forceImportVisable });
    }

    public toggleAssignElr() {
        const { assignElrVisable } = this.state;

        this.setState({ assignElrVisable: !assignElrVisable });
    }

    public render() {

        const { forceImportVisable, assignElrVisable } = this.state;
        const { items, properties, selectedObservationKeys } = this.props;

        if (!items || items.length === 0) {
            return <div className="mt-3">
                <Alert alertType="warning">
                    No data to display
                </Alert>
            </div>;
        }

        return <div className="mt-3">
            <CardGroupCard heading="Search Results">
                <div className="table-responsive" style={{ maxHeight: '600px' }}>
                    <table className="table table-sm table-mobile-compact sticky-headers mb-0">
                        <thead className="thead-light">
                            <tr>
                                <th className="text-center" style={{ zIndex: 3 }}>
                                    <Secure requireClaim={ClaimType.role} requireClaimValue={[Role.Admin]}>
                                        <DropdownMenu
                                            menuText="Action"
                                            menuContextClass="danger"
                                            buttonShape="square"
                                            disabled={selectedObservationKeys.length === 0}
                                            disabledMessage="Please select a record"
                                        >
                                            <DropdownMenuItem onClick={this.onRefilter}>
                                                Refilter
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={this.toggleForceImport}>
                                                Force Import
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={this.toggleAssignElr}>
                                                Create Assignment
                                            </DropdownMenuItem>
                                        </DropdownMenu>
                                    </Secure>
                                </th>
                                {properties.map(property => <th className="text-capitalize" key={property.name}>{property.name}</th>)}
                            </tr>
                        </thead>
                        {items.map(item => <SearchResultTableRow item={item} key={item.observationKey} />)}
                    </table>
                </div>
            </CardGroupCard>

            <Modal
                toggle={this.toggleForceImport}
                visible={forceImportVisable}
                title="Force Import"
                body={<ForceImport closeOnClick={this.toggleForceImport} />}
                footer={<div></div>}
                modalWidth={ModalWidth.large}
            />
            <Modal
                toggle={this.toggleAssignElr}
                visible={assignElrVisable}
                title="Create Assignment"
                body={<CreateAssignment closeOnClick={this.toggleAssignElr} />}
                footer={<div></div>}
                modalWidth={ModalWidth.large}
            />

        </div>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            items: state.elrSearch.searchData,
            selectedObservationKeys: state.elrSearch.selectedObservationKeys,
            properties: state.elrSearch.columnProperties
        };
    },
    actionCreators
)(SearchResultsTable);
