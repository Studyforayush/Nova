import React from 'react';

const DataTable = ({ columns, data, emptyMessage = "No data available." }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#2a2a2a] bg-[#111111]">
      <table className="w-full text-left text-sm text-gray-400">
        <thead className="text-xs text-gray-500 uppercase bg-[#1a1a1a] border-b border-[#2a2a2a]">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} scope="col" className="px-6 py-4 font-medium tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={`transition-colors duration-200 hover:bg-[#1a1a1a] ${rowIndex !== data.length - 1 ? 'border-b border-[#2a2a2a]' : ''}`}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-white">
                    {typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
