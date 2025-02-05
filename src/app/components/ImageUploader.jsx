"use client";

import { UploadButton } from "@uploadthing/react";

export default function ImageUploader({ handleUpdate }) {
  return (
    <main className="flex justify-between items-center">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          console.log("url", res[0].url);

          handleUpdate({ data: res[0].url, updateType: "images" });
          alert("Upload Completed");
          window.location.reload();
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
