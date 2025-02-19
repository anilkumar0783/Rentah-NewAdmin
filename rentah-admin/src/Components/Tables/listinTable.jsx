import {
  Table,
  TableBody,
  TableCell,
  IconButton,
  Button,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputBase,
  Typography,
  Box,
  Pagination,
} from "@mui/material";

import { ScaleLoader } from "react-spinners";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import CustomModal from "../ui/CustomModal";
import EditModal from "../../Pages/Listings/editModel";



const ListingTable = ({ listings, loading, page, setPage, rowsPerPage, setRowsPerPage, count }) => {
  console.log("Loading state:", loading);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedListingForEdit, setSelectedListingForEdit] = useState(null);
  const token = localStorage.getItem("token") || "";

  // Fetch categories on mount
  useEffect(() => {
    fetch(`http://24.199.104.72/api/categories/details`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then(response => {
        if (response.status === true) {
          setCategories(response.data);
          console.log("Fetched Categories:", response.data);
        }
      })
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  const handleCategory = (e) => {
    const selectedValue = e.target.value;
    setCategory(selectedValue);

    const selectedCategoryData = categories.find((cat) => cat._id === selectedValue);
    setSubCategories(selectedCategoryData ? selectedCategoryData.subCategories || [] : []);
    setSubCategory("");
  };

  const handleSubCategory = (e) => setSubCategory(e.target.value);
  const handleSearch = (e) => setSearch(e.target.value);

  const filteredListings = listings.filter(
    (item) =>
      (item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.userName?.toLowerCase().includes(search.toLowerCase())) &&
      (category === "" || item.category === category) &&
      (subCategory === "" || item.subCategory === subCategory)
  );

  const handleChangePage = (event, newPage) => setPage(newPage);


  const handleOpenModal = (listing) => {
    setSelectedListing(listing);
    setOpenModal(true);
  };


  const handelDelete = () => {
    console.log("Deleted listing:", selectedListing);
    setOpenModal(false);
  };


  const handleOpenEditModal = (listing) => {
    setSelectedListingForEdit(listing);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedListingForEdit(null);
  };

  const handleSaveEdit = (updatedListing) => {
    // Save the updated listing (You can send the updated data to your API here)
    console.log("Updated Listing:", updatedListing);
  };


  return (
    <TableContainer component={Paper}>
      <div style={{ display: "flex", gap: "16px", padding: "16px" }}>
        <InputBase
          placeholder="Search by Title or Username"
          value={search}
          onChange={handleSearch}
          style={{ width: "300px", border: "1px solid gray", borderRadius: "6px", padding: "8px" }}
        />

        <Select value={category} onChange={handleCategory} displayEmpty style={{ width: "200px", backgroundColor: "white" }}>
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>{cat.categoryName}</MenuItem>
          ))}
        </Select>

        {category && (
          <Select value={subCategory} onChange={handleSubCategory} displayEmpty style={{ width: "200px", backgroundColor: "white" }}>
            <MenuItem value="">All Subcategories</MenuItem>
            {subCategories.map((sub, index) => (
              <MenuItem key={index} value={sub.subCategoryName}>{sub.subCategoryName}</MenuItem>
            ))}
          </Select>
        )}
      </div>

      <Table>
        <TableHead style={{ backgroundColor: "#F6F6F6" }}>
          <TableRow>
            <TableCell>S.NO</TableCell>
            <TableCell>Photo</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Created On</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>

        {/* Show ScaleLoader when loading */}
        {loading ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={9} align="center">
                <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                  <ScaleLoader color="#5ceacf" height={35} width={4} />
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {filteredListings.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell>
                  <img
                    src={item.listingPhotos?.[0] || "/default-placeholder.jpg"}
                    alt="listing"
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell>
                  {item.title
                    ? item.title.trim().split(/\s+/).slice(0, 2).join(" ")
                    : "Not Found"}
                </TableCell>

                <TableCell>{item.userName || "Not Found"}</TableCell>
                <TableCell>
                  {item.category === 0
                    ? "Goods"
                    : item.category === 1
                      ? "Service"
                      : item.category === 2
                        ? "Space"
                        : item.category}
                </TableCell>
                <TableCell>{new Date(item.creationTimeStamp).toLocaleDateString()}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  ${item.budget}/{["Day", "Week", "Month", "For Sale", "Hour", "Custom", "Year"][item.type]||"type"}
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    {/* View Button */}
                    <IconButton
                      sx={{
                        backgroundColor: "#d3fcf9",
                        color: "#004d40",
                        padding: "8px",
                        borderRadius: "12px",
                        "&:hover": {
                          backgroundColor: "#00bcd4",
                          color: "#ffffff",
                        },
                      }}
                      onClick={() => {/* Add your detail view function here */ }}
                    >
                      <VisibilityIcon />
                    </IconButton>

                    {/* Edit Button */}
                    <IconButton
                      sx={{
                        backgroundColor: "#FFF4E5",
                        color: "#FF9800",
                        padding: "8px",
                        borderRadius: "12px",
                        "&:hover": {
                          backgroundColor: "#FFB74D",
                          color: "#ffffff",
                        },
                      }}
                      onClick={() => handleOpenEditModal(item)}
                    >
                      <EditIcon />
                    </IconButton>

                    {/* Delete Button */}
                    <IconButton
                      sx={{
                        backgroundColor: "#ffebee",
                        color: "#d32f2f",
                        padding: "8px",
                        borderRadius: "12px",
                        "&:hover": {
                          backgroundColor: "#ff1a1a",
                          color: "#ffffff",
                        },
                      }}
                      onClick={() => handleOpenModal(item)} // Open the modal on delete click
                    >
                      <DeleteIcon />
                    </IconButton>

                  </Box>

                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>


      <Box sx={{ display: "flex", justifyContent: "center", py: 3, borderTop: "1px solid rgba(0, 0, 0, 0.12)", color: "black" }}>
        <Pagination
          count={count}
          page={page}
          onChange={handleChangePage}
          color="black"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "black",
              borderRadius: "8px",
              fontSize: "0.875rem",
              "&.Mui-selected": {
                backgroundColor: "#2979ff",
                color: "white",
                "&:hover": { backgroundColor: "#1c54b2" },
              },
              "&:hover": { backgroundColor: "#e3f2fd", color: "black" },
            },
          }}
        />
         <CustomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Confirm Delete"
        message="Are you sure you  to delete this listing?"
        onConfirm={handelDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
      </Box>
      <EditModal
      open={openEditModal}
      onClose={handleCloseEditModal}
      onConfirm={handleSaveEdit}
      listing={selectedListingForEdit}
      />
     
    </TableContainer>
  );
};

export default ListingTable;
