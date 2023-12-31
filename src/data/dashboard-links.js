import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
  {
    name: "Wishlist",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscEdit",
  }, 
  {
    id: 5,
    name: "Queries",
    path: "/dashboard/asked-enquiries",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscAdd",
  },
  {
    id: 6,
    name: "Solve Enquiry",
    path: "/dashboard/solve-enquiry",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  }
];
