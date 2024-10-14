import React from 'react';

type TableProps = {
  headings: { text: string; tooltip?: string }[];
  entries: { text: string; tooltip?: string }[][];
};

const Table: React.FC<TableProps> = ({ headings, entries }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th
                key={index}
                className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700"
                title={heading.tooltip || ''}
              >
                {heading.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {row.map((entry, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700"
                  title={entry.tooltip || ''}
                >
                  {entry.text}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;