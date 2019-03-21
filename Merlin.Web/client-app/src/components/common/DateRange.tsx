import * as React from 'react';
import CustomDatePicker from './CustomDatePicker';

type DateRangeProps = {
    startDate: string;
    endDate: string;
}

export default class DateRange extends React.Component<DateRangeProps> {
    public render() {
        const { startDate, endDate } = this.props;
        return <div className="row">
            <CustomDatePicker
                name="startDate"
                value={startDate}
                cols={6}
                label="Start Date"
                hideLabel={false}
                onChange={() => console.log('changed')}
            />
            <CustomDatePicker
                name="endDate"
                value={endDate}
                cols={6}
                label="End Date"
                hideLabel={false}
                onChange={() => console.log('changed')}
            />
        </div>;
    }
}