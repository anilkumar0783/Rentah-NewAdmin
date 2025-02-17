import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListings } from "../../Store/listingSlice";
import { Box } from "@mui/material";

import ListingTable from "../../Components/Tables/listinTable";

const Listings = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [count,setCount]=useState(0)
    const [category, setCategory] = useState("");
    
  const { data: listings, status,totalCount } = useSelector((state) => state.listings);
  const loading = status === "loading";
  useEffect(() => {
    const skip = (page - 1) * rowsPerPage;  // Ensure correct offset calculation
    // Calculate offset based on page
    dispatch(getListings({ skip, limit: rowsPerPage,category })); // Pass an object
    setCount(count+listings.length)
  }, [dispatch, page,rowsPerPage,totalCount,category]);
  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 3000); // Simulate API delay
  // }, []);
  return (
    <Box>
    
        <ListingTable loading={loading} listings={listings} page={page} count={count} setPage={setPage} totalCount={totalCount} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} category={category} setCategory={setCategory} />
     
    </Box>
  );
};

export default Listings;
