import * as React from 'react';
import Alert from '../common/Alert';
import { actionCreators } from '../../store/SmartGoals';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import CardGroupCard from '../common/CardGroupCard';
import { Link } from 'react-router-dom';
import { FaFolderOpen } from 'react-icons/fa';
import { defaults } from '../../utils/Global';


type SmartGoalsResultsProps = {
    results: any[];
} & typeof actionCreators;

class SmartGoalsResults extends React.Component<SmartGoalsResultsProps> {


    constructor(props: SmartGoalsResultsProps) {
        super(props);
    }
    public render() {

        const { results } = this.props;

        if (!results || results.length === 0) {
            return <div className="mt-3">
                <Alert alertType="warning">
                    No data to display
                </Alert>
            </div>;
        }

        const rejectedData = {
            labels: ['Rejected %', 'Total %'],
            datasets: [{
                data: [results[0].percentRejected, 100 - results[0].percentRejected],
                animateScale: true,
                backgroundColor: ['red', 'green']
            }]
        };

        const resolvedData = {
            labels: ['Resolved Assignments', 'Open Assignments'],
            datasets: [{
                data: [results[0].resolved, results[0].openAssignments],
                animateScale: true,
                backgroundColor: ['green', 'orange'],
            }]
        };

        const outStandingdata = {
            labels: results.map(i => i.halRegion),
            datasets: [{
                label: 'Outstanding Days',
                data: results.map(a => a.outStandingDays),
                fill: false,
                borderColor: 'blue'
            }]
        };

        const options = {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'No of days'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Regions'
                    }
                }],
            }
        };

        return <div className="mt-3">
            <Link className={`${defaults.theme.buttons.class} justify-content-end m-4`} to={`${defaults.urls.performanceReport}`}>
                <FaFolderOpen fontSize={defaults.iconSize} style={{ verticalAlign: 'bottom' }} />{' '}
                View Report
            </Link>

            <CardGroupCard heading="Performance Results">
                <div className="row mr-3 justify-content-end">
                    <h2><span className="badge badge-pill badge-primary">{results[0].days} Days</span></h2>
                </div>

                <div className="row m-3 justify-content-center">
                    {this.performanceData('Days Average', results[0].avgDaysToResolve, 'btn btn-info m-2')}
                    {this.performanceData('Open Assignments', results[0].openAssignments, 'btn btn-warning m-2')}
                </div>

                <div className="row m-3 justify-content-center">
                    {this.performanceData('Resolved', results[0].resolved, 'btn btn-success m-2',
                                          <Doughnut data={resolvedData} />, `${results[0].disposPerDay} / day`)}

                    {this.performanceData('Rejected', results[0].rejected, 'btn btn-danger m-2',
                                          <Doughnut data={rejectedData} />, `${results[0].percentRejected}%`)}

                    {this.performanceData('Total Oustanding', results.map(item => item.outStandingDays).reduce((prev, next) => prev + next),
                                          'btn btn-info m-2', <Line data={outStandingdata} options={options} />)}
                </div>
            </CardGroupCard>
        </div>;
    }

    private performanceData(name: string, count: string, classname: string, data ?: any, info?: string) {
        return <button type="button" className={classname}>
            <h1 style={{ borderBottom: '0px' }}>
               <span className="badge badge-light">{count}</span><br /> {name}
            </h1>
           <h2> <span className="badge badge-light">{info}</span></h2>
           <span className="badge badge-light col-md-12">{data}</span>
        </button>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            results: state.smartGoals.performanceInfo,
        };
    },
    actionCreators
)(SmartGoalsResults);
