import * as React from 'react';
import { FaSearch } from 'react-icons/fa';
import TextInput from '../../common/TextInput';
import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { defaults } from '../../../utils/Global';

interface QuestionSearchFormProps {
    onChange: (name: string, newValue: any) => void;
    subText: string;
    onSearch: (event: any) => void;
}

export default class QuestionSearchForm extends React.Component<QuestionSearchFormProps, {}> {
    input: any = undefined;

    public componentDidMount() {
        this.input.focus();
    }
    
    public render() {
        const { onChange, subText, onSearch } = this.props;
        const { questionSearchInput } = defaults.inputs.textInputs;

        return <form className="row" onSubmit={onSearch}>
            <TextInput
                cols={12}
                label={questionSearchInput.label}
                hideLabel={true}
                name={questionSearchInput.name}
                value={subText}
                placeholder={questionSearchInput.placeholder}
                onChange={onChange}
                inputRef={(input: any) => { this.input = input }}
                isReadOnly={defaults.boolean}
                autoComplete="off"
            />
            <div className="form-group col-sm-12">
                <button className="btn btn-primary sr-only"><FaSearch fontSize={15} style={{ paddingRight: "5px" }}/>Search</button>
            </div>
        </form>;
    }
}
