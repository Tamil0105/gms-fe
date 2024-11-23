import { useState } from "react";
import { MdDelete, MdViewSidebar } from "react-icons/md";
import useSidebarStore from "../store/sidebar";
import CarouselImageUploder from "../components/popups/carouselImagePopup";
import { useCarousel } from "../hook/useCarousel";
import toast from "react-hot-toast";
import { FaDesktop, FaMobileAlt } from "react-icons/fa";
import Button from "../components/button/main";



const ImageUploadCarousel = () => {
  const { createCarousel, deleteCarousel, getCarousels } = useCarousel();
  const { toggleMobileSidebar, isMobileOpen } = useSidebarStore();
  const [isWarningPopup, setIsWarningPopupOpen] = useState(false);
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
      <div className="h-screen w-full overflow-y-hidden ">
        <header className="flex sticky justify-between items-center   p-2  border-gray-600">
          <h1 className="text-lg font-semibold">Carousel Image</h1>
          {/* <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blueButton text-white px-4 py-2 rounded hover:bg-blueButton-hover"
          >
            Add Carousel Image
          </button> */}
          <Button disabled={true}  needIcon={true} text={"Add  Carousel Image"} onClick={() =>{
          
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
  if (!getCarousels ||getCarousels.isError)
    return <div>Error: {getCarousels.error.message}</div>;  return (
    <div className="h-screen overflow-hidden   w-full  ">
      <header className="flex sticky  justify-between items-center p-2 border-b border-secondary-light">
        <h1 className="text-lg font-semibold flex gap-2 items-center md:mb-0">
          <button
            className={`lg:hidden xl:hidden p-2 rounded bg-primary-dark text-white shadow-lg z-50`}
            onClick={toggleMobileSidebar}
          >
            <span className="flex gap-2 items-center justify-center">
              <MdViewSidebar className="h-5 w-5" /> {isMobileOpen ? <span>Menu</span> : null}
            </span>
          </button>
          Carousel Image
        </h1>
        <Button  needIcon={true} text={"Add  Carousel Image"} onClick={() =>{
          getCarousels?.data?.length==5?setIsWarningPopupOpen(true):
          setIsModalOpen(true)
        } }/>
        {/* <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blueButton text-white px-4 py-2 rounded hover:bg-blueButton-hover"
        >
          Add  Carousel Image
        </button> */}
      </header>

      <div className="grid grid-cols-1 w-full p-10 sm:grid-cols-2 lg:grid-cols-2 gap-4 overflow-y-auto scroll-smooth custom-scrollbar h-[90vh]">
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
      {/* Warning Popup */}
      {isWarningPopup && (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-800/70 to-black/80">
       <div className="relative w-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
         <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
         
         <div className="p-8">
           <div className="flex items-center justify-center mb-6">
             <div className="bg-red-100 text-red-600 p-4 rounded-full animate-pulse">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
             </div>
           </div>
     
           <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
             Upload Limit Reached
           </h2>
     
           <p className="text-center text-gray-600 mb-6 text-base leading-relaxed">
             You have reached the maximum upload limit of 5 images. 
             Please remove some existing images before uploading new ones.
           </p>
     
           <div className="flex justify-center space-x-4">
             <button 
               onClick={() => setIsWarningPopupOpen(false)}
               className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg 
               hover:from-red-600 hover:to-orange-600 
               transition-all duration-300 
               transform hover:-translate-y-1 
               shadow-lg hover:shadow-xl 
               flex items-center space-x-2"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
               <span>Understood</span>
             </button>
           </div>
         </div>
       </div>
     </div>
      )}
    </div>
  );
};

export default ImageUploadCarousel;