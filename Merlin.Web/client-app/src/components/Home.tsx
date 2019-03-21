import * as React from 'react';
import SurveySearch from './survey/SurveySearch';
import LayoutSearchPage from './survey/layout/LayoutSearchPage';
import { defaults } from '../utils/Global';
import { RouteComponentProps } from 'react-router-dom';


export default class Home extends React.Component<RouteComponentProps<{}>> {
	state = {
		showSurveyView: true
	}

	constructor(props: any) {
		super(props); 
		this.onClick = this.onClick.bind(this);
	}

	private onClick(e: any) {
		e.preventDefault();
		this.setState({ showSurveyView: !this.state.showSurveyView });
	}
 
	public render() {
		const { showSurveyView } = this.state;
 
		return <div>
				<div className="btn-group btn-group-toggle pull-right" >
					<label className={defaults.theme.buttons.class + `${showSurveyView ? " " : " active"}`} onClick={this.onClick}>
						 Survey Search  
					</label>
					<label className={defaults.theme.buttons.class + `${showSurveyView ? " active" : " "}`} onClick={this.onClick}>
						 Layout Search
					</label>
				</div>

            {/*
			{showSurveyView &&
				<SurveySearch />
			}
			{!showSurveyView &&
				<LayoutSearchPage />
		     }
             */}
        </div>
	}
}
 