import * as React from 'react';
import * as CaseStore from '../../store/Case';
import Alert from '../common/Alert';
import CollapsibleCard from '../common/CollapsibleCard';
import YesNo from '../common/YesNo';
import { defaults } from '../../utils/Global';

interface LabListItemProps {
    lab: CaseStore.Lab;
}

export class LabListItem extends React.Component<LabListItemProps> {

	state = {
		lab: this.props.lab
	};
	constructor(props: LabListItemProps) {
		super(props);
		this.createLabUrl = this.createLabUrl.bind(this);
		this.inStateLab = this.inStateLab.bind(this);
	}

	public render() {
		const { lab } = this.state;

		return <tr>
			<td data-title="FL Disease Code #">{`${lab.nameIcd9} - ${lab.icd9}`}</td>
			<td data-title="Lab #"><a href={this.createLabUrl()}>{lab.labId}</a></td>
			<td data-title="Accession #">{lab.accession}</td>
			<td data-title="Event Date">{lab.eventDate ? lab.eventDate : 'No Event Date'}</td>
			<td data-title="Reported">{lab.reportDate ? lab.reportDate : 'Not Reported'}</td>
			<td data-title="Specimen">{lab.specimen}</td>
			<td data-title="Overall Result">{lab.overallResult}</td>
			<td data-title="Test">{lab.labTest}</td>
			<td data-title="Result Detail">{lab.resultDetail} </td>
			<td data-title="State Lab">{this.inStateLab()}</td>
		</tr>;
    }

	private createLabUrl() {
		const { lab } = this.state;

		return `${defaults.urls.case}?param=LabID=${lab.labId}&ProfileID=${lab.profileId}&CaseID=0&ICD9=${lab.icd9}&Reset=True`;
	}

	private inStateLab() {
		const { lab } = this.state;

		return <YesNo
			name={lab.labId.toString()}
			label={''}
			value={lab.stateLab ? 'YES' : 'NO'}
			hideLabel={true}
			isReadOnly={true}
		/>;
	}
}
