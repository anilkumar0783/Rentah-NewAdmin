import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Store/usersSlice";
import { Box } from "@mui/material";

import UsersTable from "../../Components/Tables/userTable";

const Users = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [count,setCount]=useState(0)
    
    
    const { data: users = [], status, totalCount = 0 } = useSelector((state) => state.users|| {});

  const loading = status === "loading";
  useEffect(() => {
    const skip = (page - 1) * rowsPerPage;  // Correct offset calculation
    console.log("Fetching users with skip:", skip, "limit:", rowsPerPage); 
    dispatch(getUsers({ skip, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]); // Fetch when these values change

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 3000); // Simulate API delay
  // }, []);

  console.log("Users from Redux:", users);
console.log("Total count from Redux:", totalCount);
  return (
    <Box>
    
        <UsersTable loading={loading} users={users} page={page} count={totalCount} setPage={setPage} totalCount={totalCount} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
     
    </Box>
  );
};

export default Users;
