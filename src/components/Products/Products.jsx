import React, { useState, useEffect } from "react";
import { Grid, InputAdornment, Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Product from "./Product/Product.js";
import useStyles from "./styles";
import Carousel from "react-bootstrap/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo1 from "../../assets/4.jpeg";
import "../ProductView/style.css";
import axios from "axios";
import styled from "styled-components";

const SearchContainer = styled.div`
  position: relative;
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 20%;
  right: 0;
  background-color: #fff;
  color: #000;
  width: 60%;
  border: 1px solid #ccc;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  max-height: 200px;
  // overflow-y: auto;
`;

const SuggestionItem = styled.div`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm !== "") {
      axios
        .get(`https://openlibrary.org/search.json?q=${searchTerm}`)
        .then((response) => {
          const data = response.data;
          if (data.docs && data.docs.length > 0) {
            const newSuggestions = data.docs.map((doc) => doc.title);
            setSuggestions(newSuggestions);
          } else {
            setSuggestions([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching search suggestions:", error);
          setSuggestions([]);
        });
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  return (
    <main className={classes.mainPage}>
      <div className={classes.toolbar} />
      <Carousel fade infiniteLoop useKeyboardArrows autoPlay>
        <Carousel.Item>
          <img className="d-block w-100" src={logo1} alt="slide" />
          <Carousel.Caption>
            <SearchContainer>
              <Input
                className={classes.searchb}
                type="text"
                placeholder="Which book are you looking for?"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
              {searchTerm && (
                <SuggestionsContainer>
                  {suggestions.map((suggestion, index) => (
                    <SuggestionItem
                      key={index}
                      onClick={() => {
                        setSearchTerm(suggestion);
                        setSuggestions([]); // Hide suggestions when an item is clicked
                      }}
                    >
                      {suggestion}
                    </SuggestionItem>
                  ))}
                </SuggestionsContainer>
              )}
            </SearchContainer>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {searchTerm === "" && (
        <>
          <h3 className={classes.contentHeader}>FEATURED</h3>
          <Grid
            className={classes.contentFeatured}
            container
            justify="center"
            spacing={1}
          >
            {products.map((product) => (
              <>
                {product.categories.length > 0 ? (
                  <Grid
                    className={classes.contentFeatured}
                    item
                    xs={6}
                    sm={5}
                    md={3}
                    lg={2}
                    id="pro"
                    key={product.id}
                  >
                    <Product product={product} onAddToCart={onAddToCart} />
                  </Grid>
                ) : (
                  ""
                )}
              </>
            ))}
          </Grid>
        </>
      )}

      <Grid className={classes.content} container justify="center" spacing={5}>
        {products
          .filter((product) => {
            if (searchTerm === "") {
              return product;
            } else if (
              product.name
                .toLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            ) {
              return product;
            }
          })
          .map((product) => (
            <Grid
              className={classes.content}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              id="pro"
              key={product.id}
            >
              <Product product={product} onAddToCart={onAddToCart} />
            </Grid>
          ))}
      </Grid>
    </main>
  );
};

export default Products;
