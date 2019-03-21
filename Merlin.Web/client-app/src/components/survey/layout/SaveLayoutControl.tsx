import * as React from 'react';
import TextInput from '../../common/TextInput';
import TagInput from '../../common/TagInput';

type LayoutPageProps = {
	onChange: (name: string, value: any) => void;
	layoutName: string;
	tags: string[];
	errors: any
	};

export default class SaveLayoutControl extends React.Component<LayoutPageProps> {

	constructor(props: LayoutPageProps) {
		super(props);

		this.onChange = this.onChange.bind(this);
	}

	public render() {

		const { layoutName, tags, errors } = this.props;
		const tagOptions = (tags || []).map(tag => { return { label: tag, value: tag }; });


		return <div className="row">
			<div className="col-md-8 offset-md-2">
					<TextInput
						name="layoutName"
						label="Layout Name"
						maxLength={255}
						value={layoutName}
						onChange={this.onChange}
						error={errors.layoutName}
					/>

					<TagInput
						name="tags"
						label="Tags"
						value={tags}
						isMulti={true}
						placeholder="Enter some keywords"
						options={tagOptions}
						onChange={this.onChange}
					/>
			</div>
		</div>;
	}

	private onChange(name: string, value: any) {
		this.props.onChange(name, value);
	}
}
