import React, { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import Pagination from '../components/Pagination';
import './Shop.css';
import { API_BASE_URL } from '../api';
import ClothForm from '../components/ClothForm';
import { useLocation, useNavigate } from 'react-router-dom';

const categories = [
  { name: "Seasonal", value: "seasonal" },
  { name: "Popular", value: "" },
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
  const [filteredClothes, setFilteredClothes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(""); // Start with empty string
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Compute if there are any seasonal items
  const hasSeasonal = clothes.some(item => item.seasonal);
  const filterCategories = hasSeasonal
    ? [
        { name: "Seasonal", value: "seasonal" },
        ...categories.slice(1)
      ]
    : categories.slice(1);

  useEffect(() => {
    const fetchClothes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/clothes`);
        const data = await res.json();
        setClothes(data);
      } catch (err) {
        setClothes([]);
      }
      setLoading(false);
    };
    fetchClothes();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    
    if (cat) {
      // Check if the category exists in our filter options
      const found = filterCategories.find(c => c.value === cat);
      if (found) {
        setCurrentCategory(cat);
      } else {
        // If category doesn't exist, default to seasonal if available, otherwise popular
        setCurrentCategory(hasSeasonal ? "seasonal" : "");
      }
    } else if (currentCategory === "") {
      // Only set default if currentCategory is still empty (initial load)
      // Don't override user selections
      setCurrentCategory(hasSeasonal ? "seasonal" : "");
    }
  }, [location.search]); // Only depend on location.search

  // Separate useEffect to handle initial default when data loads
  useEffect(() => {
    if (clothes.length > 0 && currentCategory === "" && !location.search) {
      // Data has loaded, no category is set, and no URL parameters
      // Set default based on whether seasonal items exist
      const defaultCategory = hasSeasonal ? "seasonal" : "";
      setCurrentCategory(defaultCategory);
    }
  }, [clothes, hasSeasonal]); // Removed currentCategory and location.search to prevent interference

  useEffect(() => {
    let filtered = clothes;
    if (currentCategory === "") {
      // Popular filter - show items that are popular (can also be seasonal)
      filtered = clothes.filter(item => item.popular);
    } else if (currentCategory === "seasonal") {
      // Seasonal filter - show items that are seasonal (can also be popular)
      filtered = clothes.filter(item => item.seasonal);
    } else if (currentCategory) {
      // Category filter - show items in specific category
      filtered = clothes.filter(item => item.category === currentCategory);
    }
    setFilteredClothes(filtered);
    setCurrentPage(1);
  }, [clothes, currentCategory]);

  useEffect(() => {
    // Check for admin token in localStorage
    setIsAdmin(!!localStorage.getItem('adminToken'));
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClothes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredClothes.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Placeholder handlers for edit/delete
  const handleEdit = (item) => {
    setEditItem(item);
    setShowEditModal(true);
  };
  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try {
      await fetch(`${API_BASE_URL}/clothes/${item._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      setClothes(clothes.filter(c => c._id !== item._id));
    } catch (err) {
      alert('Failed to delete item');
    }
  };

  const handleAdd = () => setShowAddModal(true);

  const handleAddSubmit = async (formData) => {
    setAddLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/clothes`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });
      if (res.ok) {
        const newCloth = await res.json();
        setClothes([...clothes, newCloth]);
        setShowAddModal(false);
      } else {
        alert('Failed to add item');
      }
    } catch (err) {
      alert('Failed to add item');
    }
    setAddLoading(false);
  };

  const handleEditSubmit = async (formData) => {
    setEditLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/clothes/${editItem._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });
      if (res.ok) {
        const updatedCloth = await res.json();
        setClothes(clothes.map(c => c._id === editItem._id ? updatedCloth : c));
        setShowEditModal(false);
        setEditItem(null);
      } else {
        alert('Failed to update item');
      }
    } catch (err) {
      alert('Failed to update item');
    }
    setEditLoading(false);
  };

  const handleCategoryChange = (e) => {
    setCurrentCategory(e.target.value);
  };

  return (
    <div className="shop">
      <div className="shop-header-row">
        <div className="centered-category-title">
          <h1>{currentCategory ? (currentCategory === 'seasonal' ? 'Seasonal Offers' : currentCategory) : 'Popular'}</h1>
        </div>
        {isAdmin && (
          <button className="add-cloth-btn-top" onClick={handleAdd}>+ Add Cloth</button>
        )}
      </div>
      <div className="category-dropdown-row">
        <label htmlFor="category-dropdown" className="category-dropdown-label">Filter by category:</label>
        <select
          id="category-dropdown"
          className="category-dropdown"
          value={currentCategory}
          onChange={handleCategoryChange}
        >
          {filterCategories.map((cat, idx) => (
            <option key={cat.value || 'popular'} value={cat.value}>{cat.name}</option>
          ))}
        </select>
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
        <div className="loading">Loading...</div>
      ) : (
        <>
          {filteredClothes.length === 0 ? (
            <div className="no-items-message">
              <h3>No items found</h3>
              <p>There are no clothes available in the "{currentCategory ? (currentCategory === 'seasonal' ? 'Seasonal Offers' : currentCategory) : 'Popular'}" category at the moment.</p>
              <p>Please try selecting a different category or check back later for new arrivals.</p>
            </div>
          ) : (
            <>
              <div className="items-grid">
                {currentItems.map(item => (
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
                totalItems={filteredClothes.length}
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
  