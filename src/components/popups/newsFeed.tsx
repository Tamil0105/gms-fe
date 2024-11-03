import React, { useEffect, useState } from 'react';
import { AiOutlineCalendar, AiOutlinePaperClip, AiOutlinePlus, AiOutlineEdit, AiOutlineLoading } from 'react-icons/ai';
import { useImageUpload } from '../../hook/useImageUpload';
import { NewsFeed } from '../../types/types';
import FileUploader from '../fileUploder/main';
import CustomDropdown from '../dropdown/main';
import { FaImage, FaInstagram, FaVideo, FaYoutube } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void; // Adjust the type as needed
  initialData?: any; 
  loading?: boolean; // Optional initial data for editing
}

const NewsFeedModal: React.FC<ModalProps> = ({ isOpen, loading, onClose, onSubmit, initialData }) => {
  const { updateFile, uploadFile, deleteFile } = useImageUpload();
  const [form, setForm] = useState<Partial<NewsFeed>>({
    date: initialData?.date || '',
    details: initialData?.details || '',
    mediaUrl: initialData?.mediaUrl || '',
    fileType: initialData?.fileType || 'image',
  });
  const [fileType, setFileType] = useState("image");
  const [imageUrl, setImageUrl] = useState("");
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const options = [
    { value: 'image', label: 'Image', icon: <FaImage />, color: 'text-blue-500' },
    { value: 'video', label: 'Video', icon: <FaVideo />, color: 'text-red-500' },
    { value: 'instagram', label: 'Instagram Link', icon: <FaInstagram />, color: 'text-pink-500' },
    { value: 'youtube', label: 'YouTube Link', icon: <FaYoutube />, color: 'text-red-500' },
  ];
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form
    if (!form.date || !form.details || (fileType === 'instagram' && !form.mediaUrl) || (fileType === 'youtube' && !form.mediaUrl)) {
      setError("Please fill all required fields and provide a valid link for Instagram or YouTube.");
      return;
    }

    onSubmit(form);
    setForm({
      date: "",
      details: "",
      fileType: "image",
      mediaUrl: "",
    });
    setFileType('image');
    setImageUrl('');
    setError(null);
  };

  useEffect(() => {
    if (initialData) {
      setForm({
        date: new Date().toISOString().split("T")[0],
        details: initialData.details,
        mediaUrl: initialData.mediaUrl,
        fileType: initialData.fileType,
      });
      setFileType(initialData.fileType);
      setImageUrl(initialData.mediaUrl);
    }
  }, [initialData]);
console.log(form,fileType)
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const fileType = file.type;
      const isImage = fileType.startsWith("image/");
      const isVideo = fileType.startsWith("video/");

      // Accept only image or video files
      if (!isImage && !isVideo) {
        setError("Only image or video files are allowed");
        return;
      }

      // Validate file size (1 MB for image, 10 MB for video)
      const maxSize = isImage ? 1 * 1024 * 1024 : 50 * 1024 * 1024; // 1 MB for image, 50 MB for video
      if (file.size > maxSize) {
        setError(`File size should be less than ${isImage ? "1 MB" : "50 MB"}`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await uploadFile.mutateAsync({ file: formData, folderKey: "banner-img" });
        setForm({ ...form, mediaUrl: res.url, fileType: isImage ? 'image' : 'video' });
        setImageUrl(res.url);
        setError(null);
      };

      reader.readAsDataURL(file);
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
      <div className="fixed inset-0 text-black flex items-center justify-center z-50 bg-black bg-opacity-50 dark:bg-opacity-70">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-screen overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            {initialData ? (
              <AiOutlineEdit className="mr-2 text-lg" />
            ) : (
              <AiOutlinePlus className="mr-2 text-lg" />
            )}
            {initialData ? 'Edit News Feed' : 'Add News Feed'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col gap-3">
              {/* Date Input */}
              <div className="flex-1">
                <label className="flex items-center mb-1 text-sm">
                  <AiOutlineCalendar className="mr-1 text-sm" />
                  Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                  className="w-full border p-1 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
              
              {/* Details Textarea */}
              <div className="flex-1">
                <label className="flex items-center mb-1 text-sm">
                  <AiOutlinePaperClip className="mr-1 text-sm" />
                  Details
                </label>
                <textarea
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  placeholder="Details"
                  required
                  className="w-full border p-1 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* File Type Selector */}
      <CustomDropdown options={options} selectedValue={fileType} onSelect={(value) =>{
            console.log(value,"value")
        setFileType(value as any)
        setForm({...form,fileType:value as any})
        }} />
      <div className="">Selected File Type: {fileType}</div>

            {/* Media URL Input for Instagram and YouTube */}
            {fileType === 'instagram' || fileType === 'youtube' ? (
              <div className="flex-1">
                <label className="flex items-center mb-1 text-sm">
                  <AiOutlinePaperClip className="mr-1 text-sm" />
                  {fileType.charAt(0).toUpperCase() + fileType.slice(1)} Link
                </label>
                <input
                  type="url"
                  value={form.mediaUrl}
                  onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })}
                  placeholder={`Enter ${fileType.charAt(0).toUpperCase() + fileType.slice(1)} Link`}
                  required={fileType === 'instagram' || fileType === 'youtube'}
                  className="w-full border p-1 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
            ) : (
              // File Uploader for Images and Videos
              <div>
                <FileUploader
                
                    handleRemoveFile={handleRemoveImage}
                    handleUpdateFile={handleImageChange}
                    handleFileChange={handleImageChange}
                    handleDrop={handleDrop}
                    handleDragOver={handleDragOver}
                    handleDragLeave={handleDragLeave}
                    dragging={dragging}
                    fileUrl={imageUrl}
                    fileType={fileType}
                    uploaded={!!imageUrl}
                    loading={uploadFile.isPending || deleteFile.isPending || updateFile.isPending} allowImageUpload={true} allowVideoUpload={true}                    />
              </div>
            )}

            {/* Error Message */}
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
                type="submit"
                className={`bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? <AiOutlineLoading className="animate-spin" /> : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : null
  );
};

export default NewsFeedModal;
