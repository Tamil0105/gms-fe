import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineLoading } from "react-icons/ai";
import { useImageUpload } from "../../hook/useImageUpload";
import FileUploaderWithCropper from "../fileUploder/imageUploderWithCrop";

interface ModalProps {
  isOpen: boolean;
  upload: boolean;
  onClose: () => void;
  onSubmit: (data: { url: string ,phoneUrl:string}) => void;
  loading?: boolean;
  allowImage: boolean;
  allowVideo: boolean;
}

const CarouselImageUploder: React.FC<ModalProps> = ({
  isOpen,
  loading,
  // upload,
  onClose,
  onSubmit,
}) => {
  const { updateFile, uploadFile, deleteFile } = useImageUpload();
  const [imageUrl, setImageUrl] = useState("");
  const [phoneImageUrl,setPhoneIMage] = useState("")
  // const [__, setDragging] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const handleImageChange = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const fileType = file.type;
  //     const isImage = fileType.startsWith("image/");
  //     const isVideo = fileType.startsWith("video/");

  //     // File validation for type and size
  //     if (!isImage && !isVideo) {
  //       setError("Only image or video files are allowed");
  //       return;
  //     }

  //     const maxSize = isImage ? 5 * 1024 * 1024 : 50 * 1024 * 1024; // 1 MB for image, 50 MB for video
  //     if (file.size > maxSize) {
  //       setError(`File size should be less than ${isImage ? "1 MB" : "50 MB"}`);
  //       return;
  //     }

  //     // Upload file
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     setImageUrl(URL.createObjectURL(file));
  //     const res = await uploadFile.mutateAsync({
  //       file: formData,
  //       folderKey: "banner-img",
  //     });
  //     setImageUrl(res.url);
  //     setError(null);
  //     // onSubmit({ url: res.url});
  //   }
  // };

  // const handleRemoveImage = async () => {
  //   await deleteFile.mutateAsync({
  //     fileKey: imageUrl.split("/").pop() as any,
  //     folderKey: "banner-img",
  //   });
  //   setImageUrl("");
  // };

  // const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   setDragging(false);
  //   const file = e.dataTransfer.files[0];
  //   if (file) {
  //     handleImageChange({ target: { files: [file] } } as any);
  //   }
  // };

  // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   setDragging(true);
  // };

  // const handleDragLeave = () => {
  //   setDragging(false);
  // };
  // console.log(upload);

  return isOpen ? (
    <div className="fixed inset-0 text-black flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl max-h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <AiOutlinePlus className="mr-2 text-lg" />
          Upload Media
        </h2>
        <div className="flex flex-col md:flex-row  gap-2">
          <FileUploaderWithCropper
          setImageUrl={setImageUrl}
          setPhoneIMage={setPhoneIMage}
            allowImageUpload={true}
            allowVideoUpload={false}
          />
          {/* <FileUploader
            text="Choose file for Desktop view"
            allowVideoUpload={allowVideo}
            allowImageUpload={allowImage}
            handleRemoveFile={handleRemoveImage}
            handleUpdateFile={handleImageChange}
            handleFileChange={handleImageChange}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            dragging={dragging}
            fileUrl={imageUrl}
            uploaded={imageUrl ? true : false}
            loading={
              uploadFile.isPending ||
              deleteFile.isPending ||
              updateFile.isPending
            }
            fileType={"image"}
          /> */}
        </div>
        {/* {error && <p className="text-red-500 text-xs">{error}</p>} */}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() => {
              onClose();
              setImageUrl("");
            }}
            disabled={
              loading ||
              uploadFile.isPending ||
              deleteFile.isPending ||
              updateFile.isPending
            }
            className={`bg-gray-200 px-3 py-1 rounded mr-2 hover:bg-gray-300  ${  loading ||
              uploadFile.isPending ||
              deleteFile.isPending ||
              updateFile.isPending?"opacity-50 cursor-not-allowed":""}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => {
              onSubmit({ url: imageUrl,phoneUrl:phoneImageUrl });
              setImageUrl("");
            }}
            className={`bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 ${
              uploadFile.isPending ||
              deleteFile.isPending ||
              updateFile.isPending ||!imageUrl||!phoneImageUrl? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={
              loading ||
              uploadFile.isPending ||
              deleteFile.isPending ||
              updateFile.isPending||!imageUrl||!phoneImageUrl
            }
          >
            {loading ? <AiOutlineLoading className="animate-spin" /> : "Submit"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CarouselImageUploder;
