import React, { useState } from "react";
import { Testimonial } from "../types/types";
import { useTestimonials } from "../hook/useTestimnials";

import TestimonialCard from "../components/card/testimonialsCard";
import TestimonialModal from "../components/popups/testimonials";
import { MdViewSidebar } from "react-icons/md";
import useSidebarStore from "../store/sidebar";
import Button from "../components/button/main";

const TestimonialsPage: React.FC = () => {
  const {  toggleMobileSidebar,isMobileOpen } = useSidebarStore();

  const {
    getAllTestimonials,
    createTestimonial,
    editTestimonial,
    deleteTestimonial,
  } = useTestimonials();
  const [editData, setEditData] = useState<Testimonial | null>(null);
  const [edit, setEdit] = useState<boolean>(false);


  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Handle testimonial creation

  const handleCreateOrUpdate = (data: Omit<Testimonial, "id">) => {
    if (edit&&editData) {
      editTestimonial
        .mutateAsync({
          id: editData.id,
          updatedTestimonial:  data ,
        })
        .then(() => {
          setIsModalOpen(false);
          setEditData(null); // Reset edit data
        });
    } else {
      createTestimonial.mutateAsync(data).then(() => {
        setIsModalOpen(false);
        setEditData(null);
      });
    }
  };

  // Handle testimonial editing

  // Handle testimonial deletion
  const handleDelete = (id: number) => {
    deleteTestimonial.mutate(id);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEdit(true)
    setEditData(testimonial);
    setIsModalOpen(true);
  };

  if (getAllTestimonials.isLoading) {
    return ( <div className="h-screen  w-full overflow-y-auto scroll-smooth ">
      <header className="flex sticky justify-between items-center p-2 border-b border-gray-600">
        <h1 className="text-lg font-semibold">News Feed</h1>
        <button
          onClick={() =>{setEditData(null) ;setIsModalOpen(true)}}
          className="bg-blueButton text-white px-4 py-2 rounded hover:bg-blueButton-hover"
        >
         Add New Testimonial  
        </button>
        <Button needIcon={true} text={"Add  Testimonial"}           onClick={() =>{setEditData(null) ;setIsModalOpen(true)}}
        />        
      </header>
      {/* Skeleton Loader */}
      <div className="grid  w-full grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>);
  }

  if (getAllTestimonials.isError) {
    return <p>Error loading testimonials.</p>;
  }
console.log(editData)
  return (
    <div className="h-screen w-full overflow-y-auto scroll-smooth">

      {/* Button to open modal */}
     
      <header className="flex justify-between items-center p-2 border-b border-gray-600">
        <h1 className="text-lg font-semibold flex gap-2 items-center md:mb-0">
          <button
          className={`lg:hidden xl:hidden p-2 rounded  bg-gray-800 text-white  shadow-lg z-50`}
          onClick={() =>{toggleMobileSidebar()}}
        >
          <span className="flex gap-2 items-center justify-center ">
          <MdViewSidebar className="h-5 w-5" /> {isMobileOpen?<span>Menu</span>:null}

          </span>
        </button>
        Testimonials</h1>
        <Button needIcon={true} text={"Add  Testimonial"}           onClick={() =>{setEditData(null) ;setIsModalOpen(true)}}
        />
        {/* <button
          onClick={() =>{
            setEditData({
              authorName:"",
              content:"",
              mediaUrl:"",
              fileType:'image',
              rating:5,
              id:0,
              createdAt:new Date()
            });
            setIsModalOpen(true)
          }}
          className="bg-blueButton text-white px-4 py-2 rounded hover:bg-blue-600"
        >
 Add New Testimonial        </button> */}

 
      </header>

      {/* Modal for adding new testimonial */}
      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => {
          setEditData(null);
          setIsModalOpen(false);
        }}
        initialData={editData as Testimonial}
        onSubmit={handleCreateOrUpdate}
        loading={createTestimonial.isPending || editTestimonial.isPending}
      />

      {/* Display testimonials */}
      <div>
        <div className="grid grid-cols-1 p-10 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {getAllTestimonials.data?.map((testimonial: Testimonial) => (
            <TestimonialCard
              handleEdit={handleEdit}
              key={testimonial.id}
              testimonial={testimonial}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
