import React from "react";
import RestaurantCard, {withVegLabel} from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/CustomHooks/useOnlineStatus";
import UserContext from "./UserContext";
import { Button } from "@mui/material";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searctText, setSearchText] = useState("");
  const { setUserInfo, userName } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, [])

  const VegRestaurantCard = withVegLabel(RestaurantCard);

  const fetchData = async () => {
    const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0826802&lng=80.2707184&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
    const json = await data.json();
    
    setListOfRestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurant(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

  const onlineStatus = useOnlineStatus();
  if(onlineStatus === false) {
    return <h1>Looks Like you are offline, please checl your internet connection!</h1>
  }

  return listOfRestaurants.length === 0 ? <Shimmer /> : (
    <div className="body">
      <div className="search">
        <input 
            placeholder="search" 
            id="search-input" 
            value={searctText} 
            onChange={ (e) => setSearchText(e.target.value) }
        />

        <button id="search-btn" 
        onClick={ () => {
            const filteredRestaurants = listOfRestaurants.filter((restaurant) => (restaurant.info.name.toString().toLowerCase().includes(searctText.toLowerCase())))
            setFilteredRestaurant(filteredRestaurants);
        }}>

        <i class="fa-solid fa-magnifying-glass"></i>
        </button>

        <input 
        type="text" 
        placeholder="Enter username" 
        className="user-name-input" 
        value={userName}
        onChange={(e) => setUserInfo(e.target.value)}
        />
        
      </div>
      <div className="top-rated-container">
        <Button
        variant="contained"
          id="top-rated-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.3
            );
            setFilteredRestaurant(filteredList);
          }}
        >
          Filter Top Rated Restaurant
          <i className="fa-solid fa-filter"></i>
        </Button>
      </div>
      <h2 id="top-rated-h2">Top Rated Restaurants in Chennai</h2>
      
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
        <Link to={'/restaurants/' + restaurant.info.id} key={restaurant.info.id} id="restaurant-card-id">
         {restaurant?.info?.veg ? <VegRestaurantCard resData={restaurant} /> :  <RestaurantCard resData={restaurant} />}
         {/* <RestaurantCard resData={restaurant} /> */}
        </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
