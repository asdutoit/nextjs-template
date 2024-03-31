export const uploadFiles = async (files: (string | Blob)[]) => {
  // Upload the files to the server and store the urls in the form
  const formData = new FormData();
  files.forEach((image: string | Blob) => {
    formData.append("files", image);
    // formData.append("upload_preset", "realtor_files");
  });
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imtvb3Nrb21idWlzQGdtYWlsLmNvbSIsImV4cCI6MTcxMTk2ODYzMywidXNlcklkIjoxfQ.kKX1dBVHLBvHD4dbLY0JHSTc6o51VVbWGhnc1WqfRog`,
        },
      }
    );
    const data = await response.json();
    console.log("Data", data);
    // return data.url;
    return;
  } catch (error) {
    console.log(error);
  }
};
