import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { useGetDashboardDetailsQuery } from "../../Services/dashboardApi";
import { ScaleLoader } from "react-spinners";
import React, { useMemo } from "react";

// Memoized DashboardCard component to prevent unnecessary re-renders
const DashboardCard = React.memo(({ title, data, gradient }) => (
  <Grid item xs={12} sm={6} md={3} key={title}>
    <Card
      sx={{
        p: 2,
        boxShadow: 4,
        borderRadius: 2,
        background: gradient,
        color: "#fff",
        transition: "0.3s",
        "&:hover": { transform: "scale(1.03)", boxShadow: 8 },
      }}
    >
      <CardContent sx={{ p: 1 }}>
        <Typography variant="body1" fontWeight="bold" sx={{ opacity: 0.9 }}>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ mt: 0.5 }}>
          {data?.overall ?? "N/A"}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>Today</Typography>
            <Typography variant="h6" fontWeight="bold">{data?.today ?? "N/A"}</Typography>
          </Box>
          <Box sx={{ height: "30px", width: "1px", bgcolor: "rgba(255,255,255,0.6)", mx: 1 }} />
          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>Last Month</Typography>
            <Typography variant="h6" fontWeight="bold">{data?.lastMonth ?? "N/A"}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Grid>
));

const Dashboard = () => {
  const { data, isLoading, error } = useGetDashboardDetailsQuery();

  // Memoized mapping of dashboard items for efficiency
  const dashboardItems = useMemo(() => [
    { key: "listing", title: "Overall Listings", gradient: "linear-gradient(135deg, #6a11cb, #2575fc)" },
    { key: "userRequest", title: "Overall Requests", gradient: "linear-gradient(135deg, #ff9a9e, #fad0c4)" },
    { key: "user", title: "Total Users", gradient: "linear-gradient(135deg, #43cea2, #185a9d)" },
    { key: "userDataAndroid", title: "Android Users", gradient: "linear-gradient(135deg, #ff7eb3, #ff758c)" },
    { key: "userDataIOS", title: "iOS Users", gradient: "linear-gradient(135deg, #ff9966, #ff5e62)" },
    { key: "userDataBusiness", title: "Business Users", gradient: "linear-gradient(135deg, #56ccf2, #2f80ed)" },
    { key: "chatrooms", title: "Overall Conversations", gradient: "linear-gradient(135deg, #8e2de2, #4a00e0)" },
  ], []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "83vh", bgcolor: "#f4f6f8", p: 2 }}>
      <Box component="main" sx={{ flexGrow: 1, width: "100%", pt: 0, pb: 0 }}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "83vh" }}>
            <ScaleLoader color="#5ceacf" height={40} width={5} />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography color="error" variant="h6">
              Failed to load dashboard data.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {dashboardItems.map((item) => {
              const itemData = data?.[item.key];
              return <DashboardCard key={item.key} title={item.title} data={itemData} gradient={item.gradient} />;
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
