
import React, { useEffect, useState } from 'react';
import Product from '../../Components/Product/Product.jsx';
import './ProductsPage.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SidebarFilter from '../../Components/SidebarFilter/SidebarFilter.jsx';
import Loader from '../../Components/loader/Loader.jsx';
import axios from 'axios';

const ProductsPage = () => {
  
  const [showSortBy, setShowSortBy] = useState(false);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allowedSort, setAllowedSorts] = useState([]);
  const [selectedSortMethod, setSelectedSortMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getProducts = (page = 1) => {
    setLoading(true);
    let url = `http://170.64.134.195/products?page=${page}&`;
    if (selectedBrand) url += `brand=${selectedBrand}&`;
    if (selectedCategory) url += `search_term=${selectedCategory}&`;
    if (selectedSortMethod) url += `sortBy=${selectedSortMethod}&`;

    axios.get(url)
      .then(response => {
        setProducts(response.data.products);
        setTotalPages(response.data.pagination.totalPages);
        setCurrentPage(response.data.pagination.currentPage);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    axios.get("http://170.64.134.195/products")
      .then(response => {
        setBrands(response.data.brands);
        setCategories(response.data.categories);
        setAllowedSorts(response.data.allowedSortFields);
        setProducts(response.data.products);
        setTotalPages(response.data.pagination.totalPages);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching initial data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getProducts(1);
  }, [selectedBrand, selectedCategory, selectedSortMethod]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sortBy) => {
    setSelectedSortMethod(sortBy);
    setCurrentPage(1);
  };

  const handlePageClick = (page) => {
    getProducts(page);
  };

  const renderPagination = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className='Products-cont'>
      {loading && <Loader />}
      <div className='filters-container'>
        <h3 className='text-xl'>Filters</h3>
        <div className='border-grey border-[1px] p-2 rounded-sm flex relative min-w-[20vw]'>
          <p className='cursor-pointer flex text-center' onClick={() => setShowSortBy(!showSortBy)}>
            Sort by: {selectedSortMethod || allowedSort[0]} <KeyboardArrowDownIcon />
          </p>
          <div className='absolute z-10 top-10 bg-white min-w-[20vw] left-[-1px] border-collapse' style={showSortBy ? { display: "" } : { display: "none" }}>
            {allowedSort.map((data) => (
              <p key={data} className='p-2 border-grey border-[1px] cursor-pointer' onClick={() => handleSortChange(data)}>
                {data}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className='flex w-[100vw]'>
        <SidebarFilter
          brandsFilter={brands}
          categoriesFilter={categories}
          onBrandChange={handleBrandChange}
          onCategoryChange={handleCategoryChange}
        />
        <div className='flex flex-wrap w-[80vw] justify-center'>
          {products.length > 0 ? (
            products.map((data) => (
              <Product key={data.id} product={data} />
            ))
          ) : (
            <h1 className='text-center font-bold m-10'>No More Product(s) Found</h1>
          )}
        </div>
      </div>
      <div className='pagination'>
        {renderPagination()}
      </div>
    </div>
  );
};

export default ProductsPage;

