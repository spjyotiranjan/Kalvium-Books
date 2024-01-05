import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import { AppContext } from "../ParentContext";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [books, setBooks] = useState([]);
  const { isLoggedIn } = useContext(AppContext);
  const baseUrl = axios.create({
    baseURL: "https://reactnd-books-api.udacity.com",
    headers: {
      Authorization: "whatever-you-want",
    },
  });
  useEffect(() => {
    if (searchInput == "") {
      baseUrl.get("/books").then((res) => {
        setBooks(res.data.books);
      });
    } else {
      baseUrl.post("/search", { query: searchInput }).then((res) => {
        if (Array.isArray(res.data.books)) {
          const filteredBooks = res.data.books.filter((e) => {
            return e.imageLinks && e.imageLinks.thumbnail;
          });
          setBooks(filteredBooks);
        } else {
          setBooks([]);
        }
      });
    }
  }, [searchInput]);

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: document.querySelector(".homeDown").offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className="home">
      <div className="homeUp">
        <h1 className="tagline">Explore , Read , Enjoy</h1>
        <p className="subtagline">All For Free</p>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            placeholder="Search here"
            type="text"
            className="searchInput"
            value={searchInput}
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <button
            className="searchButton"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Find Books
          </button>
        </form>
      </div>
      <div className="homeDown">
        <h1 className="category">
          {searchInput == "" ? "Popular Books" : "Search Results"}
        </h1>
        <div className="books">
          <div className="booklist">
            {/* {} */}
            {books.length == 0 ? (
              <h1>No Books Found</h1>
            ) : (
              books.map((e) => {
                return (
                    <div key={e.id}>
                      {!isLoggedIn && (
                        <div className="registerModal">
                          <Link to={"/register"}>
                          <button className="modalButton">Sign Up</button>
                          </Link>
                        </div>
                      )}
                      <a
                        href={e.previewLink}
                        style={{ textDecoration: "none" }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="list">
                          <img
                            className="image"
                            src={e.imageLinks.thumbnail}
                            alt=""
                          />
                          <h4 className="title">{e.title}</h4>
                          <p className="text">Free</p>
                          {e.averageRating && (
                            <p className="text">{e.averageRating}⭐</p>
                          )}
                        </div>
                      </a>
                    </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
