import * as React from 'react';
import { defaults } from '../../utils/Global';

type EditCharmProps = {
    isOpen: boolean;
    offset: string;
    title: string;
    onCloseCharm: () => void;
};

export default class EditCharm extends React.Component<EditCharmProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {

        const { isOpen, offset, title, onCloseCharm, children } = this.props;
        const charmClass = isOpen ? 'charmOpen' : 'charmClosed';
        const charmWidth = isOpen ? defaults.charmWidth + 'px' : '0px';

        return <div className={`subMenu ${charmClass}`} style={{ 'left': offset, width: charmWidth }}>
            <div className="close" onClick={onCloseCharm}>x</div>
            <h3 className="text-center text-capitalize">{title}</h3>

            <div className="editCharm">
                {this.props.children}
            </div>

        </div>;
    }
}
