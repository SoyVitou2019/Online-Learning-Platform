import { useState } from "react";

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectCategory = (category) => {
    onSelectCategory(category);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleToggleDropdown}
        className="bg-blue-500 text-white px-4 py-2 rounded "
      >
        {selectedCategory || "All"}
      </button>

      {isOpen && (
        <div className="absolute mt-2 p-2 bg-white rounded shadow">
          <button
            className="block  hover:bg-gray-100"
            onClick={() => handleSelectCategory("")}
          >
            All
          </button>
          {categories.map((category, index) => (
            <button
              className="block hover:bg-gray-100"
              key={index}
              onClick={() => handleSelectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
