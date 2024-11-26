import React from 'react';

const Table = ({ columns, data, actions }) => {
    return (
        <div className="table-responsive overflow-y-auto" style={{ maxHeight: '350px'}}>
            <table className="table table-striped">
                <thead className="table-primary" style={{ position: 'sticky', top: '0', zIndex: '1' }}>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} scope="col">
                                {column.header}
                            </th>
                        ))}
                        {actions && <th scope="col">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex}>
                                        {column.render
                                            ? column.render(row[column.key], row)
                                            : row[column.key] || '--'}
                                    </td>
                                ))}
                                {actions && (
                                    <td>
                                        {actions.map((action, actionIndex) => (
                                            <button
                                                key={actionIndex}
                                                className={`btn btn-${action.variant} btn-sm mx-1`}
                                                onClick={() => action.onClick(row)}
                                            >
                                                {action.label}
                                            </button>
                                        ))}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + (actions ? 1 : 0)}>
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
