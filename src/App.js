import React from "react";
import './App.css';
import Header from './Header';
import BeerList from './BeerList'
import { useState, useEffect } from 'react';
import Pagination from "./Pagination";

function App() {
  const [beers, setBeers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [pageSize] = useState(6);

  async function fetchData() {
    const url = 'https://api.punkapi.com/v2/beers'
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setBeers(data);
        setTotalCount(data.length)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;
  const currentPageData = beers.slice(firstPageIndex, lastPageIndex);
  const nPages = Math.ceil(totalCount / pageSize);

  return (
    <>
      <Header />
      <BeerList data={currentPageData} />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} />;
    </>
  )
}

export default App;