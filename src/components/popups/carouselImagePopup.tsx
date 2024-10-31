import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineLoading } from 'react-icons/ai';
import { useImageUpload } from '../../hook/useImageUpload';
import FileUploader from '../fileUploder/main';

interface ModalProps {
  isOpen: boolean;
  upload:boolean
  onClose: () => void;
  onSubmit: (data: {url:string}) => void;
  loading?: boolean;
}

const CarouselImageUploder: React.FC<ModalProps> = ({ isOpen, loading,upload, onClose, onSubmit }) => {
  const { updateFile, uploadFile, deleteFile } = useImageUpload();
  const [imageUrl, setImageUrl] = useState("");
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      const isImage = fileType.startsWith("image/");
      const isVideo = fileType.startsWith("video/");

      // File validation for type and size
      if (!isImage && !isVideo) {
        setError("Only image or video files are allowed");
        return;
      }

      const maxSize = isImage ? 1 * 1024 * 1024 : 50 * 1024 * 1024; // 1 MB for image, 50 MB for video
      if (file.size > maxSize) {
        setError(`File size should be less than ${isImage ? "1 MB" : "50 MB"}`);
        return;
      }

      // Upload file
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadFile.mutateAsync({ file: formData, folderKey: "banner-img" });
      setImageUrl(res.url);
      setError(null);
      onSubmit({ url: res.url});
    }
  };

  const handleRemoveImage = async () => {
    await deleteFile.mutateAsync({ fileKey: imageUrl.split("/").pop() as any, folderKey: "banner-img" });
    setImageUrl('');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageChange({ target: { files: [file] } } as any);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-screen overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <AiOutlinePlus className="mr-2 text-lg" />
            Upload Media
          </h2>
          <FileUploader
                      handleRemoveFile={handleRemoveImage}
                      handleUpdateFile={handleImageChange}
                      handleFileChange={handleImageChange}
                      handleDrop={handleDrop}
                      handleDragOver={handleDragOver}
                      handleDragLeave={handleDragLeave}
                      dragging={dragging}
                      fileUrl={imageUrl}
                      uploaded={upload}
                      loading={uploadFile.isPending || deleteFile.isPending || updateFile.isPending} fileType={'image'}          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-3 py-1 rounded mr-2 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSubmit({ url: imageUrl })}
              className={`bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? <AiOutlineLoading className="animate-spin" /> : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default CarouselImageUploder;
