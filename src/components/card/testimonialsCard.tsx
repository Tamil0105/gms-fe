import { FaEdit, FaInstagram, FaStar, FaTrashAlt, } from "react-icons/fa";
import { motion } from "framer-motion"; // Ensure framer-motion is installed
import { Testimonial } from "../../types/types";

type TestimonialCardProps = {
  testimonial: Testimonial;
  handleDelete: (id: number) => void;
  handleEdit: (id: Testimonial) => void; // Function to handle editing
};

const TestimonialCard = ({ testimonial, handleEdit, handleDelete }: TestimonialCardProps) => {
  // Get the first letter of the author's name
  const authorInitial = testimonial.authorName.charAt(0).toUpperCase();
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  return (
    <motion.div
      key={testimonial.id}
      className="border border-white border-opacity-30 shadow-lg p-4 rounded-lg transition-transform transform hover:scale-105 bg-gray-700 group"
      whileHover={{ scale: 1.05 }} // Adds hover animation
    >
      <div className="flex justify-between items-center mb-2">
        {/* Profile Circle with Author Initial */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg">
            {authorInitial}
          </div>
          <h3 className="text-lg font-bold text-white">{testimonial.authorName}</h3>
        </div>

        <div className="flex items-center">
          <span className="text-yellow-500">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={index < testimonial.rating ? "inline" : "inline opacity-50"}
              />
            ))}
          </span>
          <span className="ml-2 text-gray-200">{testimonial.rating}/5</span>
        </div>
      </div>

      <span className="flex flex-col mb-4">
        <p className="text-gray-200">{testimonial.content}</p>
        {testimonial.mediaUrl && (
          <div className="mt-2">
            {testimonial.fileType === "image" ? (
              <img
                src={testimonial.mediaUrl}
                alt="media preview"
                className="rounded-lg w-full h-48 object-cover bg-gray-800"
              />
            ) : testimonial.fileType === "video" ? (
              <video
                src={testimonial.mediaUrl}
                controls
                className="rounded-lg w-full h-48 object-cover bg-gray-800"
              />
            ) : testimonial.fileType === "instagram" ? (
              <a
                href={testimonial.mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-48 bg-gray-800 text-white rounded-lg transition duration-300 hover:bg-gray-700"
              >
                <FaInstagram className="text-pink-500 text-2xl mr-2" />
                <span>View on Instagram</span>
              </a>
            ) : testimonial.fileType === "youtube" ? (
              <div className="relative h-48 rounded-xl overflow-hidden max-w-full w-full" style={{ paddingBottom: "56.25%" }}>
             <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${getYoutubeId(testimonial.mediaUrl)}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube video"
                />
              </div>
            ) : null}
          </div>
        )}
      </span>

      <div className="flex justify-end group mt-4 space-x-2">
        <button
          onClick={() => handleEdit(testimonial)}
          className="text-white p-1 rounded flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <FaEdit className="text-lg text-white hover:animate-bounce" />
        </button>
        <button
          onClick={() => handleDelete(testimonial.id)}
          className="text-white p-1 rounded flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <FaTrashAlt className="text-lg text-white hover:animate-bounce" />
        </button>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
