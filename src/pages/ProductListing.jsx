import React, { useContext, useEffect, useMemo, useState } from "react";
// import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import {
  FaFilter,
  FaSync,
  FaTag,
  FaBriefcase,
  FaStar,
  FaChevronDown,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import ResponsivePagination from "react-responsive-pagination";
// import './pagination.css'; // see pagination.css example below

export default function ProductListing() {


  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [sortBy, setSortBy] = useState("");

  const [totalPage, setTotalPage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  useEffect(() => {
    axios
      .get(`https://wscubetech.co/ecommerce-api/products.php`, {
        params: {
          limit: 10,
          page: currentPage,
          sorting: sortBy,
          categories: selectedCategories.toString(),
          brands: selectedBrands.toString(),
        },
      })
      .then((result) => {
        setProducts(result.data.data);
        setTotalPage(result.data.total_pages);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, [currentPage, sortBy, selectedCategories, selectedBrands]);

  useEffect(() => {
    axios
      .get(`https://wscubetech.co/ecommerce-api/categories.php`)
      .then((result) => {
        // console.log(result.data.data)
        setCategories(result.data.data);

        // console.log(categories)
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://wscubetech.co/ecommerce-api/brands.php`)
      .then((result) => {
        setBrands(result.data.data);
        // console.log(brands)
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, []);

  const filterSorting = (event) => {
    setCurrentPage(1);
    setSortBy(event.target.value);
  };

  const toggleCategory = (slug) => {

    setCurrentPage(1)
    var checkCategories = selectedCategories.filter((v) => {
      if (v == slug) {
        return v;
      }
    });

    if (checkCategories.length > 0) {
      var data = selectedCategories.filter((v) => {
        if (v != slug) {
          return v;
        }
      });

      var data = [...data];
      setSelectedCategories(data);
    } else {
      const data = [...selectedCategories, slug];
      setSelectedCategories(data);

      // console.log(data);
    }
  };

  const toggleBrand = (slug) => {
    setCurrentPage(1);
    var checkBrand = selectedBrands.filter((v) => {
      if (v == slug) {
        return v;
      }
    });

    if (checkBrand.length > 0) {
      var data = selectedBrands.filter((v) => {
        if (v != slug) {
          return v;
        }
      });

      var data = [...data];
      setSelectedBrands(data);
    } else {
      const data = [...selectedBrands, slug];
      setSelectedBrands(data);

      // console.log(data);
    }
  };



  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setCurrentPage(1);
  };


  return (
    <div className="container pt-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="h1  m-0 fw-bold p-0">Our Products</h2>
        <div className="text-muted small">
          <strong></strong> results
        </div>
      </div>

      <div className="row g-2">
        {/* FILTER SIDEBAR */}
        <aside className="col-lg-3">
          <div className="sidebar-filter">
            
            <div className="filter-header mb-4 pb-4 filter-header-border">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <div className="filter-title-gradient">
                    <FaFilter />
                  </div>
                  <h5 className="mb-0 filter-title">Filters</h5>
                </div>
                <button
                  className="reset-btn"
                  onClick={resetFilters}
                  title="Reset filters"
                >
                  <FaSync className="reset-icon" />
                </button>
              </div>
            </div>

            {/* ACCORDION FOR MOBILE */}
            <div className="accordion accordion-flush filter-accordion" id="filterAccordion">
              
              {/* CATEGORY ACCORDION ITEM */}
              <div className="accordion-item filter-item">
                <h2 className="accordion-header">
                  <button className="accordion-button filter-accordion-btn d-flex align-items-center gap-2" type="button" data-bs-toggle="collapse" data-bs-target="#categoryCollapse" aria-expanded="true" aria-controls="categoryCollapse">
                    <div className="filter-icon">
                      <FaTag />
                    </div>
                    <label className="form-label mb-0 filter-label-text">
                      Category
                    </label>
                  </button>
                </h2>
                <div id="categoryCollapse" className="accordion-collapse collapse show" data-bs-parent="#filterAccordion">
                  <div className="accordion-body p-2 d-flex flex-column gap-2">
                    {categories.map((v, id) => {
                      return (
                        <div className="form-check" key={id}>
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectedCategories.includes(v.slug)}
                              onChange={() => toggleCategory(v.slug)}
                            />
                            {v.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* BRAND ACCORDION ITEM */}
              <div className="accordion-item filter-item">
                <h2 className="accordion-header">
                  <button className="accordion-button filter-accordion-btn d-flex align-items-center gap-2 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#brandCollapse" aria-expanded="false" aria-controls="brandCollapse">
                    <div className="filter-icon">
                      <FaBriefcase />
                    </div>
                    <label className="form-label mb-0 filter-label-text">
                      Brand
                    </label>
                  </button>
                </h2>
                <div id="brandCollapse" className="accordion-collapse collapse" data-bs-parent="#filterAccordion">
                  <div className="accordion-body p-2 d-flex flex-column gap-2">
                    {brands.map((v, id) => {
                      return (
                        <div className="form-check" key={id}>
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectedBrands.includes(v.slug)}
                              onChange={() => toggleBrand(v.slug)}
                            />
                            {v.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RATING ACCORDION ITEM */}
              <div className="accordion-item filter-item">
                <h2 className="accordion-header">
                  <button className="accordion-button filter-accordion-btn d-flex align-items-center gap-2 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ratingCollapse" aria-expanded="false" aria-controls="ratingCollapse">
                    <div className="filter-icon">
                      <FaStar />
                    </div>
                    <label className="form-label mb-0 filter-label-text">
                      Min Rating
                    </label>
                  </button>
                </h2>
                <div id="ratingCollapse" className="accordion-collapse collapse" data-bs-parent="#filterAccordion">
                  <div className="accordion-body p-2">
                    <select
                      className="form-select filter-input filter-select-cursor"
                      onChange={(e) => {
                        setRatingMin(e.target.value);
                        setPage(1);
                      }}
                    >
                      <option value="">Any Rating</option>
                      <option value="4.5">⭐⭐⭐⭐⭐ 4.5+</option>
                      <option value="4">⭐⭐⭐⭐ 4.0+</option>
                      <option value="3.5">⭐⭐⭐ 3.5+</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* CLEAR FILTERS BUTTON */}
            <button
              className="btn btn-outline-primary w-100 filter-btn-clear filter-btn-text mt-3"
              onClick={resetFilters}
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="col-lg-9">
          {/* Sort Bar */}
          <div className="d-flex justify-content-between align-items-center mb-4 p-4 bg-white rounded sort-bar">
            <div className="small sort-bar-text">
              <strong>{products.length} Products Showing</strong>
              {/* <strong>{filtered.length}</strong> products */}
            </div>
            <div className="d-flex gap-3 align-items-center">
              <label className="mb-0 small fw-bold sort-label">Sort:</label>
              <select
                className="form-select form-select-sm filter-input sort-select"

                onChange={filterSorting}
              >
                <option value="0">Select Sortby</option>
                <option value="1">Name (A-Z)</option>
                <option value="2">Name (Z-A)</option>
                <option value="3">Price: Low to High</option>
                <option value="4">Price: High to Low</option>
                <option value="6">Highest Discount</option>
                <option value="8">Highest Rated</option>
                <option value="7">Lowest Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="alert alert-info text-center py-5 no-products-alert">
              <h5 className="no-products-title">No products found</h5>
              <p className="mb-0 text-muted">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="row g-4">
              {products.map((v, id) => {
                return (
                  <div key={id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <ProductCard product={v} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}

          <div className="my-5">
            <ResponsivePagination
              total={totalPage}
              current={currentPage}
              onPageChange={(page) => handlePageChange(page)}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
