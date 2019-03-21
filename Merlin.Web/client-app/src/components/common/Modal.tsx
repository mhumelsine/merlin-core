import * as React from 'react';

export enum ModalWidth {
    small = 'modal-sm',
    large = 'modal-lg'
}

type ModalProps = {
    visible: boolean;
    toggle: () => void;
    title: string;
    body: any;
    footer?: any;
    modalWidth?: ModalWidth;
};

export default class Modal extends React.Component<ModalProps> {
    public render() {
        const { visible, toggle, title, body, footer } = this.props;

        if (!visible) { return null; }

        return <div>
            {visible && <div className="modal-backdrop fade in" style={{ "opacity": 0.4 }} />}
            <div className={`modal`} style={{ display: visible ? 'block' : 'none' }} tabIndex={-1} role="dialog">
                <div className={`modal-dialog ${this.props.modalWidth ? this.props.modalWidth : ''}`} role="document">
                    <div className="modal-content">
                        {title &&
                            <div className="modal-header bg-primary text-white">
                                <h4 className="modal-title">{title}</h4>
                                <button type="button" className="close text-white" onClick={toggle} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                        }
                        <div className="modal-body" style={{ maxHeight: "80vh", overflowY: "scroll" }}>
                            {body}
                        </div>
                        {footer &&
                            <div className="modal-footer">
                                {footer}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>

    }
}