"use client"
import { useState, useEffect } from 'react'
import React from 'react'
import QuoteCard from './QuoteCard';

const QuoteCardList = ({ data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <QuoteCard 
        key={post.id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}

    </div>

  )
}

const Feed = () => {
  
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    clearTimeout(searchTimeout);
    

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPosts(tagName);
    setSearchedResults(searchResult);
  };
  const fetchPosts = async () => {
    const response = await fetch('/api/quotes');
    const data = await response.json();

    setAllPosts(data);
  }
  useEffect(() => {
    

    fetchPosts();
    
  }, []);


  
  const filterPosts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text"
        placeholder="Search quotes"
        value={searchText} 
        required
        onChange={handleSearchChange}
        className="search_input peer"
        />

      </form>
      {searchText ? (
      <QuoteCardList
        data={searchedResults}
        handleTagClick={handleTagClick}/>
        ) : (
        <QuoteCardList data={allPosts} handleTagClick={handleTagClick} />
     )}
      
    </section>
  )
}

export default Feed