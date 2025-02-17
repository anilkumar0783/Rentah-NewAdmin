import React, { useState, useEffect } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import CustomModal from "../ui/CustomModal";


const UsersTable = ({ users, loading, page, setPage, rowsPerPage, setRowsPerPage, count }) => {
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); 
    const token = localStorage.getItem("token") || "";

   
    const handleOpenModal = (user) => {
        setSelectedUser(user); 
        setOpenModal(true); 
    };

    
    const handelDelete = () => {
        console.log("Deleted user:", selectedUser);
        setOpenModal(false); 
    };

    const handleSearch = (e) => setSearch(e.target.value);
    const filteredUsers = users.filter(
        (item) =>
            (item.title && item.title.toLowerCase().includes(search.toLowerCase())) ||
            (item.userName && item.userName.toLowerCase().includes(search.toLowerCase())) ||
            (!item.title && !item.userName) // Allow users without title or userName
    );

    const handleChangePage = (event, newPage) => setPage(newPage);

    return (
        <TableContainer component={Paper}>
            <div style={{ display: "flex", gap: "16px", padding: "16px" }}>
                <InputBase
                    placeholder="Search User By Name"
                    value={search}
                    onChange={handleSearch}
                    style={{ width: "300px", border: "1px solid gray", borderRadius: "6px", padding: "8px" }}
                />
            </div>

            <Table>
                <TableHead
                    style={{
                        backgroundColor: "#F6F6F6",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                    }}
                >
                    <TableRow>
                        <TableCell>S.NO</TableCell>
                        <TableCell>Profile</TableCell>
                        <TableCell>Username</TableCell>
                        {/* <TableCell>UserId</TableCell> */}
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>JoinedOn</TableCell>
                       
                        <TableCell>Info</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>

                {/* Show ScaleLoader when loading */}
                {loading ? (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={10} align="center">
                                <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                                    <ScaleLoader color="#5ceacf" height={35} width={4} />
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                        {filteredUsers.map((item, index) => (
                            <TableRow key={item._id}>
                                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                <TableCell>
                                    <img
                                        src={item.profilePicture || "/default-placeholder.jpg"}
                                        alt="user"
                                        style={{ width: 40, height: 40, borderRadius: "50%" }}
                                    />
                                </TableCell>
                                <TableCell>{item.fullName}</TableCell>
                                {/* <TableCell>{item._id || "Not Found"}</TableCell> */}
                                <TableCell>{item?.email || "..."}</TableCell>
                                <TableCell>{item.phone || "N/A"}</TableCell>
                                <TableCell>
                                    {item.city ? `${item.city}, ${item.state}` : item.state}
                                </TableCell>

                                <TableCell>
                                    {`${new Date(item.creationTimeStamp).getDate()}/${new Date(item.creationTimeStamp).getMonth() + 1}/${new Date(item.creationTimeStamp).getFullYear()}`}
                                </TableCell>
                                
                                <TableCell>
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
                                        onClick={() => { /* Add your detail view function here */ }}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>

                                <TableCell>
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
                    message="Are you sure you want to delete this user?"
                    onConfirm={handelDelete}
                    confirmText="Delete"
                    cancelText="Cancel"
                />
            </Box>

        </TableContainer>
    );
};




export default UsersTable;
