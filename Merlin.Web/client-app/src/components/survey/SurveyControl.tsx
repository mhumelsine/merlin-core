import * as React from 'react';
import { LayoutItemProps } from './LayoutItem';
import LabList from '../case/LabList';
import { ControlType } from '../../store/Layout';
import Symptoms from '../case/Symptoms';
import Section from './Section';
import HealthCareVisitList from '../case/HealthCareVisitList';
import TravelHistory from '../case/TravelHistory';
import EpiLinks from '../case/EpiLinks';
import LabSummary from '../case/LabSummary';
import VaccinationHistory from '../case/VaccinationHistory';
import Treatments from '../case/Treatments';
import OutbreakLabList from '../Outbreak/OutbreakLabList';

export default class SurveyControl extends React.Component<LayoutItemProps> {

    private renderControl() {
        const { item } = this.props;

		switch (item.id) { 
            case ControlType.LabResults:
                return <LabList />;
            case ControlType.Symptoms:
                return <Symptoms/>;
            case ControlType.HealthCareVisits:
                return <HealthCareVisitList/>;
            case ControlType.Epilinks:
                return <EpiLinks/> 
            case ControlType.TravelHistory:
                return <TravelHistory/>;
            case ControlType.LabSummary:
                return <LabSummary/>;
            case ControlType.VaccinationHistory:
                return <div>Vaccination History incomplete</div>;//<VaccinationHistory />;
            case ControlType.Treatments:
                return <Treatments />;
            case ControlType.OutbreakLabList:
                return <OutbreakLabList />;
            default:
                return <div>{`No control with id '${item.id}'`}</div>;
        }
    }

    public render() {
		const { item, isEditable } = this.props;

		return <Section item={item}>
            {this.renderControl()}
        </Section>;
    }
}