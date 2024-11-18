import { FaEdit, FaInstagram, FaTrashAlt, } from "react-icons/fa";
import { motion } from "framer-motion"; // Ensure framer-motion is installed
import { NewsFeed } from "../../types/types";
import { useState } from "react";

type NewsFeedCardProps = {
  newsFeed: NewsFeed;
  height:any
  handleDelete: (id: number) => void;
  handleEdit: (newsFeed: NewsFeed) => void; // Function to handle editing
};

const NewsFeedCard = ({ newsFeed, handleEdit,height, handleDelete }: NewsFeedCardProps) => {
  // Extracting the first letter from newsFeed details
  const [isExpanded, setIsExpanded] = useState(false);
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <motion.div
    key={newsFeed.id}
    className={`border h-[${height}vh] border-white border-opacity-30 shadow-lg p-4 rounded-lg transition-transform transform hover:scale-105 bg-gray-700 group`}
    whileHover={{ scale: 1.05 }}
  >
    <div className="flex justify-between items-center mb-3">
   
      <p className="text-gray-400 text-xs">{new Date(newsFeed.date).toLocaleDateString()}</p>
    </div>

    {/* Description Section */}
    <div className="mb-4">
      <p
        className={`text-sm text-gray-300 ${
          isExpanded ? '' : 'line-clamp-3'
        }`}
      >
        {newsFeed.details}
      </p>
      {newsFeed.details.length > 100 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 text-xs mt-2 focus:outline-none hover:underline"
        >
          {isExpanded ? 'View Less' : 'View More'}
        </button>
      )}
    </div>

    {/* Media Section */}
    <div className="flex flex-col mb-4">
      {newsFeed.mediaUrl && (
        <div className="mt-2">
          {newsFeed.fileType === "image" ? (
            <img
              src={newsFeed.mediaUrl}
              alt="media preview"
              className="rounded-lg w-full h-40 object-cover bg-gray-800"
            />
          ) : newsFeed.fileType === "video" ? (
            <video
              src={newsFeed.mediaUrl}
              controls
              className="rounded-lg w-full h-40 object-cover bg-gray-800"
            />
          ) : newsFeed.fileType === "instagram" ? (
            <a
              href={newsFeed.mediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-40 bg-gray-800 text-white rounded-lg transition duration-300 hover:bg-gray-700"
            >
              <FaInstagram className="text-pink-500 text-2xl mr-2" />
              <span className="text-sm">View on Instagram</span>
            </a>
          ) : newsFeed.fileType === "youtube" ? (
            <div
              className="relative h-40 rounded-lg overflow-hidden w-full"
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${getYoutubeId(newsFeed.mediaUrl)}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video"
              />
            </div>
          ) : null}
        </div>
      )}
    </div>

    {/* Action Buttons */}
    <div className="flex items-end justify-end w-full right-2 group  absolute  top-3 ">
      <button
        onClick={() => handleEdit(newsFeed)}
        className="text-white p-1 rounded flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <FaEdit className="text-lg text-white hover:animate-bounce" />
      </button>
      <button
        onClick={() => handleDelete(newsFeed.id)}
        className="text-white p-1 rounded flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <FaTrashAlt className="text-lg text-white hover:animate-bounce" />
      </button>
    </div>
  </motion.div>
  
  );
};

export default NewsFeedCard;
