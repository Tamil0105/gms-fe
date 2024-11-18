import { useState } from "react";
import {  PortFolio } from "../types/types";
import NewsFeedModal from "../components/popups/newsFeed";
import NewsFeedCard from "../components/card/newsFeedCard";
import { MdViewSidebar } from "react-icons/md";
import useSidebarStore from "../store/sidebar";
import { usePortfolio } from "../hook/usePortfolio";
import Button from "../components/button/main";

const PortfolioComponent = () => {
  const { toggleMobileSidebar,isMobileOpen } = useSidebarStore();
  const {createPortfolio,deletePortfolio,getportfolio,updatePortfolio } =
    usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<PortFolio | null>(null);
  const [edit, setEdit] = useState<boolean>(false);


  const handleCreateOrUpdate = (data: Omit<PortFolio, "id">) => {
    if (edit&&editData) {
      updatePortfolio
        .mutateAsync({ id: editData.id, updatedPortfolio: data })
        .then(() => {
          setIsModalOpen(false);
          setEditData(null); // Reset edit data
        });
    } else {
      createPortfolio.mutateAsync(data).then(() => {
        setIsModalOpen(false);
        setEditData(null);
      });
    }
  };

  const handleEdit = (newsFeed: PortFolio) => {
    setEdit(true)
    setEditData(newsFeed);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deletePortfolio.mutate(id);
  };

  // Show loading skeletons while fetching news feeds
  if (getportfolio.isLoading) {
    return (
      <div className="h-full w-full overflow-y-auto scroll-smooth ">
        <header className="flex sticky justify-between items-center p-2 border-b border-gray-600">
          <h1 className="text-lg font-semibold">PortFolio</h1>
          {/* <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add PortFolio
          </button> */}
          <Button needIcon={true} text={"Add PortFolio"} onClick={() =>{
        
        } }/>
        </header>
        {/* Skeleton Loader */}
        <div className="grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map(() => (
             <div className="bg-gray-200 animate-pulse rounded-lg shadow-md p-4">
             <div className="h-6 bg-gray-300 rounded mb-2"></div>
             <div className="h-4 bg-gray-300 rounded mb-2"></div>
             <div className="h-4 bg-gray-300 rounded mb-2"></div>
             <div className="h-4 bg-gray-300 rounded mb-2"></div>
             <div className="h-4 bg-gray-300 rounded mb-2"></div>
           </div>
          ))}
        </div>
      </div>
    );
  }

  // Show error message if there's an error fetching news feeds
  if (!getportfolio ||getportfolio.isError)
    return <div>Error: {getportfolio.error.message}</div>;

  // Render the list of news feeds
  return (
    <div className="h-screen  overflow-hidden w-full">
      <header className="flex  justify-between items-center p-2 border-b border-gray-600">
        <h1 className="text-lg font-semibold flex gap-2 items-center md:mb-0">
        <button
          className={`lg:hidden xl:hidden p-2 rounded  bg-primary-dark text-white  shadow-lg z-50`}
          onClick={() =>{toggleMobileSidebar()}}
        >
          <span className="flex gap-2 items-center justify-center ">
          <MdViewSidebar className="h-5 w-5" /> {isMobileOpen?<span>Menu</span>:null}

          </span>
        </button>
        PortFolio
        </h1>
        <Button needIcon={true} text={"Add PortFolio"} onClick={() =>{
          setEditData({
            date:'',
            details:'',
            fileType:"image",
            id:0,
            mediaUrl:""
          })
          
          setIsModalOpen(true)
        } }/>
        {/* <button
          onClick={() => {
            setEditData({
              date:'',
              details:'',
              fileType:"image",
              id:0,
              mediaUrl:""
            })
            setIsModalOpen(true)}}
          className="bg-blueButton text-white px-4 py-2 rounded hover:bg-blueButton-hover"
        >
          Add PortFolio
        </button> */}
      </header>

      {/* List of news feeds */}
      <div className="h-[90vh] custom-scrollbar w-full overflow-y-auto scroll-smooth">
      <div className="grid grid-cols-1 p-10 sm:grid-cols-2 lg:grid-cols-3 gap-4   ">
        {(getportfolio as any)?.data.map((newsFeed:PortFolio) => (
          <NewsFeedCard
          height={'50'}
            key={newsFeed.id}
            newsFeed={newsFeed}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
      </div>
  

      {/* Modal for creating/updating */}
      <NewsFeedModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={editData}
        loading={createPortfolio.isPending || updatePortfolio.isPending}
      />
    </div>
  );
};

export default PortfolioComponent;