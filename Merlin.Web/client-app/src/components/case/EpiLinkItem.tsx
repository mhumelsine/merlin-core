import * as React from 'react';
import { EpiLink } from '../../store/Case';
import { defaults } from '../../utils/Global';

interface EpiLinkItemProps {
    epiLink: EpiLink;
}

export default class EpiLinkItem extends React.Component<EpiLinkItemProps> {

    public render() {
        const { relationshipType, firstName, lastName, caseId, dxStatus, flDiseaseCode, eventDate, profileId, icd9} = this.props.epiLink;

		      return <tr>
			<td data-title="Relationship Type"><a href="#"> { relationshipType }</a> </td>
			<td data-title="Name">{`${lastName},${firstName}`}</td>
			<td data-title="Case #"><a href={`${defaults.urls.case}?param=ProfileID=${profileId}&CaseID=${caseId}&ICD9=${icd9}`}>{caseId}</a> </td>
			<td data-title="DX Status">{ dxStatus }</td>
			<td data-title="FL Disease Code"> {flDiseaseCode} </td>
			<td data-title="Event Date"> {eventDate} </td>
		</tr>;
    }
}
