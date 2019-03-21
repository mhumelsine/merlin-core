import * as React from 'react';
import { defaults } from '../../utils/Global';
import DragItem from './DragItem';

export interface DragContainerProps {
    onResize: (parentId: string, itemId: string, newColWidth: number) => void;
    itemWidthAccessor: (item: any) => number;
    itemClassAccessor: (item: any) => string;
    id: string;
}

export default class DragContainer extends React.Component<DragContainerProps> {

    state = {
        isDragging: false
    };

    me: HTMLDivElement | undefined;
    itemDragging: HTMLDivElement | undefined;

    constructor(props: any) {
        super(props);

        this.me = undefined;
        this.itemDragging = undefined;

        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    private onDragStart(itemDragging: HTMLDivElement | undefined) {
        this.setState({
            isDragging: true
        });
        this.itemDragging = itemDragging;
    }

    private onDragEnd() {
        this.setState({
            isDragging: false
        });
        this.itemDragging = undefined;
    }

    private getContainerWidth() {
        if (this.me) {
            return this.me.getBoundingClientRect().width;
        }
        return defaults.number;
    }

    private getDragItemLeftPosition(): number {

        if (this.itemDragging !== undefined) {
            return this.itemDragging.getBoundingClientRect().left;            
        }

        return defaults.number;
    }

    private calcWidth(widthInPx: number) {

        const parentWidth = this.getContainerWidth();
        const itemLeftPosition = this.getDragItemLeftPosition();

        const columnWidth = parentWidth / 12;

        const widthInPxCursorOffset = columnWidth + widthInPx - itemLeftPosition;

        let column = Math.floor(widthInPxCursorOffset / columnWidth);

        if (column > 12) {
            column = 12;
        }

        if (column < 1) {
            column = 1;
        }

        return column;
    }

    private onMouseMove(event: any) {
        if (this.state.isDragging) {
            const colWidth = this.calcWidth(event.clientX);

            if (this.itemDragging !== undefined) {
                this.props.onResize(this.props.id, this.itemDragging.id, colWidth);
            }            
        }
    }

    private isDragging(id: string) {
        if (this.itemDragging) {
            return id === this.itemDragging.id;
        }
        return false;
    }

    public render() {

        const { children, itemClassAccessor, itemWidthAccessor } = this.props;

        if (!children) {
            return null;
        }

        return <div
            className="row drag-container"
            ref={div => this.me = div === null ? undefined : div}
            onMouseMove={this.onMouseMove}
            onMouseUp={this.onDragEnd}
            onMouseLeave={this.onDragEnd}
        >
            {(this.props.children as any).map((child: any) => <DragItem
                dragStart={this.onDragStart}
                id={child.key}
                key={child.key}
                isDragging={this.isDragging(child.key)}
                width={itemWidthAccessor(child.key)}
                className={itemClassAccessor(child.key)}
            >
                {child}
            </DragItem>
            )}
        </div>;
    }
}