import { useState } from "react";

const SortBy = ({ sortBy, sortByList, onSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectSort = (sort) => {
    onSortBy(sort);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleToggleDropdown}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {sortBy || "None"}
      </button>

      {isOpen && (
        <div className="absolute mt-2 p-2 bg-white rounded shadow z-40">
          <button className="block" onClick={() => handleSelectSort("")}>
            None
          </button>
          {sortByList.map((sortbyl, index) => (
            <button key={index} onClick={() => handleSelectSort(sortbyl)}>
              {sortbyl}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortBy;
