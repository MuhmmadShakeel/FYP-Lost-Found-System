import React, { useState } from "react";
import Sidebar from "../../components/admindashboard/admincommon/Sidebar";
import AdminNav from "../../components/admindashboard/admincommon/AdminNav";
import AllClaimedItem from "../../components/admindashboard/allclaimeditem/AllClaimedItem";

function AllClaimedItemPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
          <AllClaimedItem />
        </div>
     
    
  );
}

export default AllClaimedItemPage;
