import { useState } from "react";
import { MdDelete, MdViewSidebar } from "react-icons/md";
import useSidebarStore from "../store/sidebar";
import CarouselImageUploder from "../components/popups/carouselImagePopup";
import { useCarousel } from "../hook/useCarousel";
import toast from "react-hot-toast";
import { FaDesktop, FaMobileAlt } from "react-icons/fa";



const ImageUploadCarousel = () => {
  const { createCarousel, deleteCarousel, getCarousels } = useCarousel();
  const { toggleMobileSidebar, isMobileOpen } = useSidebarStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [deletingId, setDeletingId] = useState<number | null>(null);

  

  const handleCreateOrUpdate = async (data: { url: string ,phoneUrl:string}) => {
    await createCarousel.mutateAsync(data);
    setIsModalOpen(false);
  };

  const handleImageDelete = async (id: number) => {
    setDeletingId(id);
    await deleteCarousel.mutateAsync(id);
    toast.success('Successfully deleted');
    setDeletingId(null);
  };

  // const data = queryClient.getQueryData(['carousels']) as { id: number; url: string }[];
  if (getCarousels.isLoading) {
    return (
      <div className="h-full w-full overflow-y-auto scroll-smooth ">
        <header className="flex sticky justify-between items-center p-2 border-b border-gray-600">
          <h1 className="text-lg font-semibold">Carousel Image</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Carousel Image
          </button>
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
  if (!getCarousels ||getCarousels.isError)
    return <div>Error: {getCarousels.error.message}</div>;  return (
    <div className="h-screen  w-full overflow-y-auto scroll-smooth ">
      <header className="flex justify-between items-center p-2 border-b border-gray-600">
        <h1 className="text-lg font-semibold flex gap-2 items-center md:mb-0">
          <button
            className={`lg:hidden xl:hidden p-2 rounded bg-gray-800 text-white shadow-lg z-50`}
            onClick={toggleMobileSidebar}
          >
            <span className="flex gap-2 items-center justify-center">
              <MdViewSidebar className="h-5 w-5" /> {isMobileOpen ? <span>Menu</span> : null}
            </span>
          </button>
          Carousel Image
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add  Carousel Image
        </button>
      </header>

      <div className="grid grid-cols-1 w-full p-10 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {
          getCarousels?.data?.map((image, index) => (
            <div key={index} className="relative flex-shrink-0 w-full h-40 md:h-48 lg:h-56">
              <div className="w-full flex gap-2 rounded-xl p-1 border h-full relative">
      {/* Desktop Image */}
      <div className="relative w-[70%] h-full">
        <img
          src={image.url}
          alt={`Uploaded ${image.id}`}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
        {/* Icon and Details Overlay */}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white p-2 rounded-lg flex items-center gap-2">
          <FaDesktop className="text-lg" />
          <div>
            <p className="text-sm font-semibold">Desktop View</p>
          </div>
        </div>
      </div>

      {/* Phone Image */}
      <div className="relative w-[30%] h-full">
        <img
          src={image.phoneUrl}
          alt={`Uploaded ${image.id}`}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
        {/* Icon and Details Overlay */}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white p-1 rounded-lg flex items-center gap-2">
          <FaMobileAlt className="text-lg" />
          <div>
            <p className="text-sm font-semibold">Phone View</p>
          </div>
        </div>
      </div>
    </div>
              
              <button
                onClick={() => handleImageDelete(image.id)}
                disabled={deletingId === image.id}
                className={`absolute top-2 right-2 ${deletingId === image.id ? 'bg-gray-500' : 'bg-red-500'} text-white p-1 md:p-2 rounded-full hover:bg-red-600`}
              >
                {deletingId === image.id ? (
                  <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full text-gray-600" role="status">
                    <span className="sr-only">Deleting...</span>
                  </div>
                ) : (
                  <MdDelete className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </button>
            </div>
          ))
        }
      </div>
      <CarouselImageUploder
      allowImage={true}
      allowVideo={false}
       upload={false}
        loading={createCarousel.isPending}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdate}
      />
    </div>
  );
};

export default ImageUploadCarousel;