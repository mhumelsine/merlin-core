import * as React from 'react';
import Dropdown from '../common/Dropdown';
import * as OutbreakState from '../../store/Outbreak';
import { getOptions } from '../../utils/UIUtils';
import { ApplicationState } from '../../store/index';
import { connect } from 'react-redux';
import * as CodeStore from '../../store/Code';
import CustomDatePicker from '../common/CustomDatePicker';
import TextInput from '../common/TextInput';
import { defaults } from '../../utils/Global';
import Loading from '../common/Loading';
import TextAreaInput from '../common/TextAreaInput';


type DocumentItemProps = {
    documentItem: OutbreakState.Document;
    onChangeItem: (documentItem: OutbreakState.Document) => void;
}

export default class DocumentItem extends React.Component<DocumentItemProps> {

    constructor(props: DocumentItemProps) {
        super(props);

        this.onChangeItem = this.onChangeItem.bind(this);
    }
    state = {
        isLoading: defaults.boolean
    }

    private onChangeItem(name: string, newValue: any) {
        const { onChangeItem, documentItem } = this.props;
        const newState = Object.assign({}, documentItem) as any;

        newState[name] = newValue;

        onChangeItem(newState);
    }

    public render() {
        const { isLoading } = this.state;
        const { documentName, dateAdded, documentDate, documentType, userAdded } = this.props.documentItem;

        if (isLoading) {
            return <Loading />
        }

        return <div className="row" style={{ paddingTop: "20px" }}>

            <TextInput
                name={"Document"}
                value={documentName}
                label={"Document"}
                hideLabel={false}
                placeholder={''}
                isReadOnly={true}
                onChange={() => { }}
                cols={6}
                error={""}
            />
            <TextInput
                name={"DocumentType"}
                value={documentType}
                label={"Document Type"}
                hideLabel={false}
                placeholder={''}
                isReadOnly={true}
                onChange={() => { }}
                cols={3}
                error={""}
            />
            <TextInput
                name={"DocumentDate"}
                value={documentDate}
                label={"Document Date"}
                hideLabel={false}
                placeholder={''}
                isReadOnly={true}
                onChange={() => { }}
                cols={3}
                error={""}
            />
            <TextInput
                name={"UserAdded"}
                value={userAdded}
                label={"User Added"}
                hideLabel={false}
                placeholder={''}
                isReadOnly={true}
                onChange={() => { }}
                cols={3}
                error={""}
            />
            <TextInput
                name={"DateAdded"}
                value={dateAdded}
                label={"Date Added"}
                hideLabel={false}
                placeholder={''}
                isReadOnly={true}
                onChange={() => { }}
                cols={3}
                error={""}
            />
        </div>
    }
} 