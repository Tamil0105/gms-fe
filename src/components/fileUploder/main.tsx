import React from 'react';
import { BsLink, BsX } from 'react-icons/bs';

interface FileUploaderProps {
  fileUrl: string | null;
  fileType: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: () => void;
  handleRemoveFile: () => void;
  dragging: boolean;
  loading: boolean;
  uploaded: boolean;
  handleUpdateFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allowImageUpload: boolean;
  allowVideoUpload: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  fileUrl,
  fileType,
  handleFileChange,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  handleRemoveFile,
  dragging,
  loading,
  uploaded,
  handleUpdateFile,
  allowImageUpload,
  allowVideoUpload,
}) => {
  return (
    <div
      className={`border-2 border-dashed ${
        dragging ? 'border-teal-500' : 'border-gray-300'
      } p-8 rounded-lg flex flex-col gap-4 text-center w-full md:w-[80%] lg:w-[100%]`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {/* Conditionally render upload instructions or preview file */}
      {!uploaded ? (
        <div className="flex flex-col items-center gap-2">
          {fileUrl && fileType?.startsWith('image/') ? (
            <img
              src={fileUrl}
              alt="Preview"
              className={`h-40 w-40 object-cover rounded ${loading ? 'animate-pulse' : ''}`}
            />
          ) : fileUrl && fileType?.startsWith('video/') ? (
            <video
              controls
              src={fileUrl}
              className={`h-40 w-40 object-cover rounded ${loading ? 'animate-pulse' : ''}`}
            />
          ) : null}
          <div className="flex flex-col items-center gap-2">
            <p className="text-gray-700">Drag & Drop file here</p>
            <p className="text-gray-700 text-lg">or</p>
          </div>
        </div>
      ) : fileUrl ? (
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-[100%] h-[110px] bg-gray-600/10 rounded-lg border border-gray-300">
            {fileType === 'image' ? (
              <img
                src={fileUrl}
                alt="Preview"
                className={`absolute inset-0 w-full h-full object-contain rounded ${loading ? 'animate-pulse' : ''}`}
              />
            ) : fileType === 'video' ? (
              <video
                controls
                src={fileUrl}
                className={`absolute inset-0 w-full h-full object-contain rounded ${loading ? 'animate-pulse' : ''}`}
              />
            ) : null}
          </div>
          <div className="flex justify-center gap-2 mt-2">
            <button
              type="button"
              disabled={loading}
              onClick={handleRemoveFile}
              className="bg-red-600 text-white py-1 px-3 rounded flex items-center gap-1 disabled:bg-red-600/60"
            >
              <BsX className="h-5 w-5" /> Remove File
            </button>
            {!loading ? (
              <label className="bg-teal-600 text-white py-2 px-7 rounded cursor-pointer inline-block">
                <span className="flex items-center gap-2">
                  <BsLink className="h-5 w-5" /> Update File
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept={`${allowImageUpload ? '.png, .jpeg, .jpg' : ''}${
                    allowImageUpload && allowVideoUpload ? ', ' : ''
                  }${allowVideoUpload ? '.mp4, .avi, .mkv, .mov' : ''}`}
                  onChange={handleUpdateFile}
                />
              </label>
            ) : (
              <label className="bg-teal-600/60 text-white py-2 px-7 rounded cursor-not-allowed inline-block">
                <span className="flex items-center gap-2">
                  <BsLink className="h-5 w-5" /> Update File
                </span>
              </label>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-700">Drag & Drop file here</p>
          <p className="text-gray-700">or</p>
        </div>
      )}

      {uploaded ? null : (
        <div>
          {!loading ? (
            <label className="bg-teal-600 text-white py-2 px-7 rounded cursor-pointer inline-block">
              <span className="flex items-center gap-2">
                <BsLink className="h-5 w-5" /> Choose file
              </span>
              <input
                type="file"
                className="hidden"
                accept={`${allowImageUpload ? '.png, .jpeg, .jpg' : ''}${
                  allowImageUpload && allowVideoUpload ? ', ' : ''
                }${allowVideoUpload ? '.mp4, .avi, .mkv, .mov' : ''}`}
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <label className="bg-teal-600/60 text-white py-2 px-7 rounded cursor-not-allowed inline-block">
              <span className="flex items-center gap-2">
                <BsLink className="h-5 w-5" /> Choose file
              </span>
            </label>
          )}
        </div>
      )}

      <p className="text-gray-900 mt-4">
        {`Supported formats: ${
          allowImageUpload ? 'PNG, JPEG, JPG' : ''
        }${allowImageUpload && allowVideoUpload ? ', ' : ''}${
          allowVideoUpload ? 'MP4, AVI, MKV, MOV' : ''
        } up to 5 MB`}
      </p>
    </div>
  );
};

export default FileUploader;
