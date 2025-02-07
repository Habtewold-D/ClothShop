// src/pages/Shop.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import Pagination from '../components/Pagination';
import './Shop.css';

const allItems = [
  { 
    id: 1, 
    title: "Couple Shirt", 
    price: "$60", 
    discountedPrice: "$50", 
    category: "couple",
    image: "assets/images/cloth.jpg"
  },
  { 
    id: 2, 
    title: "Women's Dress", 
    price: "$50", 
    discountedPrice: "$40", 
    category: "womens",
    image: "/images/womens-dress.jpg"
  },
  { 
    id: 3, 
    title: "Gabi/Netela", 
    price: "$40", 
    discountedPrice: "$30", 
    category: "gabi",
    image: "/images/gabi-netela.jpg"
  },
  { 
    id: 4, 
    title: "Family Outfit", 
    price: "$80", 
    discountedPrice: "$70", 
    category: "family",
    image: "/images/family-outfit.jpg"
  },
  { 
    id: 5, 
    title: "Children's T-Shirt", 
    price: "$25", 
    discountedPrice: "$20", 
    category: "children",
    image: "/images/childrens-tshirt.jpg"
  },
  { 
    id: 6, 
    title: "Men's Jacket", 
    price: "$65", 
    discountedPrice: "$55", 
    category: "male",
    image: "/images/mens-jacket.jpg"
  },
  { 
    id: 7, 
    title: "Couple Blouse", 
    price: "$45", 
    discountedPrice: "$40", 
    category: "couple",
    image: "/images/couple-blouse.jpg"
  },
  { 
    id: 8, 
    title: "Family Traditional Wear", 
    price: "$90", 
    discountedPrice: "$75", 
    category: "family",
    image: "/images/family-traditional.jpg"
  },
  { 
    id: 9, 
    title: "Gabi/Netela 2", 
    price: "$50", 
    discountedPrice: "$45", 
    category: "gabi",
    image: "/images/gabi-netela-2.jpg"
  },
  { 
    id: 10, 
    title: "Women's Blouse", 
    price: "$35", 
    discountedPrice: "$30", 
    category: "womens",
    image: "/images/womens-blouse.jpg"
  },
  { 
    id: 11, 
    title: "Men's T-Shirt", 
    price: "$30", 
    discountedPrice: "$25", 
    category: "male",
    image: "/images/mens-tshirt.jpg"
  },
  { 
    id: 12, 
    title: "Children's Hoodie", 
    price: "$40", 
    discountedPrice: "$35", 
    category: "children",
    image: "/images/childrens-hoodie.jpg"
  },
  { 
    id: 13, 
    title: "Couple Pants", 
    price: "$60", 
    discountedPrice: "$50", 
    category: "couple",
    image: "/images/couple-pants.jpg"
  },
  { 
    id: 14, 
    title: "Gabi/Netela 3", 
    price: "$70", 
    discountedPrice: "$65", 
    category: "gabi",
    image: "/images/gabi-netela-3.jpg"
  },
  // Add more items as needed for pagination
];

const categoriesOrder = [
  'couple', 'womens', 'gabi', 'family', 'children', 'male'
];

const Shop = () => {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Get two items from each category for the first page
  const firstPageItems = categoriesOrder.map(cat => {
    const bestItems = allItems.filter(item => item.category === cat).slice(0, 2); // Get top 2 items
    return bestItems;
  }).flat();

  // Filter items by category
  const filteredItems = category
    ? allItems.filter(item => item.category === category)
    : allItems;

  // Set items for current page, first page will have 2 items from each category
  const itemsForCurrentPage = currentPage === 1 ? firstPageItems : filteredItems;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemsForCurrentPage.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fallback title if category is undefined
  const pageTitle = category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Clothes` : "Shop";

  return (
    <div className="shop">
      <h1>{pageTitle}</h1>

      <div className="items-grid">
        {currentItems.map(item => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.title} />
            <div className="item-info">
              <h3>{item.title}</h3>
              <div className="price-container">
                <span 
                  className="discount-price" 
                  style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    color: '#f5a623', // Color same as button or pagination
                    textDecoration: 'line-through', 
                    marginRight: '10px' 
                  }}
                >
                  {item.discountedPrice}
                </span>
                <span 
                  className="current-price" 
                  style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: 'normal', 
                    color: 'black', 
                    textDecoration: 'none' 
                  }}
                >
                  {item.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredItems.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Shop;
