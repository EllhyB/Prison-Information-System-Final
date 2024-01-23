import { Sidebar } from "flowbite-react";
import bjmplogo from "../assets/BJMP LOGO.png";
import { HiInbox, HiTable, HiOutlineCloudUpload } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../contacts/AuthProvider";
import { useNavigate } from "react-router-dom";

const theme = {
  sidebar: `bg-sky-950 absolute top-0 left-0 text-white w-72 h-screen`,
  sideitems: `text-white flex items-start justify-start hover:text-blue-900 mx-2 cursor-pointer text-xl mt-5`,
  sidebarGroup: `mt-10`,
  iconColor: "#fcd34d",
  iconSize: "38px",
  sidebarLogo: `flex items-center justify-center mr-5 w-52`,
};

const SideBar = () => {
  //function for logging out
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      //logging out success
      alert("Sign-Out Successfully!");
      //redirect to the home page
      navigate("/");
    } catch (error) {
      //handle error
      console.log("Error logging out: ", error);
    }
  };

  return (
    <Sidebar aria-label="Sidebar with content separator example">
      <div className={theme.sidebar}>
        <div className={theme.sidebarGroup}>
          <div className="flex flex-col items-center justify-between">
            <img src={bjmplogo} className={theme.sidebarLogo} />
            <h1 className="mb-10 text-2xl font-semibold">BJMP</h1>
          </div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="/admin/dashboard/upload"
                icon={() => (
                  <HiOutlineCloudUpload
                    style={{ color: theme.iconColor, fontSize: theme.iconSize }}
                  />
                )}
                className={theme.sideitems}
              >
                Upload Info
              </Sidebar.Item>
              <Sidebar.Item
                className={theme.sideitems}
                href="/admin/dashboard/manage"
                icon={() => (
                  <HiInbox
                    style={{ color: theme.iconColor, fontSize: theme.iconSize }}
                  />
                )}
              >
                Manage Info
              </Sidebar.Item>
              <Sidebar.Item
                className={theme.sideitems}
                onClick={handleLogout}
                icon={() => (
                  <HiTable
                    style={{ color: theme.iconColor, fontSize: theme.iconSize }}
                  />
                )}
              >
                Logout
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};
export default SideBar;
