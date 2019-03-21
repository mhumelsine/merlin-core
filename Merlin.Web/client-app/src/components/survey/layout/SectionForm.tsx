import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import TextInput from '../../common/TextInput';
import * as LayoutStore from '../../../store/Layout';
import { defaults } from '../../../utils/Global';
import * as utils from '../../../utils/UIUtils';
import Section from '../Section';
import { isNullOrEmpty } from '../../../utils/UIUtils';
import SaveButton from '../../common/SaveButton';

interface SectionFormProps {
    saveLayoutItem: (parentId: string, item: LayoutStore.LayoutItem) => void;
    layoutItem: LayoutStore.LayoutItem;
    parentId: string;
};

export default class SectionForm extends React.Component<SectionFormProps> {
    state = {
        section:this.props.layoutItem,
        error: defaults.string
    };

    constructor(props: any) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    public componentWillReceiveProps(nextProps: SectionFormProps) {
        this.setState({ section: nextProps.layoutItem });
    }

    private onChange(name: string, value: string) {
        let section = Object.assign({}, this.state.section) as any;

        section[name] = value;

        this.setState({ section });
    }

    private onSave(e: any) {
        e.preventDefault();

        const section = Object.assign({}, this.state.section);

        if (utils.isNullOrEmpty(section.title)) {
            this.setState({
                error: "Section Title is required"
            });
            return;
        }

        this.props.saveLayoutItem(this.props.parentId, section);
    }

    public render() {
        const { error, section } = this.state;
        const { title, width} = this.state.section;
        const { sectionTitleInput } = defaults.inputs.textInputs
        const { sectionWidthInput } = defaults.inputs.rangeSliders
        const { Add, Edit } = defaults.titles;
        const buttonTitle = isNullOrEmpty(this.props.layoutItem.id) ? Add : Edit;

        return <div>
            <form>
                <TextInput
                    cols={12}
                    label={sectionTitleInput.label}
                    hideLabel={false}
                    name={sectionTitleInput.name}
                    value={title}
                    placeholder={sectionTitleInput.placeholder}
                    onChange={this.onChange}
                    isReadOnly={false}
                    error={error}
                />
                <div className="form-group col-sm-12">
                    <SaveButton onClick={this.onSave} buttonText={buttonTitle} />
                </div>
            </form>

            <h4 className="text-center">Preview</h4>
            <Section item={section} />
        </div>;
    }
}


