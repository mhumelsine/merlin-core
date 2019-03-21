import * as React from 'react';
import { connect } from 'react-redux';
import { actionCreators, SearchCriteria, ColumnInfo } from '../../store/ELRSearch';
import { ApplicationState } from '../../store/index';
import Dropdown from '../common/Dropdown';
import DeleteButton from '../common/DeleteButton';
import TextInput from '../common/TextInput';


type AdvancedSearchCriteriaProps = {
    criteria: SearchCriteria;
    columnInfo: ColumnInfo[];
}
    & typeof actionCreators;

class AdvancedSearchCriteria extends React.Component<AdvancedSearchCriteriaProps>{

    constructor(props: AdvancedSearchCriteriaProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    private onChange(name: string, value: any) {
        const { columnInfo, updateCriteria } = this.props;
        const criteria = Object.assign({}, this.props.criteria) as any;
        
        criteria[name] = value;
        
        if (name === 'fqColumnName' && (value !== '')) {            
            criteria.dataType = columnInfo.filter(info => info.fqColumnName === value)[0].dataType;
        }

        if (criteria.operator === 'LIKE') {
            criteria.value = `%${criteria.value}%`;
        }

        updateCriteria(criteria);
    }

    private onRemove() {
        const { criteria, removeCriteria } = this.props;
        removeCriteria(criteria);
    }

    public render() {

        const { criteria, columnInfo } = this.props;

        const options = columnInfo.map(info => {
            return { label: info.columnName, value: info.fqColumnName }
        });

        const stringOperators = [
            { label: "=", value: "=" },
            { label: "CONTAINS", value: "LIKE" },
            { label: "<>", value: "<>" }
        ];

        const standardOperators = [
            { label: "=", value: "=" },
            { label: ">", value: ">" },
            { label: ">=", value: ">=" },
            { label: "<", value: "<" },
            { label: "<=", value: "<=" },
            { label: "<>", value: "<>" }
        ];

        

        const operators = criteria.dataType == 'string' ? stringOperators : standardOperators;


        return <div className="row">
            <Dropdown
                cols={4}
                label="Column Name"
                name="fqColumnName"
                value={criteria.fqColumnName}
                options={options}
                placeholder={""}                
                onChange={this.onChange}
                isMulti={false}
                isReadOnly={false}

            />
            <Dropdown
                name="operator"
                label="Operator"
                value={criteria.operator}
                placeholder="Select"
                options={operators}
                cols={3}
                onChange={this.onChange}
            />
            <TextInput
                name="value"
                label="Value"
                value={criteria.value.replace(/%/g, "")}
                cols={4}
                onChange={this.onChange}
            />
            <div className="col-md-1">
                <label className="control-label">Remove</label>
                <DeleteButton confirmationText="Remove Condition?" onClick={this.onRemove} buttonText=" " />
            </div>
        </div>;
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            columnInfo: state.elrSearch.columnInfo
        };
    },
    actionCreators)(AdvancedSearchCriteria);