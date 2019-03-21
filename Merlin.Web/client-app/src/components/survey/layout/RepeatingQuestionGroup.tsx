import * as React from 'react';
import * as utils from '../../../utils/UIUtils';
import LayoutItem, { LayoutItemProps } from '.././LayoutItem';
import TextInput from '../../common/TextInput';
import { defaults } from '../../../utils/Global';
import * as LayoutStore from '../../../store/Layout';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import { ReactElement } from 'react';
import { isNullOrEmpty } from '../../../utils/UIUtils';

type RepeatingGroupQuestionProps = {
} & typeof LayoutStore.actionCreators
    & LayoutItemProps;

class RepeatingQuestionGroup extends React.Component<RepeatingGroupQuestionProps> {
    state = {
        repeatingGroup: {} as LayoutStore.LayoutItem
    };

    constructor(props: RepeatingGroupQuestionProps) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }
    public componentWillMount() {
		this.setState({ repeatingGroup: this.props.item });
    }

    public render(): any {

        const { item, onAnswerChanged, answers, children } = this.props;

        return <div>
            {this.editableTitle()}
            {children}
            </div>;
    }

    private onKeyPress(event: any) {
        if (event.key === 'Enter') {
            let repeatingGroup = Object.assign({}, this.state.repeatingGroup) as any;
            repeatingGroup.isEditMode = false;

            this.props.saveLayoutItem(repeatingGroup.parentId, repeatingGroup);
        }
    }

    private onBlur() {
        const { repeatingGroup } = this.state;

		      if (!isNullOrEmpty(repeatingGroup.title)) {
			const parentId = repeatingGroup.parentId ? repeatingGroup.parentId : '0';
			repeatingGroup.isEditMode = false;

			this.props.saveLayoutItem(parentId, repeatingGroup);
		}
    }

    private onChange(name: string, value: string) {
        let repeatingGroup = Object.assign({}, this.state.repeatingGroup) as any;

        repeatingGroup[name] = value;

        this.setState({ repeatingGroup });
    }

    private editableTitle() {
        const { sectionTitleInput } = defaults.inputs.textInputs;
		      const { repeatingGroup } = this.state;

		      if (repeatingGroup.isEditMode) {
			return <TextInput
				cols={6}
				label={''}
				hideLabel={true}
				name={sectionTitleInput.name}
				value={repeatingGroup.title}
				placeholder={sectionTitleInput.placeholder}
				onChange={this.onChange}
				isReadOnly={false}
				error={''}
				autoFocus={true}
				onBlur={this.onBlur}
				onKeyPress={this.onKeyPress}
			/>;
		} else {
			return <div style={{ margin: '10px' }}>
				{repeatingGroup.title}
			</div>;
			}

		}
} export default connect(
    (state: ApplicationState) => {
        return {
            layout: state.layout
        };
    }, LayoutStore.actionCreators
)(RepeatingQuestionGroup);

