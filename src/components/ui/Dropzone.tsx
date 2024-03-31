import React, { useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { CrossCircledIcon } from "@radix-ui/react-icons";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default function Dropzone({
  maxFiles = 20,
  description,
  files,
  setFiles,
}: {
  maxFiles?: number;
  description?: string;
  files: any[];
  setFiles: (files: any[]) => void;
}) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      maxFiles: maxFiles || 0,
      onDrop: (acceptedFiles) => {
        const createPreview = (file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        const newFiles = acceptedFiles.map(createPreview);
        setFiles([...files, ...newFiles]);
      },
    });

  const handleRemove = (fileName: any) => {
    const newFiles = files.filter((f) => f.name !== fileName);
    setFiles(newFiles);
  };

  const thumbs = files.map((file) => (
    <div
      key={file.name}
      className="inline-flex border-2 border-slate-100 mb-2 mr-2 w-24 h-full p-1 box-border rounded-md relative"
    >
      <CrossCircledIcon
        className="transition ease-in-out w-6 h-6 text-black bg-white rounded-full shadow-sm antialiased absolute right-0 top-0 hover:scale-110 hover:cursor-pointer"
        onClick={() => handleRemove(file.name)}
      />
      <img
        className="rounded-md object-cover"
        src={file.preview}
        style={img}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="w-full mx-auto">
      <div
        {...getRootProps({
          className: cn(
            "flex flex-col text-center justify-center h-64 w-full rounded-md border-dashed border-2 border-slate-200 text-slate-400  transition-colors cursor-pointer p-5 outline-none transition ease-in-out duration-150 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-500",
            isFocused ? "border-slate-300" : "",
            isDragAccept ? "border-green-500" : "",
            isDragReject ? "border-red-500" : ""
          ),
        })}
      >
        <input {...getInputProps()} />
        <p className="">
          {maxFiles === 1
            ? description
              ? description
              : "Drop an image here"
            : description
            ? description
            : "Drop images here"}
        </p>
        <p>
          Maximum number of files allowed:{" "}
          <span className="font-medium">{maxFiles}</span>
        </p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}
