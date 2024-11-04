import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { BsLink, } from "react-icons/bs";
import { getCroppedImg } from "../../utils/cropImage";
import { useImageUpload } from "../../hook/useImageUpload";

interface FileUploaderProps {
  allowImageUpload: boolean;
  allowVideoUpload: boolean;
  text?:string
  setPhoneIMage:(value:string) =>  void;
}

const FileUploaderWithCropper: React.FC<FileUploaderProps> = ({
  allowImageUpload,
  allowVideoUpload,
  setPhoneIMage,
  text
}) => {
   const {  uploadFile, } = useImageUpload();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [_, setFileType] = useState<string | null>(null);
  const [file,setFile] =  useState<File>()
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [dimensions, setDimensions] = useState({ width: 100, height: 200 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [__, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleImageChange = async (
  ) => {
    if (file) {
      const fileType = file.type;
      const isImage = fileType.startsWith("image/");
      const isVideo = fileType.startsWith("video/");

      // File validation for type and size
      if (!isImage && !isVideo) {
        setError("Only image or video files are allowed");
        return;
      }

      const maxSize = isImage ? 5 * 1024 * 1024 : 50 * 1024 * 1024; // 1 MB for image, 50 MB for video
      if (file.size > maxSize) {
        setError(`File size should be less than ${isImage ? "1 MB" : "50 MB"}`);
        return;
      }

      // Upload file
      
      setFileUrl(URL.createObjectURL(file));
      if (fileUrl && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(
          fileUrl,
          croppedAreaPixels,
          dimensions.width
        );
        const formData = new FormData();
      formData.append("file", croppedImage.file);
      const res = await uploadFile.mutateAsync({
        file: formData,
        folderKey: "banner-img",
      });
       setFileUrl(res.url);
       setPhoneIMage(res.url)
        setCroppedImageUrl(res.url);
      }
      setError(null);
      // onSubmit({ url: res.url});
    }
  };

  // const handleRemoveImage = async () => {
  //   await deleteFile.mutateAsync({
  //     fileKey: (fileUrl as any).split("/").pop() as any,
  //     folderKey: "banner-img",
  //   });
  //   setFileUrl("");
  // };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange({ target: { files: [file] } } as any);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const type = file.type.split("/")[0];

    if (
      (type === "image" && allowImageUpload) ||
      (type === "video" && allowVideoUpload)
    ) {
        setFile(file)
        setPhoneIMage(url)
      setFileUrl(url);
      setFileType(type);
    } else {
      alert("Unsupported file type");
    }
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea)
    
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // const showCroppedImage = async () => {
    
  //   if (fileUrl && croppedAreaPixels) {
  //     const croppedImage = await getCroppedImg(
  //       fileUrl,
  //       croppedAreaPixels,
  //       dimensions.width
  //     );
  //     console.log(croppedImage.url)
  //     setCroppedImageUrl(croppedImage.url);
  //     setFile(croppedImage.file as any)
  //   }
  // };

  const resetCrop = () => {
    setCroppedImageUrl(null);
    setFileUrl(null);
  };

  return (
    <div className={`border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center gap-6 text-center w-full max-w-lg mx-auto    dragging ? 'border-teal-500' : 'border-gray-300'
      }`}>
   {!fileUrl?   <div className="flex flex-col items-center gap-2"  onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}>
        <p className="text-gray-700">Drag & Drop file here</p>
        <p className="text-gray-700 text-lg">or</p>
      </div>:null}
      {fileUrl ? (
        croppedImageUrl ? (
          <div className="flex flex-col items-center gap-4">
            <img
              src={croppedImageUrl}
              alt="Cropped Preview"
              className="w-full  max-w-[100%] h-[40vh] rounded-lg shadow-md"
            />
            {/* <button
              onClick={resetCrop}
              className="text-teal-600 hover:text-teal-700 flex items-center gap-2"
            >
              <BsCrop /> Re-crop Image
            </button> */}
          </div>
        ) : (
          <div className="relative h-64 w-full max-w-md rounded-lg overflow-hidden shadow-md">
            <Cropper
              image={fileUrl}
              crop={crop}
              zoom={zoom}
              aspect={dimensions.width / dimensions.height}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <div className="absolute bottom-1 left-1/2 text-sm transform -translate-x-1/2 flex gap-2">
            <button
      onClick={handleImageChange}
      className={`bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700 flex-1 ${uploadFile.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={uploadFile.isPending}
    >
      {uploadFile.isPending ? (
        <span className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z" />
          </svg>
          Loading...
        </span>
      ) : (
        'Save'
      )}
    </button>
              <button
                onClick={resetCrop}
                className="bg-gray-600 text-white px-3 py-1 rounded shadow hover:bg-gray-700 flex-1"
              >
                Reset
              </button>
            </div>
          </div>
        )
      ) : (
        <label className="bg-teal-600 text-white py-2 px-7 rounded cursor-pointer inline-block">
          <span className="flex items-center gap-2">
            <BsLink className="h-5 w-5" />{text?text:"Choose file"} Choose file
          </span>{" "}
          <input
            type="file"
            className="hidden"
            accept={`${allowImageUpload ? ".png, .jpeg, .jpg" : ""}${
              allowImageUpload && allowVideoUpload ? ", " : ""
            }${allowVideoUpload ? ".mp4, .avi, .mkv, .mov" : ""}`}
            onChange={handleFileChange}
          />
        </label>
      )}

      {fileUrl && !croppedImageUrl && (
        <div className="w-full flex flex-col items-center mt-4 gap-3">
          <div className="w-full max-w-md px-3 flex flex-col gap-2">
            <label className="block text-gray-700">Width (px)</label>
            <input
              type="range"
              value={dimensions.width}
              onChange={(e) =>
                setDimensions({ ...dimensions, width: Number(e.target.value) })
              }
              className="border border-gray-300 rounded px-2 py-1"
              min={100}
              max={1000}
            />
          </div>
          {/* <div className="w-full max-w-md px-3 flex flex-col gap-2">
            <label className="block text-gray-700">Height (px)</label>
            <input
              type="range"
              value={dimensions.height}
              onChange={(e) => setDimensions({ ...dimensions, height: Number(e.target.value) })}
              className="border border-gray-300 rounded px-2 py-1"
             
            />
          </div> */}
        </div>
      )}
      <p>{error?error:null}</p>
     {!fileUrl? <p className="text-gray-900 mt-4">
        {`Supported formats: ${allowImageUpload ? "PNG, JPEG, JPG" : ""}${
          allowImageUpload && allowVideoUpload ? ", " : ""
        }${allowVideoUpload ? "MP4, AVI, MKV, MOV" : ""} up to 5 MB`}
      </p>:null}
    </div>
  );
};

export default FileUploaderWithCropper;
