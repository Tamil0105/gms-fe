import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { BsLink } from "react-icons/bs";
import { getCroppedImg } from "../../utils/cropImage";
import { useImageUpload } from "../../hook/useImageUpload";
import Tabs from "../Tap/main";
import { PiDeviceMobile } from "react-icons/pi";
import { BiDesktop } from "react-icons/bi";
import { compressImage } from "../../utils/imageCompressor";

interface FileUploaderProps {
  allowImageUpload: boolean;
  allowVideoUpload: boolean;
  text?: string;
  setPhoneIMage: (value: string) => void;
  setImageUrl: (value: string) => void;
}

const FileUploaderWithCropper: React.FC<FileUploaderProps> = ({
  allowImageUpload,
  allowVideoUpload,
  setPhoneIMage,
  setImageUrl,
  text,
}) => {
  const { uploadFile } = useImageUpload();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileUrlDeskTop, setFileUrlDeskTop] = useState<string | null>(null);

  const [_, setFileType] = useState<string | null>(null);
  const [file1, setFile1] = useState<File>();
  const [file2, setFile2] = useState<File>();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [dimensions, setDimensions] = useState({ width: 100, height: 200 });
  const [dimensions1, setDimensions1] = useState({ width: 350, height: 200 });

  const [croppedAreaPixels1, setCroppedAreaPixels1] = useState<any>(null);
  const [croppedAreaPixels2, setCroppedAreaPixels2] = useState<any>(null);

  const [croppedImageUrl1, setCroppedImageUrl1] = useState<string | null>(null);
  const [croppedImageUrl2, setCroppedImageUrl2] = useState<string | null>(null);

  const [__, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleImageChange = async () => {
    if (file1 && file2) {
      const fileType = file1.type;
      const isImage = fileType.startsWith("image/");
      const isVideo = fileType.startsWith("video/");

      // File validation for type and size
      if (!isImage && !isVideo) {
        setError("Only image or video files are allowed");
        return;
      }
      const maxSize = isImage ? 5 * 1024 * 1024 : 50 * 1024 * 1024; // 1 MB for image, 50 MB for video
      if (file1.size > maxSize) {
        setError(`File size should be less than ${isImage ? "1 MB" : "50 MB"}`);
        return;
      }

      // Upload file
      // setFileUrl(URL.createObjectURL(file1));
      // setFileUrlDeskTop(URL.createObjectURL(file2));
      console.log(
        fileUrl,
        croppedAreaPixels1,
        croppedAreaPixels2,
        fileUrlDeskTop
      );

      if (
        fileUrl &&
        croppedAreaPixels1 &&
        croppedAreaPixels2 &&
        fileUrlDeskTop
      ) {
        const croppedImage1 = await getCroppedImg(
          fileUrl,
          croppedAreaPixels1,
          dimensions.width
        );
        const croppedImage2 = await getCroppedImg(
          fileUrlDeskTop,
          croppedAreaPixels2,
          dimensions1.width
        );

        console.log(
          ` f2size: ${(croppedImage1.file.size / 1024).toFixed(2)} KB`
        );
        console.log(
          ` f1size: ${(croppedImage2.file.size / 1024).toFixed(2)} KB`
        );
        const formData1 = new FormData();
        const formData2 = new FormData();

        formData1.append(
          "file",
          await compressImage(croppedImage1.file as any)
        );
        formData2.append(
          "file",
          await compressImage(croppedImage2.file as any)
        );

        await uploadFile
          .mutateAsync({
            file: formData1,
            folderKey: "banner-img",
          })
          .then((res) => {
            setFileUrl(res.url);
            setPhoneIMage(res.url);
            setCroppedImageUrl1(res.url);
          });
        await uploadFile
          .mutateAsync({
            file: formData2,
            folderKey: "banner-img",
          })
          .then((res) => {
            setFileUrlDeskTop(res.url);
            setImageUrl(res.url);
            setCroppedImageUrl2(res.url);
          });
      } else {
        setError("crop both device!");
      }
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
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // const compressedBlob =   await compressImage(file)

    const url = URL.createObjectURL(file);
    const type = file.type.split("/")[0];

    console.log(` size: ${(file.size / 1024).toFixed(2)} KB`);
    if (
      (type === "image" && allowImageUpload) ||
      (type === "video" && allowVideoUpload)
    ) {
      setFile1(file as any);
      setFile2(file as any);
      activeTab == 0 ? setPhoneIMage(url) : setImageUrl(url);
      setFileUrl(url);
      setFileUrlDeskTop(url);
      setFileType(type);
    } else {
      alert("Unsupported file type");
    }
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea);

    activeTab == 0
      ? setCroppedAreaPixels1(croppedAreaPixels)
      : setCroppedAreaPixels2(croppedAreaPixels);
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

  // const resetCrop = () => {
  //   activeTab == 0 ? setCroppedImageUrl1(null) : setCroppedImageUrl2(null);
  //   setFileUrl(null);
  // };

  const tabs = [
    {
      title: "Phone",
      key: "phone",
      icon: <PiDeviceMobile className="h-5 w-5" />,
    },
    {
      title: "Desktop",
      key: " desktop",
      icon: <BiDesktop className="h-5 w-5" />,
    },
  ];
  return (
    <div
      className={`border-2 border-dashed border-gray-300 p-3 rounded-lg flex flex-col items-center gap-6 text-center w-full max-w-lg mx-auto    dragging ? 'border-teal-500' : 'border-gray-300'
      }`}
    >
      {fileUrl ? (
        <Tabs
          showIconsOnly={true}
          active={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />
      ) : null}
      {!fileUrl ? (
        <div
          className="flex flex-col items-center gap-2"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <p className="text-gray-700">Drag & Drop file here</p>
          <p className="text-gray-700 text-lg">or</p>
        </div>
      ) : null}
      {fileUrl ? (
        croppedImageUrl1 && croppedImageUrl2 ? (
          <div className="flex  items-center gap-4">
            {activeTab == 0 ? (
              <img
                src={croppedImageUrl1}
                alt="Cropped Preview"
                className="w-full  max-w-[100%] h-[40vh] rounded-lg shadow-md"
              />
            ) : (
              <img
                src={croppedImageUrl2}
                alt="Cropped Preview"
                className="w-full  max-w-[100%] h-[40vh] rounded-lg shadow-md"
              />
            )}

            {/* <button
              onClick={resetCrop}
              className="text-teal-600 hover:text-teal-700 flex items-center gap-2"
            >
              <BsCrop /> Re-crop Image
            </button> */}
          </div>
        ) : (
          <div className="relative h-64 w-full max-w-md rounded-lg overflow-hidden shadow-md">
            {activeTab === 0 ? (
              <Cropper
                image={fileUrl}
                crop={crop}
                zoom={zoom}
                aspect={dimensions.width / dimensions.height}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            ) : (
              <Cropper
                image={fileUrl}
                crop={crop}
                zoom={zoom}
                aspect={dimensions1.width / dimensions1.height}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>
        )
      ) : (
        <label className="bg-teal-600 text-white py-2 px-7 rounded cursor-pointer inline-block">
          <span className="flex items-center gap-2">
            <BsLink className="h-5 w-5" />
            {text ? text : "Choose file"}
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

      {fileUrl && (!croppedImageUrl1 || !croppedImageUrl2) && (
        <div className="w-full flex flex-col items-center mt-4 gap-3">
          <div className="w-full flex  max-w-full  justify-between   gap-3">
            <div className=" w-full">
              <label className="block text-gray-700">Width (px)</label>
              <input
                type="range"
                value={activeTab == 0 ? dimensions.width : dimensions1.width}
                onChange={(e) =>
                  activeTab == 0
                    ? setDimensions({
                        ...dimensions,
                        width: Number(e.target.value),
                      })
                    : setDimensions1({
                        ...dimensions,
                        width: Number(e.target.value),
                      })
                }
                className="border w-full border-gray-300 rounded px-2 py-1"
                min={100}
                max={1000}
              />
            </div>
            <div className="  text-sm   justify-center items-center flex gap-2">
              <button
                onClick={handleImageChange}
                className={`bg-blue-500 text-white  h-8 ${
                  uploadFile.isPending ? "w-24" : "w-14"
                } items-center flex justify-center  rounded shadow hover:bg-blue-600 ${
                  uploadFile.isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={uploadFile.isPending}
              >
                {uploadFile.isPending ? (
                  <span className="flex text-sm items-center">
                    <svg
                      className="animate-spin h-2 w-2 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                      />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Save"
                )}
              </button>
              {/* <button
                onClick={resetCrop}
                className="bg-gray-600 text-white px-3 py-1 rounded shadow hover:bg-gray-700 flex-1"
              >
                Reset
              </button> */}
            </div>
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
      {!croppedImageUrl1 && !croppedImageUrl2 ? (
        <p className="text-red-600">{error ? error : null}</p>
      ) : null}
      {!fileUrl ? (
        <p className="text-gray-900 mt-4">
          {`Supported formats: ${allowImageUpload ? "PNG, JPEG, JPG" : ""}${
            allowImageUpload && allowVideoUpload ? ", " : ""
          }${allowVideoUpload ? "MP4, AVI, MKV, MOV" : ""} up to 5 MB`}
        </p>
      ) : null}
    </div>
  );
};

export default FileUploaderWithCropper;
