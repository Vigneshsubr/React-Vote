import React from 'react';

const Table = ({
  headers,
  data,
  className,
  striped,
  bordered,
  hover,
}) => {
  return (
    <div>
      <table
        className={`table ${className} ${striped ? 'table-striped' : ''} ${
          bordered ? 'table-bordered' : ''
        } ${hover ? 'table-hover' : ''}`}
      >
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
             {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;