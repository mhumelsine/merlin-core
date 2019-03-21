import * as React from 'react';
import Alert from './Alert';

type GenericTableProps = {
    items: any[]
};

export default class GenericTable extends React.Component<GenericTableProps> {
    public render() {

        const { items } = this.props;

        if (!items || items.length === 0) {
            return <Alert alertType="warning" className="mb-0">
                No data to display
            </Alert>;
        }

        const properties = Object.keys(items[0]);

        return <div className="table-responsive">
            <table className="table table-bordered table-striped table-mobile-compact sticky-headers mb-0">
                <thead className="thead-light">
                    <tr>
                        {properties.map((property, index) => <th key={index} className="text-capitalize">{property}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => <tr key={index} className="no-wrap">
                        {properties.map(property => <td key={property} data-title={property}>{item[property]}</td>)}
                    </tr>)}
                </tbody>
            </table>
        </div>;
    }
}