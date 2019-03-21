import * as React from 'react';
import * as utils from '../../utils/UIUtils';
import LayoutItem, { LayoutItemProps } from './LayoutItem';
import CollapsibleCard from '../common/CollapsibleCard';
import TextInput from '../common/TextInput';
import { defaults } from '../../utils/Global';
import * as LayoutStore from '../../store/Layout';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index'; 

type SectionProps = {}
    & typeof LayoutStore.actionCreators
	& LayoutItemProps; 

class Section extends React.Component<SectionProps> {
    state = {
		section: {} as LayoutStore.LayoutItem 		 
    };

    constructor(props: any) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
		this.onBlur = this.onBlur.bind(this);
    }     
    public componentWillMount() {
        this.setState({ section: this.props.item });
    }

    private onKeyPress(event: any) {
        if (event.key === 'Enter') { 
            let section = Object.assign({}, this.state.section) as any;
            section.isEditMode = false;
            
            this.props.saveLayoutItem(section.parentId, section);
        }
    }

    private onBlur() {
        const { section } = this.state; 

        const parentId = section.parentId ? section.parentId : '0';
        section.isEditMode = false;

        this.props.saveLayoutItem(parentId, section); 
    }

    private onChange(name: string, value: string) { 
        let section = Object.assign({}, this.state.section) as any;

        section[name] = value;

        this.setState({ section });
    }

    private EditableTitle() {
        const { sectionTitleInput } = defaults.inputs.textInputs
        const { section } = this.state;

        if (section.isEditMode) { 
            return <TextInput
                cols={12}
                label={""}
                hideLabel={true}
                name={sectionTitleInput.name}
                value={section.title}
                placeholder={sectionTitleInput.placeholder}
                onChange={this.onChange}
                isReadOnly={false}
                error={""}
                autoFocus={true}
                onBlur={this.onBlur}
                onKeyPress={this.onKeyPress}
            />
        }
        else {
            return section.title;
        }
	}
    public render(): any {

        const { item, onAnswerChanged, answers, children } = this.props;

		// code commented on purpose, this will show in preview mode the next functionality with accourdions
		//if (previewMode) {
		//	return <div>
		//		{children}
		//	</div>
		//} else {

			return <CollapsibleCard
				heading={
					this.EditableTitle()
                }
                className="mb-0"
				body={children}
				initiallyCollapsed={false}
			/>;
		//}
    }
} export default connect(
    (state: ApplicationState) => {
        return {
            layout: state.layout
        }
    }, LayoutStore.actionCreators
)(Section);

