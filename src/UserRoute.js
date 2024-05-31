import React from "react";
import Dashboard from "views/Dashboard";
import Users from "views/Users";
import Drivers from "views/Drivers/Drivers";
import Complaints from "views/Complaints/Complaints";
import LeaderboardTwoToneIcon from "@mui/icons-material/LeaderboardTwoTone";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FeedbackIcon from "@mui/icons-material/Feedback";
const UserRoute = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <LeaderboardTwoToneIcon sx={{ mr: 2 }} />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: <GroupsRoundedIcon sx={{ mr: 2 }} />,
    component: Users,
    layout: "/admin",
  },
  {
    path: "/drivers",
    name: "Drivers",
    icon: <DirectionsCarIcon sx={{ mr: 2 }} />,
    component: Drivers,
    layout: "/admin",
  },
  {
    path: "/complaints",
    name: "Complaints",
    icon: <FeedbackIcon sx={{ mr: 2 }} />,
    component: Complaints,
    layout: "/admin",
  },
];

export default UserRoute;
