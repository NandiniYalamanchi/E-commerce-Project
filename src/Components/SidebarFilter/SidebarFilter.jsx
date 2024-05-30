
import React, { useState } from 'react';
import './SidebarFilter.scss';

const SidebarFilter = ({ brandsFilter, categoriesFilter, onBrandChange, onCategoryChange }) => {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const initialShowCount = 20;

  const handleShowMore = () => {
    setShowAllBrands(!showAllBrands);
  };

  const handleBrandSelection = (brand) => {
    const newBrand = selectedBrand === brand ? "" : brand;
    setSelectedBrand(newBrand);
    onBrandChange(newBrand);
  };

  const handleCategorySelection = (category) => {
    const newCategory = selectedCategory === category ? "" : category;
    setSelectedCategory(newCategory);
    onCategoryChange(newCategory);
  };

  return (
    <div className='SidebarCont'>
      <h1 className='text-lg mb-2 font-bold'>BRANDS</h1>
      {brandsFilter.slice(0, showAllBrands ? brandsFilter.length : initialShowCount).map((data, index) => (
        <div key={index} className='flex items-center'>
          <input
            type="checkbox"
            checked={selectedBrand === data.name}
            onChange={() => handleBrandSelection(data.name)}
            className='mr-3 scale-150'
          />
          <label htmlFor="" className='text-xl'>{data.name}</label>
        </div>
      ))}
      {brandsFilter.length > initialShowCount && (
        <button
          className='mt-2 text-blue-500'
          onClick={handleShowMore}
        >
          {showAllBrands ? 'Show Less' : 'Show More'}
        </button>
      )}

      <h1 className='text-lg mb-2 font-bold'>CATEGORIES</h1>
      {categoriesFilter.map((data, index) => (
        <div key={index} className='flex items-center'>
          <input
            type="checkbox"
            checked={selectedCategory === data.name}
            onChange={() => handleCategorySelection(data.name)}
            className='mr-3 scale-150'
          />
          <label htmlFor="" className='text-xl'>{data.name}</label>
        </div>
      ))}
    </div>
  );
}

export default SidebarFilter;

