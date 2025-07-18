import React, { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import Pagination from '../components/Pagination';
import './Shop.css';
import { API_BASE_URL } from '../api';
import ClothForm from '../components/ClothForm';
import { useLocation, useNavigate } from 'react-router-dom';

const categories = [
  { name: "Popular", value: "" },
  { name: "Women's Clothes", value: "Women's Clothes" },
  { name: "Family Clothes", value: "Family Clothes" },
  { name: "GABI/NETELA", value: "GABI/NETELA" },
  { name: "Couple Clothes", value: "Couple Clothes" },
  { name: "Children's Clothes", value: "Children's Clothes" },
  { name: "Male Clothes", value: "Male Clothes" },
];

const itemsPerPage = 12;

const Shop = () => {
  const [clothes, setClothes] = useState([]);
  const [filteredClothes, setFilteredClothes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(categories[0].value);
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
    // On mount, check for ?category= in the URL
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) setCurrentCategory(cat);
  }, [location.search]);

  useEffect(() => {
    let filtered = clothes;
    if (currentCategory === "") {
      filtered = clothes.filter(item => item.popular);
    } else if (currentCategory) {
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
      // Refresh clothes list
      const updated = await fetch(`${API_BASE_URL}/clothes`);
      setClothes(await updated.json());
    } catch (err) {}
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
        setShowAddModal(false);
        // Refresh clothes list
        const updated = await fetch(`${API_BASE_URL}/clothes`);
        setClothes(await updated.json());
      }
    } catch (err) {}
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
        setShowEditModal(false);
        setEditItem(null);
        // Refresh clothes list
        const updated = await fetch(`${API_BASE_URL}/clothes`);
        setClothes(await updated.json());
      }
    } catch (err) {}
    setEditLoading(false);
  };

  return (
    <div className="shop">
      <div className="shop-header-row">
        <div className="centered-category-title">
          <h1>{currentCategory ? currentCategory : 'Popular'}</h1>
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
          onChange={e => setCurrentCategory(e.target.value)}
        >
          {categories.map((cat, idx) => (
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
    </div>
  );
};

export default Shop;
  