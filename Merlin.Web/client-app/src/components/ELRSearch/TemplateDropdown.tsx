import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { actionCreators as ElrSearchActions } from '../../store/ELRSearch';
import Dropdown from '../common/Dropdown';
import { getOptions } from '../../utils/UIUtils';
import { DropdownCode } from '../../utils/Global';


type TemplatesDropdownProps = {
    id: number;
    templates: DropdownCode[]
} & typeof ElrSearchActions;

class TemplateDropdown extends React.Component<TemplatesDropdownProps> {

    state = {
        error: {},
    };

    constructor(props: TemplatesDropdownProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public async componentWillMount() {
        try {
           await this.props.loadTemplates();
        } catch (err) {
            console.log(err);
        }
    }

    public render() {
        const { id} = this.props;

        return <Dropdown
            cols={4}
            label="Search Criteria"
            name="name"
            value={id}
            options={this.getOptionList()}
            placeholder={'Choose a Template'}
            onChange={this.onChange}
            isMulti={false}
            isReadOnly={false}
        />;
    }

    private onChange(name: string, newValue: any) {
        let tname = '';

        if (parseInt(newValue) > 0) {
            tname = getOptions(this.props.templates)
                .filter(option => option.value === newValue)[0].label;
        } else if (parseInt(newValue) === -1) { tname = 'CREATE NEW TEMPLATE'; }

        this.props.clearSearch();
        this.props.selectTemplate(tname, parseInt(newValue));
    }

    private getOptionList() {
        let optionsList = [{ label: 'CREATE NEW TEMPLATE', value: '-1' },
            { className: 'dropdown-divider', disabled: true }
        ];

        return optionsList.concat(getOptions(this.props.templates));
    }

}

export default connect(
    (state: ApplicationState) => {
        return {
            id: state.elrSearch.templateID,
            templates: state.elrSearch.templates
        };
    },
    ElrSearchActions
)(TemplateDropdown);
