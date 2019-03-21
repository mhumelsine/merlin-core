import * as React from 'react';
import { Layout, layoutItemType } from '../../store/Layout';
import { Survey } from '../../store/Survey';
import EditLayoutItem from './EditLayoutItem';
import { LayoutViewerProps } from './LayoutViewer';
import DragContainer from '../common/DragContainer';
import DragItem from '../common/DragItem';
import EditItem from './layout/EditItem';
import * as LayoutUtils from '../../utils/LayoutUtils';
import ErrorSummary from '../common/ErrorSummary';
import CaseInfoControl from './CaseInfoControl';
import AccordionPanel from '../common/AccordionPanel';
import Accordion from '../common/Accordion';

type EditLayoutViewerProps = {
    onResize: (parentId: string, itemId: string, newColWidth: number) => void;
    onEdit: (parentId: string, itemId: string) => void; 
    selectedItemId: string | null | undefined;
    errors?: any;
} & LayoutViewerProps;


export default class EditLayoutViewer extends React.Component<EditLayoutViewerProps> {

    constructor(props: EditLayoutViewerProps) {
        super(props);

        this.getItemWidth = this.getItemWidth.bind(this);
        this.getSelectedClassName = this.getSelectedClassName.bind(this);
    }

    private getItemWidth(id: string) {

        const foundItem = LayoutUtils.getItemById(this.props.layout, id) as any;

        if (foundItem) {
            return foundItem.width;
        }

        //console.log(`could not find item with id ${id} defaulting to 12 width`);

        return 12;
    }

    private getSelectedClassName(id: string): string {
        return `layout-item ${id === this.props.selectedItemId ? "active" : ""}`;
    }

    public render() {

        const { layout, answers, onAnswerChanged, onEdit, onResize, selectedItemId, errors} = this.props;
        
        return <div className="layout-body">
            {
                (Object.keys(errors).length > 0) &&
                <ErrorSummary
                    errors={errors}
                />
            }

            <DragContainer
                id={layout.layoutId}
                onResize={onResize}
                itemWidthAccessor={this.getItemWidth}
                itemClassAccessor={this.getSelectedClassName}
			> 
                {layout && layout.items &&
					layout.items.map((item, index) => 
					<EditItem
                        onEdit={onEdit}
                        id={item.id}
                        parentId={layout.layoutId}
                        type={item.type}
                        key={item.id}
                        isFirst={index === 0}
                        isLast={layout.items.length - 1 === index}                        
                        isTextHidden={item.textHidden === true}
                        showNumbering={false}
                        isNumbered={item.isNumbered === true}
                        groupAccess={item.groupAccess}
                    >
                        <EditLayoutItem
                            selectedItemId={selectedItemId}
                            onResize={onResize}
                            onEdit={onEdit}
                            id={item.id}
                            parentId={layout.layoutId}
                            item={item}
                            answers={answers}
                            onAnswerChanged={onAnswerChanged}
                            itemWidthAccessor={this.getItemWidth}
                            itemClassAccessor={this.getSelectedClassName}
                            layout={layout}
                        />
					</EditItem> )
					} 
            </DragContainer>

        </div>

    }
}