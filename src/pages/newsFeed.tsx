import { useState } from "react";
import { useNewsFeed } from "../hook/useNewsFeed";
import { NewsFeed } from "../types/types";
import NewsFeedModal from "../components/popups/newsFeed";
import NewsFeedCard from "../components/card/newsFeedCard";
import { MdViewSidebar } from "react-icons/md";
import useSidebarStore from "../store/sidebar";
import Button from "../components/button/main";

const NewsFeedComponent = () => {
  const { toggleMobileSidebar,isMobileOpen } = useSidebarStore();
  const { getNewsFeeds, createNewsFeed, updateNewsFeed, deleteNewsFeed } =
    useNewsFeed();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<NewsFeed | null>(null);
  const [edit, setEdit] = useState<boolean>(false);


  const handleCreateOrUpdate = (data: Omit<NewsFeed, "id">) => {
    if (edit&&editData) {
      updateNewsFeed
        .mutateAsync({ id: editData.id, updatedNewsFeed: data })
        .then(() => {
          setIsModalOpen(false);
          setEditData(null); // Reset edit data
        });
    } else {
      createNewsFeed.mutateAsync(data).then(() => {
        setIsModalOpen(false);
        setEditData(null);
      });
    }
  };

  const handleEdit = (newsFeed: NewsFeed) => {
    setEdit(true)
    setEditData(newsFeed);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteNewsFeed.mutate(id);
  };

  // Show loading skeletons while fetching news feeds
  if (getNewsFeeds.isLoading) {
    return (
      <div className="h-full w-full overflow-y-auto scroll-smooth ">
        <header className="flex sticky justify-between items-center p-2 border-b border-gray-600">
          <h1 className="text-lg font-semibold">News Feed</h1>
          <Button    needIcon={true}          onClick={() => setIsModalOpen(true)}
 text={"Add News Feed"}/>
          {/* <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add News Feed
          </button> */}
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
  if (!getNewsFeeds ||getNewsFeeds.isError)
    return <div>Error: {getNewsFeeds.error.message}</div>;

  // Render the list of news feeds
  return (
    <div className="h-screen   w-full overflow-hidden">
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
          News Feed
        </h1>
        <Button  needIcon={true} text={" Add News Feed"} onClick={() =>{
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
          Add News Feed
        </button> */}
      </header>

      {/* List of news feeds */}
      <div className="grid grid-cols-1 p-10 sm:grid-cols-2 lg:grid-cols-3 gap-4 custom-scrollbar w-full overflow-y-auto scroll-smooth ">
        {(getNewsFeeds as any)?.data.map((newsFeed:NewsFeed) => (
          <NewsFeedCard
          height={60}
            key={newsFeed.id}
            newsFeed={newsFeed}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
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
        loading={createNewsFeed.isPending || updateNewsFeed.isPending}
      />
    </div>
  );
};

export default NewsFeedComponent;