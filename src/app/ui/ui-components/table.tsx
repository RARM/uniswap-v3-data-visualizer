import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

export type TableProps = {
  headings: { text: string; tooltip?: string }[];
  entries: { text: string; tooltip?: string }[][];
  entriesPerPage?: number;
};

const Table: React.FC<TableProps> = ({ headings, entries, entriesPerPage = 10 }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const tableSpring = useSpring({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(-20px)',
    config: { tension: 200, friction: 20 },
  });

  const totalPages = Math.floor(entries.length / entriesPerPage);
  const currentEntries = entries.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <animated.table style={tableSpring} className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <thead>
            <tr>
              {headings.map((heading, index) => (
                <th
                  key={index}
                  className={`px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 ${heading.tooltip ? 'underline decoration-dashed decoration-1' : ''}`}
                  title={heading.tooltip || ''}
                >
                  {heading.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((row, rowIndex) => {
              const rowSpring = useSpring({
                from: { opacity: 0, transform: 'translateY(20px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
                delay: rowIndex * 100,
              });

              return (
                <animated.tr
                  key={rowIndex}
                  style={rowSpring}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {row.map((entry, colIndex) => {
                    const cellSpring = useSpring({
                      from: { opacity: 0, transform: 'translateY(20px)' },
                      to: { opacity: 1, transform: 'translateY(0)' },
                      delay: colIndex * 100,
                    });

                    return (
                      <animated.td
                        key={colIndex}
                        style={cellSpring}
                        className={`px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 ${entry.tooltip ? 'underline decoration-dashed decoration-1' : ''}`}
                        title={entry.tooltip || ''}
                      >
                        {entry.text}
                      </animated.td>
                    );
                  })}
                </animated.tr>
              );
            })}
          </tbody>
        </animated.table>
      </div>
      {totalPages > 1 && (
        <div className="flex mt-4 justify-between">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;