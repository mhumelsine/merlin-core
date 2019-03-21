import * as React from 'react';
import { Layout, LayoutItemActivation, LayoutItemState } from '../../store/Layout';
import LayoutItem from './LayoutItem';
import createDefaultInterpreter from '../../utils/Interpreter';
import { defaults } from '../../utils/Global';
import CaseInfoControl from './CaseInfoControl';

export interface LayoutViewerProps {
	answers: any;
	layout: Layout;
	hideCaseInfoControl?: boolean;
	onAnswerChanged: (name: string, value: any) => void;
	errors?: any;
}

export default class LayoutViewer extends React.Component<LayoutViewerProps> {
	public render() {

		const { layout, answers, onAnswerChanged, hideCaseInfoControl, errors } = this.props;

		const { activationAliases, validationAliases, activationFunctionsNew, validationFunctionsNew } = defaults;

		const activationsInterpreterNew = createDefaultInterpreter(answers, activationFunctionsNew, activationAliases);

		const validationsInterpreterNew = createDefaultInterpreter(answers, validationFunctionsNew, validationAliases);

		let errors1 = Object.assign({}, errors);



		return <div className="layout-body">
			{!hideCaseInfoControl &&
				<div className="row align-items-center justify-content-center pb-4">
					<CaseInfoControl />
				</div>}
			<div className="row">
				{layout && layout.items && layout.items.length > 0 &&
					layout.items.map((item, index) => <LayoutItem
						key={item.id || index}
						item={item}
						answers={answers}
						onAnswerChanged={onAnswerChanged}
						errors={errors1}
						activationsInterpreter={activationsInterpreterNew}
						validationsInterpreter={validationsInterpreterNew}
					/>
					)
				}
			</div>
		</div>;

		// Code comented onpurpose, this implement the next functionality with accordions
		// return <div className="layout-body">
		// 	<div className="row align-items-center justify-content-center pb-4">
		// 		<CaseInfoControl />
		// 	</div>
		// 	{layout && layout.items && layout.items.length > 0 &&
		// 		<Accordion defaultPanelHeading={layout.items[0].title || ""} >
		// 			{layout.items.map((item, index) =>

		// 				<AccordionPanel
		// 					heading={item.title || ""}
		// 					key={index}
		// 					className="card">
		// 					<LayoutItem
		// 						key={item.id || index}
		// 						item={item}
		// 						answers={answers}
		// 						onAnswerChanged={onAnswerChanged}
		// 						errors={errors}
		// 						activationsInterpreter={activationsInterpreterNew}
		// 						validationsInterpreter={validationsInterpreterNew}
		// 					/>
		// 				</AccordionPanel>
		// 			)
		// 			}
		// 		</Accordion>
		// 	}
		// </div>


	}
}
