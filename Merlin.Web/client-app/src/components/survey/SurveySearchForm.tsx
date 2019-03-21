import * as React from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import TextInput from '../common/TextInput';
import Dropdown from '../common/Dropdown';
import { ChangeEvent } from 'react';
import * as CodeStore from '../../store/Code';
import { Link } from 'react-router-dom';
import { defaults } from '../../utils/Global';

interface SurveyFormProps {
    onChange: (name: string, newValue: any) => void;
    surveyTypeCodes: CodeStore.DropdownCode[];
    icd9Codes: CodeStore.DropdownCode[];
    name: string;
    surveyTypes: string[];
    icd9: string;
    onSearch: (e: any) => void;
}

export default class SurveySearchForm extends React.Component<SurveyFormProps, {}> {
    input: any = undefined;

    public componentDidMount() {
        this.input.focus();
    }

    private getCodeOptions(options: any[]) {
        return options.map(option => {
            return { label: option.description, value: option.code }
        });
    }

    public render() {
        const { onSearch, onChange, surveyTypes, surveyTypeCodes, icd9Codes, icd9, name } = this.props
        const { surveyTypesInput, outbreakInput, diseaseCodeInput, layoutDescriptionInput } = defaults.inputs.dropdowns
        const { surveySearchInput, surveyDescriptionInput } = defaults.inputs.textInputs
        const { effectiveDateInput } = defaults.inputs.datePickers

        return <form className="row" onSubmit={onSearch}>
			<Dropdown
				cols={6}
				label={diseaseCodeInput.label}
				hideLabel={true}
				name={"icd9"}
				value={icd9}
				options={this.getCodeOptions(icd9Codes)}
				placeholder={diseaseCodeInput.placeholder}
				onChange={onChange}
				isMulti={false}
				isReadOnly={false}
			/>

            <Dropdown
                cols={6}
                label={surveyTypesInput.label}
                hideLabel={true}
                name={surveyTypesInput.name}
                value={surveyTypes}
                options={this.getCodeOptions(surveyTypeCodes)}
                placeholder={surveyTypesInput.placeholder}
                onChange={onChange}
                isMulti={true}
                isReadOnly={false}
            />
            
			<TextInput
				cols={12}
				label={surveySearchInput.label}
				hideLabel={true}
				name={surveySearchInput.name}
				value={name}
				placeholder={surveySearchInput.placeholder}
				onChange={onChange}
				inputRef={(input: any) => { this.input = input }}
				isReadOnly={false}
			/>
			<div className="form-group col-md-12">
				<Link to="/layout/new" className={defaults.theme.buttons.class}>
					<FaPlus />
					{" "}
					New Layout
                    </Link>
			</div>
        </form>;
    }
}