import * as React from 'react';
import TagInput from '../../common/TagInput';
import { FaSearch } from 'react-icons/fa';
import Dropdown from '../../common/Dropdown';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import { actionCreators } from '../../../store/Layout';
import Loading from '../../common/Loading';
import { defaults } from '../../../utils/Global';

type LayoutSearchProps = {
    tags: string[],
	selectedTags: string[],
	layoutList: any

} & typeof actionCreators;

class LayoutSearchFrom extends React.Component<LayoutSearchProps> {
    state = {
        selectedTags: [] as string[],
        isLoading: true
    }

    constructor(props: LayoutSearchProps) {
        super(props);

        this.state.selectedTags = props.selectedTags;

        this.onTagsChanged = this.onTagsChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    private async search() {
		try {
            await this.props.loadLayouListFromTags(this.state.selectedTags, 1);
        } catch (err) {
            console.log(err);
        }
    }

    private async onTagsChanged(newValue: any) {

        const tags = newValue.map((option:any) => option.value);

        this.setState({ selectedTags: tags }, async () => await this.search());        
    }

    private async onSubmit(event: any) {
        event.preventDefault();

        await this.search();
    }

    public async componentWillMount() {
		const { loadLayoutTags, layoutList } = this.props;
		try {
            await loadLayoutTags();
			if (layoutList.paging.totalItems < 1) {
				await this.search();
			}
        }
        catch (err) {
            console.log(err);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    public render() {

        const { tags } = this.props;
        const { selectedTags, isLoading } = this.state;
        const tagOptions = tags.map(tag => { return { label: tag, value: tag } });

        if (isLoading) {
            return <Loading />;
        }

        return <form className="searchForm">
            <label htmlFor="tags" className="sr-only">Tags</label>
            <div className="input-group">
                <Dropdown
                    label="Tags"
                    hideLabel={true}
                    className="form-control"
                    name={name}
                    options={tagOptions}
                    placeholder="Enter some keywords"
                    value={selectedTags}
                    onChange={this.onTagsChanged}
                    isMulti={true}
                />
                <div className="input-group-append">
					<button type="submit" className={defaults.theme.buttons.class} title="Search" onClick={this.onSubmit}>
                        <FaSearch fontSize={defaults.iconSize} style={{ verticalAlign: 'bottom' }}/>
                        {" "}
                        Search
                    </button>
                </div>
            </div>
        </form>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            tags: state.layout.allTags,
			selectedTags: state.layout.selectedTags,
			layoutList: state.layout.layoutList
        }
    },
    actionCreators
)(LayoutSearchFrom);