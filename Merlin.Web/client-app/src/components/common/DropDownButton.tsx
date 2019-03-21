import * as React from 'react';
import { defaults } from '../../utils/Global';

interface DropDownButtonProps {
    buttonText?: string;
    icon: any;
}

export default class DeleteButton extends React.Component<DropDownButtonProps, {}> {
    state = {
        active: false
    };
    constructor(props: DropDownButtonProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state.active = this.state.active as boolean;
    }

    public render() {
        const { children, buttonText, icon } = this.props;
        const active = this.state.active;

        return <div className="btn-group" >
            <button id="btnDeleteDropdown" type="button" className="btn btn-primary dropdown-toggle" onClick={this.onClick} aria-haspopup="true" aria-expanded="false">
                {icon}{' '}{buttonText}
            </button>
            <div className={`dropdown-menu ${active ? 'show' : ''} border-0 bg-transparent`} aria-labelledby="btnDeleteDropdown">
                {React.Children.map(children, child => React.cloneElement(child as any, { }))}
            </div>
        </div>;
    }

    private onClick(e: any) {
        e.preventDefault();
        this.setState({ active: !this.state.active });
    }
}
