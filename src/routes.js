import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import UserAdmin from "views/UserAdmin/UserAdmin";
import TripList from "views/Trips/TripList";
import Users from "views/Users";
import Drivers from "views/Drivers/Drivers";
import Complaints from "views/Complaints/Complaints";
import TransactionList from "views/Transactions/TransactionList";
const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin",
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-paper-2",
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "nc-icon nc-circle-09",
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  {
    path: "/userAdmin",
    name: "Admin User",
    icon: "nc-icon nc-single-02",
    component: UserAdmin,
    layout: "/admin",
  },
  {
    path: "/tripList",
    name: "Trips",
    icon: "nc-icon nc-bus-front-12",
    component: TripList,
    layout: "/admin",
  },
  {
    path: "/transactionList",
    name: "Transactions",
    icon: "nc-icon nc-bank",
    component: TransactionList,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-circle-09",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/drivers",
    name: "Drivers",
    icon: "nc-icon nc-delivery-fast",
    component: Drivers,
    layout: "/admin",
  },
  {
    path: "/complaints",
    name: "Complaints",
    icon: "nc-icon nc-notes",
    component: Complaints,
    layout: "/admin",
  },
];

export default dashboardRoutes;
