import React, { useEffect, useState } from "react";
import {
  AiOutlinePaperClip,
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineLoading,
} from "react-icons/ai";
import { useImageUpload } from "../../hook/useImageUpload";
import CustomDropdown from "../dropdown/main";
import {
  FaImage,
  FaInstagram,
  FaStar,
  FaVideo,
  FaYoutube,
} from "react-icons/fa";
import FileUploader from "../fileUploder/main";

export type Testimonial = {
  id: number;
  authorName: string;
  content: string;
  rating: number;
  createdAt: Date;
  fileType: "image" | "video" | "youtube" | "instagram";
  mediaUrl: string;
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Testimonial) => void;
  initialData?: Testimonial;
  loading?: boolean;
}

const TestimonialModal: React.FC<ModalProps> = ({
  isOpen,
  loading,
  onClose,
  onSubmit,
  initialData,
}) => {
  console.log(initialData?.authorName)
  const { updateFile, uploadFile, deleteFile } = useImageUpload();
  const [form, setForm] = useState<Partial<Testimonial>>({
    authorName: initialData?.authorName || "",
    content: initialData?.content || "",
    mediaUrl: initialData?.mediaUrl || "",
    fileType: initialData?.fileType || "image",
    rating: initialData?.rating || 1, // Initialize rating field
  });
  const [fileType, setFileType] = useState<string>("image");
  const [imageUrl, setImageUrl] = useState("");
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const options = [
    {
      value: "image",
      label: "Image",
      icon: <FaImage />,
      color: "text-blue-500",
    },
    {
      value: "video",
      label: "Video",
      icon: <FaVideo />,
      color: "text-red-500",
    },
    {
      value: "instagram",
      label: "Instagram Link",
      icon: <FaInstagram />,
      color: "text-pink-500",
    },
    {
      value: "youtube",
      label: "YouTube Link",
      icon: <FaYoutube />,
      color: "text-red-500",
    },
  ];

  const ratingOptions = [
    { value: 1, label: "1 Star", icon: <FaStar className="text-yellow-400" /> },
    {
      value: 2,
      label: "2 Stars",
      icon: <FaStar className="text-yellow-400" />,
    },
    {
      value: 3,
      label: "3 Stars",
      icon: <FaStar className="text-yellow-400" />,
    },
    {
      value: 4,
      label: "4 Stars",
      icon: <FaStar className="text-yellow-400" />,
    },
    {
      value: 5,
      label: "5 Stars",
      icon: <FaStar className="text-yellow-400" />,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.authorName ||
      !form.content ||
      !form.rating ||
      form.rating <= 0 ||
      (fileType === "instagram" && !form.mediaUrl) ||
      (fileType === "youtube" && !form.mediaUrl)
    ) {
      setError(
        "Please fill all required fields, including rating and a valid link for Instagram or YouTube."
      );
      return;
    }

    onSubmit({
      ...form,
    } as Testimonial);

    setForm({
      authorName: "",
      content: "",
      fileType: "image",
      mediaUrl: "",
      rating: 0,
    });
    setFileType("image");
    setImageUrl("");
    setError(null);
  };

  useEffect(() => {
    if (initialData) {
      setForm({
        authorName: initialData.authorName,
        content: initialData.content,
        mediaUrl: initialData.mediaUrl,
        fileType: initialData.fileType,
        rating: initialData.rating || 0, // Load existing rating
      });
      setFileType(initialData.fileType);
      setImageUrl(initialData.mediaUrl);
    }
  }, [initialData]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        const res = await uploadFile.mutateAsync({
          file: formData,
          folderKey: "banner-img",
        });
        setForm({
          ...form,
          mediaUrl: res.url,
          fileType: isImage ? "image" : "video",
        });
        setImageUrl(res.url);
        setError(null);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = async () => {
    await deleteFile.mutateAsync({
      fileKey: imageUrl.split("/").pop() as any,
      folderKey: "banner-img",
    });
    setImageUrl("");
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
  return isOpen ? (
    <div className="fixed inset-0 text-black flex items-center justify-center z-50 bg-black bg-opacity-50 dark:bg-opacity-70">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          {initialData ? (
            <AiOutlineEdit className="mr-2 text-lg" />
          ) : (
            <AiOutlinePlus className="mr-2 text-lg" />
          )}
          {initialData ? "Edit Testimonial" : "Add Testimonial"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Author Name and Content Inputs */}
          <div className="flex flex-col gap-3">
            {/* Author Name Input */}
            <div className="flex-1">
              <label className="flex items-center mb-1 text-sm">
                <AiOutlinePaperClip className="mr-1 text-sm" />
                Author Name
              </label>
              <input
                type="text"
                value={form.authorName}
                onChange={(e) =>
                  setForm({ ...form, authorName: e.target.value })
                }
                required
                className="w-full border p-1 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>

            {/* Content Textarea */}
            <div className="flex-1">
              <label className="flex items-center mb-1 text-sm">
                <AiOutlinePaperClip className="mr-1 text-sm" />
                Testimonial Content
              </label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Enter your testimonial"
                required
                className="w-full border p-1 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Rating Field Using CustomDropdown */}
          <div className="flex-1">
            <label className="flex items-center mb-1 text-sm">
              <AiOutlinePaperClip className="mr-1 text-sm" />
              Rating (1-5)
            </label>
            <CustomDropdown
              options={ratingOptions}
              selectedValue={form?.rating as any}
              onSelect={(value) => {
                setForm({ ...form, rating: value as number });
              }}
            />
          </div>

          {/* File Type Selector */}
          <CustomDropdown
            options={options}
            selectedValue={fileType}
            onSelect={(value) => {
              setForm({ ...form, fileType: value as any });
              setFileType(value as any);
            }}
          />

          {/* Media URL or File Upload */}
          {fileType === "instagram" || fileType === "youtube" ? (
            <div className="flex-1">
              <label className="flex items-center mb-1 text-sm">
                <AiOutlinePaperClip className="mr-1 text-sm" />
                {fileType.charAt(0).toUpperCase() + fileType.slice(1)} Link
              </label>
              <input
                type="url"
                value={form.mediaUrl}
                onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })}
                placeholder={`Enter ${
                  fileType.charAt(0).toUpperCase() + fileType.slice(1)
                } Link`}
                required
                className="w-full border p-1 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
          ) : (
            // File upload section
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
                loading={
                  uploadFile.isPending ||
                  deleteFile.isPending ||
                  updateFile.isPending
                }
              />
            </div>
          )}

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 mr-2 hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading className="animate-spin" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default TestimonialModal;
