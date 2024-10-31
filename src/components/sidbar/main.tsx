import { useState, useEffect } from "react";
import { BiImageAdd, BiNews } from "react-icons/bi";
import { FiUser, FiLogOut, FiMessageSquare, FiSettings } from "react-icons/fi";
import { TbArrowBadgeLeft, TbArrowBadgeRight } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import useSidebarStore from "../../store/sidebar";

const Sidebar = ({ unreadCount }: { unreadCount: number }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("testimonials"); // Track active sidebar item
  const [isMobile, setIsMobile] = useState(false); // Track if in mobile view
  const {  isMobileOpen,isOpen,toggleSidebar,openSidebar,closeMObileSidebar } = useSidebarStore();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.substring(1); // Get path without "/"
    setActiveItem(currentPath || "testimonials"); // Default to "testimonials" if path is empty
  }, [location.pathname]);

  // Dynamically generated sidebar content (except logout)
  const sidebarItems = [
    { label: "news-feed", icon: <BiNews /> },
    { label: "contacts", icon: <FiUser /> },
    { label: "testimonials", icon: <FiMessageSquare /> },
    { label: "image-carousel", icon: <BiImageAdd /> },
  ];

  // Handle window resize to determine if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
      if (window.innerWidth >= 768) {
        openSidebar(); // Ensure the sidebar is open on larger screens
        closeMObileSidebar(); // Close mobile sidebar when switching to desktop
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  // Toggle sidebar

  const toggleMobileSidebar = () => {
    openSidebar();
    toggleMobileSidebar()
  };

  return (
    <div className="flex h-full">
      {/* Mobile Toggle Button */}
       {/* {isMobile && (
        <button
          className={` absolute top-0 w-full left-0 p-2  bg-gray-800 text-white  shadow-lg z-50`}
          onClick={toggleMobileSidebar}
        >
          <span className=" ">
          <MdViewSidebar className="h-5 w-5" />

          </span>
        </button>
      )} */}

      {/* Sidebar */}
      <div
       className={`fixed top-0 left-0 h-screen p-5 pt-8 bg-gray-800  transition-all duration-300 ${
        isMobileOpen ? 'w-64 z-40 lg:w-[250px]' : isOpen ? "w-64" : "w-20"
      } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} transition-all duration-300  xl:relative lg:relative flex flex-col justify-between`}
        // className={`h-screen p-5 pt-8 bg-gray-800 ${
        //   isOpen ? "w-64" : "w-20"
        // } transition-all duration-300 relative flex flex-col justify-between`}
      >
        {/* Toggle Button for Desktop */}
        {!isMobile && (
          <button
            className={`absolute lg:hidden md:hidden xl:block bottom-24 -right-3 p-2 bg-white rounded-full shadow-lg transform ${
              isOpen ? "" : "rotate-180"
            } transition-transform duration-300`}
            onClick={toggleSidebar}
          >
            <span className="text-black">
              {isOpen ? (
                <TbArrowBadgeLeft className="h-5 w-5" />
              ) : (
                <TbArrowBadgeRight className="h-5 w-5" />
              )}
            </span>
          </button>
        )}

        {/* Sidebar Content */}
        <ul className={`flex flex-col gap-2 ${isMobileOpen?'mt-10':""}`}>
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                closeMObileSidebar()
                setActiveItem(item.label); // Set active item
                navigate(`/${item.label}`);
              }}
              className={`flex capitalize items-center gap-x-4 p-2 rounded-md cursor-pointer transition-colors duration-300
                ${
                  activeItem === item.label
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }
              `}
            >
              <div className={`${isOpen ? "" : "relative"}`}>
                <span className="text-white text-xl">{item.icon}</span>
                {/* Display unread count badge */}
                {item.label === "contacts" && unreadCount > 0 && (
                  <span
                    className={` bg-red-500 text-white rounded-full px-2 text-xs transform ${
                      isOpen
                        ? "hidden" // Position it on the right end when sidebar is open
                        : "absolute -right-2 -top-1 translate-x-1/2 -translate-y-1/2" // Near the icon when sidebar is closed
                    }`}
                  >
                    {unreadCount}
                  </span>
                )}
              </div>
              <span
                className={`text-white text-sm font-medium transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0 w-0 h-0"
                }`}
              >
                {item.label}
              </span>
              {item.label === "contacts" && unreadCount > 0 && (
                <span
                  className={` bg-red-500 justify-end flex text-white rounded-full px-2 text-xs transform ${
                    isOpen
                      ? "" // Position it on the right end when sidebar is open
                      : "hidden translate-x-1/2 -translate-y-1/2" // Near the icon when sidebar is closed
                  }`}
                >
                  {unreadCount}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Logout Option - Positioned at Bottom */}
        <div className="flex flex-col gap-2">
          <li
            onClick={() => {
              closeMObileSidebar()
              navigate("/setting");
            }}
            className={`flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md cursor-pointer transition-colors duration-300
              ${activeItem === "setting" ? "bg-gray-700" : ""}
            `}
          >
            <span className="text-white text-xl">
              <FiSettings />
            </span>
            <span
              className={`text-white text-sm font-medium transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Setting
            </span>
          </li>
          <li
            onClick={() => {
              localStorage.removeItem('token');
              closeMObileSidebar()
              setActiveItem("Logout");
              navigate("/login");
            }}
            className={`flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md cursor-pointer transition-colors duration-300
              ${activeItem === "Logout" ? "bg-gray-700" : ""}
            `}
          >
            <span className="text-white text-xl">
              <FiLogOut />
            </span>
            <span
              className={`text-white text-sm font-medium transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Logout
            </span>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
