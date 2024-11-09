'use client';

import React, { useState, useEffect } from 'react';
import { getCategories } from '../../api/categoryData';
import CategoryCard from '../../components/Category';

function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    getCategories().then(setCategories);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center gap-2 mt-5 mx-auto">
      {categories.map((category) => (
        <CategoryCard key={category.id} categoryObj={category} />
      ))}
    </div>
  );
}

export default CategoriesPage;
