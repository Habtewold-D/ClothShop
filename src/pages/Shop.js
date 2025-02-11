import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import Pagination from '../components/Pagination';
import './Shop.css';



const allItems = [
    { id: 1, title: "Couple Shirt", price: "$60", discountedPrice: "$50", category: "couple", image: "assets/images/cloth.jpg" },
    { id: 2, title: "Women's Dress", price: "$50", discountedPrice: "$40", category: "womens", image: "assets/images/cloth.jpg" },
    { id: 3, title: "Gabi/Netela", price: "$40", discountedPrice: "$30", category: "gabi", image: "/images/gabi-netela.jpg" },
    { id: 4, title: "Family Outfit", price: "$80", discountedPrice: "$70", category: "family", image: "/images/family-outfit.jpg" },
    { id: 5, title: "Children's T-Shirt", price: "$25", discountedPrice: "$20", category: "children", image: "/images/childrens-tshirt.jpg" },
    { id: 6, title: "Men's Jacket", price: "$65", discountedPrice: "$55", category: "male", image: "/images/mens-jacket.jpg" },
    { id: 7, title: "Couple Blouse", price: "$45", discountedPrice: "$40", category: "couple", image: "/images/couple-blouse.jpg" },
    { id: 8, title: "Family Traditional Wear", price: "$90", discountedPrice: "$75", category: "family", image: "/images/family-traditional.jpg" },
    { id: 9, title: "Gabi/Netela 2", price: "$50", discountedPrice: "$45", category: "gabi", image: "/images/gabi-netela-2.jpg" },
    { id: 10, title: "Women's Blouse", price: "$35", discountedPrice: "$30", category: "womens", image: "/images/womens-blouse.jpg" },
    { id: 11, title: "Men's T-Shirt", price: "$30", discountedPrice: "$25", category: "male", image: "/images/mens-tshirt.jpg" },
    { id: 12, title: "Children's Hoodie", price: "$40", discountedPrice: "$35", category: "children", image: "/images/childrens-hoodie.jpg" },
    
    // **Female Clothes**
    { id: 13, title: "Female Dress 1", price: "$50", discountedPrice: "$45", category: "womens", image: "assets/images/cloth.jpg" },
    { id: 14, title: "Female Dress 2", price: "$60", discountedPrice: "$50", category: "womens", image: "assets/images/cloth.jpg" },
    { id: 15, title: "Female Dress 3", price: "$55", discountedPrice: "$50", category: "womens", image: "assets/images/cloth.jpg" },
    { id: 16, title: "Female Dress 4", price: "$65", discountedPrice: "$55", category: "womens", image: "/images/female-dress4.jpg" },
    { id: 17, title: "Female Dress 5", price: "$45", discountedPrice: "$40", category: "womens", image: "/images/female-dress5.jpg" },
    { id: 18, title: "Female Dress 6", price: "$70", discountedPrice: "$60", category: "womens", image: "/images/female-dress6.jpg" },
    { id: 19, title: "Female Dress 7", price: "$80", discountedPrice: "$70", category: "womens", image: "/images/female-dress7.jpg" },
    { id: 20, title: "Female Dress 8", price: "$75", discountedPrice: "$65", category: "womens", image: "/images/female-dress8.jpg" },
    { id: 21, title: "Female Dress 9", price: "$50", discountedPrice: "$45", category: "womens", image: "/images/female-dress9.jpg" },
    { id: 22, title: "Female Dress 10", price: "$60", discountedPrice: "$50", category: "womens", image: "/images/female-dress10.jpg" },
    { id: 23, title: "Female Dress 11", price: "$55", discountedPrice: "$50", category: "womens", image: "/images/female-dress11.jpg" },
    { id: 24, title: "Female Dress 12", price: "$65", discountedPrice: "$55", category: "womens", image: "/images/female-dress12.jpg" },
  
    // **Family Clothes**
    { id: 25, title: "Family Outfit 1", price: "$60", discountedPrice: "$50", category: "family", image: "/images/family-outfit1.jpg" },
    { id: 26, title: "Family Outfit 2", price: "$55", discountedPrice: "$45", category: "family", image: "/images/family-outfit2.jpg" },
    { id: 27, title: "Family Outfit 3", price: "$65", discountedPrice: "$55", category: "family", image: "/images/family-outfit3.jpg" },
    { id: 28, title: "Family Outfit 4", price: "$60", discountedPrice: "$50", category: "family", image: "/images/family-outfit4.jpg" },
    { id: 29, title: "Family Outfit 5", price: "$55", discountedPrice: "$45", category: "family", image: "/images/family-outfit5.jpg" },
    { id: 30, title: "Family Outfit 6", price: "$70", discountedPrice: "$60", category: "family", image: "/images/family-outfit6.jpg" },
    { id: 31, title: "Family Outfit 7", price: "$65", discountedPrice: "$55", category: "family", image: "/images/family-outfit7.jpg" },
    { id: 32, title: "Family Outfit 8", price: "$60", discountedPrice: "$50", category: "family", image: "/images/family-outfit8.jpg" },
    { id: 33, title: "Family Outfit 9", price: "$75", discountedPrice: "$65", category: "family", image: "/images/family-outfit9.jpg" },
    { id: 34, title: "Family Outfit 10", price: "$55", discountedPrice: "$45", category: "family", image: "/images/family-outfit10.jpg" },
    { id: 35, title: "Family Outfit 11", price: "$65", discountedPrice: "$55", category: "family", image: "/images/family-outfit11.jpg" },
    { id: 36, title: "Family Outfit 12", price: "$70", discountedPrice: "$60", category: "family", image: "/images/family-outfit12.jpg" },
  
    // **Gabi/Netela**
    { id: 37, title: "Gabi/Netela 1", price: "$50", discountedPrice: "$45", category: "gabi", image: "/images/gabi-netela1.jpg" },
    { id: 38, title: "Gabi/Netela 2", price: "$60", discountedPrice: "$50", category: "gabi", image: "/images/gabi-netela2.jpg" },
    { id: 39, title: "Gabi/Netela 3", price: "$70", discountedPrice: "$60", category: "gabi", image: "/images/gabi-netela3.jpg" },
    { id: 40, title: "Gabi/Netela 4", price: "$65", discountedPrice: "$55", category: "gabi", image: "/images/gabi-netela4.jpg" },
    { id: 41, title: "Gabi/Netela 5", price: "$55", discountedPrice: "$50", category: "gabi", image: "/images/gabi-netela5.jpg" },
    { id: 42, title: "Gabi/Netela 6", price: "$60", discountedPrice: "$50", category: "gabi", image: "/images/gabi-netela6.jpg" },
    { id: 43, title: "Gabi/Netela 7", price: "$50", discountedPrice: "$45", category: "gabi", image: "/images/gabi-netela7.jpg" },
    { id: 44, title: "Gabi/Netela 8", price: "$75", discountedPrice: "$65", category: "gabi", image: "/images/gabi-netela8.jpg" },
    { id: 45, title: "Gabi/Netela 9", price: "$65", discountedPrice: "$55", category: "gabi", image: "/images/gabi-netela9.jpg" },
    { id: 46, title: "Gabi/Netela 10", price: "$80", discountedPrice: "$70", category: "gabi", image: "/images/gabi-netela10.jpg" },
    { id: 47, title: "Gabi/Netela 11", price: "$70", discountedPrice: "$60", category: "gabi", image: "/images/gabi-netela11.jpg" },
    { id: 48, title: "Gabi/Netela 12", price: "$55", discountedPrice: "$50", category: "gabi", image: "/images/gabi-netela12.jpg" },
  
    // **Couple**
    { id: 49, title: "Couple Outfit 1", price: "$60", discountedPrice: "$50", category: "couple", image: "/images/couple-outfit1.jpg" },
    { id: 50, title: "Couple Outfit 2", price: "$55", discountedPrice: "$45", category: "couple", image: "/images/couple-outfit2.jpg" },
    { id: 51, title: "Couple Outfit 3", price: "$65", discountedPrice: "$55", category: "couple", image: "/images/couple-outfit3.jpg" },
    { id: 52, title: "Couple Outfit 4", price: "$60", discountedPrice: "$50", category: "couple", image: "/images/couple-outfit4.jpg" },
    { id: 53, title: "Couple Outfit 5", price: "$55", discountedPrice: "$45", category: "couple", image: "/images/couple-outfit5.jpg" },
    { id: 54, title: "Couple Outfit 6", price: "$70", discountedPrice: "$60", category: "couple", image: "/images/couple-outfit6.jpg" },
    { id: 55, title: "Couple Outfit 7", price: "$65", discountedPrice: "$55", category: "couple", image: "/images/couple-outfit7.jpg" },
    { id: 56, title: "Couple Outfit 8", price: "$60", discountedPrice: "$50", category: "couple", image: "/images/couple-outfit8.jpg" },
    { id: 57, title: "Couple Outfit 9", price: "$75", discountedPrice: "$65", category: "couple", image: "/images/couple-outfit9.jpg" },
    { id: 58, title: "Couple Outfit 10", price: "$55", discountedPrice: "$45", category: "couple", image: "/images/couple-outfit10.jpg" },
    { id: 59, title: "Couple Outfit 11", price: "$65", discountedPrice: "$55", category: "couple", image: "/images/couple-outfit11.jpg" },
    { id: 60, title: "Couple Outfit 12", price: "$70", discountedPrice: "$60", category: "couple", image: "/images/couple-outfit12.jpg" },
    
    // **Children**
    { id: 61, title: "Children's Outfit 1", price: "$25", discountedPrice: "$20", category: "children", image: "/images/childrens-outfit1.jpg" },
    { id: 62, title: "Children's Outfit 2", price: "$30", discountedPrice: "$25", category: "children", image: "/images/childrens-outfit2.jpg" },
    { id: 63, title: "Children's Outfit 3", price: "$35", discountedPrice: "$30", category: "children", image: "/images/childrens-outfit3.jpg" },
    { id: 64, title: "Children's Outfit 4", price: "$40", discountedPrice: "$35", category: "children", image: "/images/childrens-outfit4.jpg" },
    { id: 65, title: "Children's Outfit 5", price: "$45", discountedPrice: "$40", category: "children", image: "/images/childrens-outfit5.jpg" },
    { id: 66, title: "Children's Outfit 6", price: "$50", discountedPrice: "$45", category: "children", image: "/images/childrens-outfit6.jpg" },
    { id: 67, title: "Children's Outfit 7", price: "$55", discountedPrice: "$50", category: "children", image: "/images/childrens-outfit7.jpg" },
    { id: 68, title: "Children's Outfit 8", price: "$60", discountedPrice: "$55", category: "children", image: "/images/childrens-outfit8.jpg" },
    { id: 69, title: "Children's Outfit 9", price: "$65", discountedPrice: "$60", category: "children", image: "/images/childrens-outfit9.jpg" },
    { id: 70, title: "Children's Outfit 10", price: "$70", discountedPrice: "$65", category: "children", image: "/images/childrens-outfit10.jpg" },
    { id: 71, title: "Children's Outfit 11", price: "$75", discountedPrice: "$70", category: "children", image: "/images/childrens-outfit11.jpg" },
    { id: 72, title: "Children's Outfit 12", price: "$80", discountedPrice: "$75", category: "children", image: "/images/childrens-outfit12.jpg" },

    // **male**
    { id: 73, title: "Male Outfit 1", price: "$60", discountedPrice: "$50", category: "male", image: "/images/male-outfit1.jpg" },
    { id: 74, title: "Male Outfit 2", price: "$55", discountedPrice: "$45", category: "male", image: "/images/male-outfit2.jpg" },
    { id: 75, title: "Male Outfit 3", price: "$65", discountedPrice: "$55", category: "male", image: "/images/male-outfit3.jpg" },
    { id: 76, title: "Male Outfit 4", price: "$60", discountedPrice: "$50", category: "male", image: "/images/male-outfit4.jpg" },
    { id: 77, title: "Male Outfit 5", price: "$55", discountedPrice: "$45", category: "male", image: "/images/male-outfit5.jpg" },
    { id: 78, title: "Male Outfit 6", price: "$70", discountedPrice: "$60", category: "male", image: "/images/male-outfit6.jpg" },
    { id: 79, title: "Male Outfit 7", price: "$65", discountedPrice: "$55", category: "male", image: "/images/male-outfit7.jpg" },
    { id: 80, title: "Male Outfit 8", price: "$60", discountedPrice: "$50", category: "male", image: "/images/male-outfit8.jpg" },
    { id: 81, title: "Male Outfit 9", price: "$75", discountedPrice: "$65", category: "male", image: "/images/male-outfit9.jpg" },
    { id: 82, title: "Male Outfit 10", price: "$55", discountedPrice: "$45", category: "male", image: "/images/male-outfit10.jpg" },
    { id: 83, title: "Male Outfit 11", price: "$65", discountedPrice: "$55", category: "male", image: "/images/male-outfit11.jpg" },
    { id: 84, title: "Male Outfit 12", price: "$70", discountedPrice: "$60", category: "male", image: "/images/male-outfit12.jpg" },
  ];
  
 
  const Shop = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const itemsPerPage = 12;
    const location = useLocation();
    const navigate = useNavigate();
  
    // Handle initial page load based on the URL query
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const page = queryParams.get('page');
      if (page) {
        setCurrentPage(parseInt(page, 10));
        loadItems(parseInt(page, 10));
      } else {
        setCurrentPage(1);
        loadItems(1);
      }
    }, [location.search]);
  
    // Load items for each page based on the category and ID range
    const loadItems = (page) => {
      switch (page) {
        case 1: // Popular (show all items)
          setCurrentItems(allItems.slice(0, 12)); // Show first 12 items
          break;
        case 2: // Women's Clothes (ID 13 to 24)
          setCurrentItems(allItems.filter(item => item.id >= 13 && item.id <= 24));
          break;
        case 3: // Family Clothes (IDs 25 to 36)
          setCurrentItems(allItems.filter(item => item.id >= 25 && item.id <= 36));
          break;
        case 4: // Gabi/Netela (IDs 37 to 48)
          setCurrentItems(allItems.filter(item => item.id >= 37 && item.id <= 48));
          break;
        case 5: // Couple Clothes (IDs 49 to 60)
          setCurrentItems(allItems.filter(item => item.id >= 49 && item.id <= 60));
          break;
        case 6: // Children's Clothes (IDs 61 to 72)
          setCurrentItems(allItems.filter(item => item.id >= 61 && item.id <= 72));
          break;
        case 7: // Male Clothes (IDs 73 to 84)
          setCurrentItems(allItems.filter(item => item.id >= 73 && item.id <= 84));
          break;
        default:
          setCurrentItems(allItems.slice(0, 12)); // Default to first 12 items
          break;
      }
    };
  
    // Get the category name based on the current page
    const getCategoryName = (page) => {
      switch (page) {
        case 1:
          return 'Popular';
        case 2:
          return 'Women\'s Clothing';
        case 3:
          return 'Family Clothing';
        case 4:
          return 'Gabi/Netela';
        case 5:
          return 'Couple Clothing';
        case 6:
          return 'Children\'s Clothing';
        case 7:
          return 'Male Clothing';
        default:
          return 'Popular';
      }
    };
  
    // Pagination handler
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      navigate(`/shop?page=${pageNumber}`);
      loadItems(pageNumber);
    };
  
    const totalItems = currentItems.length;
    const totalPages = 7; // We are always showing 7 categories
  
    return (
      <div className="shop">
        <h1>{`${getCategoryName(currentPage)}`}</h1>
  
        <div className="items-grid">
          {currentItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
  
        {/* Always display pagination buttons */}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          paginate={paginate}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    );
  };
  
  export default Shop;
  