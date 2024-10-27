import { FaEdit, FaInstagram, FaTrashAlt, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion"; // Ensure framer-motion is installed
import { NewsFeed } from "../../types/types";

type NewsFeedCardProps = {
  newsFeed: NewsFeed;
  handleDelete: (id: number) => void;
  handleEdit: (newsFeed: NewsFeed) => void; // Function to handle editing
};

const NewsFeedCard = ({ newsFeed, handleEdit, handleDelete }: NewsFeedCardProps) => {
  // Extracting the first letter from newsFeed details
  const detailInitial = newsFeed.details.charAt(0).toUpperCase();

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <motion.div
      key={newsFeed.id}
      className="border border-white border-opacity-30 shadow-lg p-4 rounded-lg transition-transform transform hover:scale-105 bg-gray-700 group"
      whileHover={{ scale: 1.05 }} // Adds hover animation
    >
      <div className="flex justify-between items-center mb-2">
        {/* Profile Circle with NewsFeed Initial */}
        <div className="flex items-center space-x-3">
          {/* <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg">
            {detailInitial}
          </div> */}
          <h3 className="text-lg font-bold text-white">{newsFeed.details}</h3>
        </div>
        <p className="text-gray-400 text-xs">{new Date(newsFeed.date).toLocaleDateString()}</p>
      </div>

      <span className="flex flex-col mb-4">
        {newsFeed.mediaUrl && (
          <div className="mt-2">
            {newsFeed.fileType === "image" ? (
              <img
                src={newsFeed.mediaUrl}
                alt="media preview"
                className="rounded-lg w-full h-48 object-cover bg-gray-800"
              />
            ) : newsFeed.fileType === "video" ? (
              <video
                src={newsFeed.mediaUrl}
                controls
                className="rounded-lg w-full h-48 object-cover bg-gray-800"
              />
            ) : newsFeed.fileType === "instagram" ? (
              <a
                href={newsFeed.mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-48 bg-gray-800 text-white rounded-lg transition duration-300 hover:bg-gray-700"
              >
                <FaInstagram className="text-pink-500 text-2xl mr-2" />
                <span>View on Instagram</span>
              </a>
            ) : newsFeed.fileType === "youtube" ? (
              <div className="relative h-48 rounded-xl overflow-hidden max-w-full w-full" style={{ paddingBottom: "56.25%" }}>
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
      </span>

      <div className="flex justify-end group mt-4 space-x-2">
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
