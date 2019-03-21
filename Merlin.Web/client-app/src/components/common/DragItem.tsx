import React from 'react';
import { defaults } from '../../utils/Global';
import { FaCrop } from 'react-icons/fa';

export interface DragItemProps {
    dragStart: (draggingItem: HTMLDivElement | undefined) => void;
    id: string;
    width: number;
    className: string;
    isDragging: boolean;
}

export default class DragItem extends React.Component<DragItemProps> {

    me: HTMLDivElement | undefined;

    constructor(props: DragItemProps) {
        super(props);

        this.me = undefined;

        this.onDragStart = this.onDragStart.bind(this);
    }

    private onDragStart(event: any) {
        event.preventDefault();
        this.props.dragStart(this.me);
    }

    public render() {

        const { children, id, isDragging, width, className } = this.props;
        const dragClass = isDragging ? "dragging" : "";

        return <div className={`resizable col-md-${width}`} >
            <div
                id={id}
                ref={div => this.me = div == null ? undefined : div}
                className={`drag-item ${dragClass} ${className}`}
            >

                {children}

                <button
                    onMouseDown={this.onDragStart}
                    type="button"
                    title="Drag to resize"
                    className={`drag-handle btn btn-outline-primary btn-round ${isDragging ? "active" : ""}`}
                >
                    <FaCrop fontSize={15} />
                    <span className="sr-only">Drag to resize</span>
                </button>

            </div>
        </div>;
    }
}