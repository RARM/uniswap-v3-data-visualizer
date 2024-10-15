import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

export type TableProps = {
  headings: { text: string; tooltip?: string }[];
  entries: { text: string; tooltip?: string }[][];
};

const Table: React.FC<TableProps> = ({ headings, entries }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const tableSpring = useSpring({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(-20px)',
    config: { tension: 200, friction: 20 },
  });

  return (
    <div>
      <animated.table style={tableSpring} className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th
                key={index}
                className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-left text-sm font-semibold text-gray-700 dark:text-gray-300"
                title={heading.tooltip || ''}
              >
                {heading.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((row, rowIndex) => {
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
                      className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300"
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
  );
};

export default Table;