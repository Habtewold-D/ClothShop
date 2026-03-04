import React, { useState, useEffect, useCallback } from 'react';
import ItemCard from '../components/ItemCard';
import Pagination from '../components/Pagination';
import './Shop.css';
import { apiService } from '../services/apiService';
import ClothForm from '../components/ClothForm';
import { useLocation, useNavigate } from 'react-router-dom';

const categories = [
  { name: "All Collections", value: "" },
  { name: "Popular Pieces", value: "popular" },
  { name: "Seasonal", value: "seasonal" },
  { name: "Women's Clothes", value: "Women's Clothes" },
  { name: "Family Clothes", value: "Family Clothes" },
  { name: "GABI/NETELA", value: "GABI/NETELA" },
  { name: "Couple Clothes", value: "Couple Clothes" },
  { name: "Kids Clothes", value: "Kids Clothes" },
  { name: "ነጭ በነጭ", value: "ነጭ በነጭ" },
  { name: "Male Clothes", value: "Male Clothes" },
  { name: "Bernos", value: "Bernos" },
  { name: "Fota", value: "Fota" }
];

const itemsPerPage = 12;

const Shop = () => {
  const [clothes, setClothes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentCategory = queryParams.get('category') || "";
  const [currentPage, setCurrentPage] = useState(1);

  // For simplicity, we'll keep the seasonal filter visibility 
  // until we have a proper metadata endpoint
  const filterCategories = categories;

  const fetchClothes = useCallback(async () => {
    setLoading(true);
    console.log(`Fetching clothes for category: "${currentCategory}"`);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage
      };

      if (currentCategory === "popular") {
        params.popular = true;
      } else if (currentCategory === "seasonal") {
        params.seasonal = true;
      } else if (currentCategory !== "") {
        params.category = currentCategory;
      }

      const data = await apiService.getClothes(params);
      console.log('API Response:', data);
      setClothes(Array.isArray(data.clothes) ? data.clothes : (Array.isArray(data) ? data : []));
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error('Fetch error:', err);
      setClothes([]);
    }
    setLoading(false);
  }, [currentPage, currentCategory]);

  useEffect(() => {
    fetchClothes();
  }, [fetchClothes]);

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('adminToken'));
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (item) => {
    setEditItem(item);
    setShowEditModal(true);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try {
      await apiService.deleteCloth(item._id);
      fetchClothes();
    } catch (err) {
      alert(err.message || 'Failed to delete item');
    }
  };

  const handleAdd = () => setShowAddModal(true);

  const handleAddSubmit = async (formData) => {
    setAddLoading(true);
    try {
      await apiService.createCloth(formData);
      fetchClothes();
      setShowAddModal(false);
    } catch (err) {
      alert(err.message || 'Failed to add item');
    }
    setAddLoading(false);
  };

  const handleEditSubmit = async (formData) => {
    setEditLoading(true);
    try {
      await apiService.updateCloth(editItem._id, formData);
      fetchClothes();
      setShowEditModal(false);
      setEditItem(null);
    } catch (err) {
      alert(err.message || 'Failed to update item');
    }
    setEditLoading(false);
  };

  const handleCategoryChange = (e) => {
    const handleCategoryChange = (val) => {
      if (val === "") {
        navigate('/shop');
      } else {
        navigate(`/shop?category=${encodeURIComponent(val)}`);
      }
      setCurrentPage(1);
    };

    return (
      <div className="shop-minimal">
        <header className="shop-header-header">
          <h1 className="brand-font">
            {currentCategory ? (currentCategory === 'seasonal' ? 'Seasonal Heritage' : (currentCategory === 'popular' ? 'Popular Pieces' : currentCategory)) : 'All Collections'}
          </h1>
          <div className="header-accent-line"></div>
        </header>

        <div className="shop-controls-minimal">
          <div className="filter-dropdown-box">
            <label htmlFor="category-select" className="filter-label">Filter by Category</label>
            <select
              id="category-select"
              className="premium-select"
              value={currentCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.value || 'all'} value={cat.value}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {isAdmin && (
            <button className="btn-majestic-gold-sm" onClick={handleAdd}>
              + Add Masterpiece
            </button>
          )}
        </div>

        {showAddModal && (
          <ClothForm
            onSubmit={handleAddSubmit}
            onClose={() => setShowAddModal(false)}
            loading={addLoading}
          />
        )}

        {showEditModal && editItem && (
          <ClothForm
            initialData={editItem}
            onSubmit={handleEditSubmit}
            onClose={() => { setShowEditModal(false); setEditItem(null); }}
            loading={editLoading}
          />
        )}

        {loading ? (
          <div className="loading-skeleton">
            <div className="ethiopian-spinner"></div>
            <p className="brand-font">Refining elegance...</p>
          </div>
        ) : (
          <>
            {(!clothes || clothes.length === 0) ? (
              <div className="no-items-message">
                <div className="no-items-icon">◈</div>
                <h3 className="brand-font">The {currentCategory ? (currentCategory === 'seasonal' ? 'Seasonal' : (currentCategory === 'popular' ? 'Popular' : currentCategory)) : 'Full'} Collection is currently curated</h3>
                <p>We are presently hand-weaving new masterpieces for this category.</p>
                <button className="btn-majestic-gold-sm" onClick={() => setCurrentCategory("")}>Explore All Pieces</button>
              </div>
            ) : (
              <>
                <div className="items-grid-premium">
                  {clothes.map(item => (
                    <ItemCard
                      key={item._id}
                      item={item}
                      isAdmin={isAdmin}
                      onEdit={() => handleEdit(item)}
                      onDelete={() => handleDelete(item)}
                    />
                  ))}
                </div>
                <Pagination
                  itemsPerPage={itemsPerPage}
                  paginate={paginate}
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </>
            )}
          </>
        )}
      </div>
    );
  };

  export default Shop;
