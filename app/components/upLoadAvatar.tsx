import Uppy from "@uppy/core";
import ImageEditor from "@uppy/image-editor";
import { useUppy, DashboardModal } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";
import { useState } from "react";

interface Props {
  apiEndpoint: string;
}

export default function UploadAvatar(props: Props) {
  const { apiEndpoint } = props;
  const [modalOpen, setModalOpen] = useState(false);

  const uppy = useUppy(() => {
    return new Uppy({
      allowMultipleUploads: false,
      restrictions: {
        maxFileSize: 10000000,
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"],
      },
    })
      .use(XHRUpload, {
        endpoint: `/${apiEndpoint}`,
        fieldName: "img",
      })
      .use(ImageEditor, {
        id: "ImageEditor",
        quality: 0.9,
        cropperOptions: {
          viewMode: 1,
          background: false,
          autoCropArea: 1,
          responsive: true,
          croppedCanvasOptions: {
            minWidth: 200,
            minHeight: 200,
            maxWidth: 2000,
            maxHeight: 2000,
            fillColor: "#fff",
            imageSmoothingEnabled: true,
            imageSmoothingQuality: "high",
          },
        },
        actions: {
          revert: true,
          rotate: true,
          granularRotate: true,
          flip: true,
          zoomIn: true,
          zoomOut: true,
          cropSquare: true,
          cropWidescreen: false,
          cropWidescreenVertical: false,
        },
      });
  });
  uppy.on("upload-success", (file, response) => {
    const httpStatus = response.status; // HTTP status code
    const httpBody = response.body; // extracted response data
    console.log("response from uppy", response);
    // do something with file and response
  });

  return (
    <>
      <button onClick={() => setModalOpen(true)}>Upload with Uppy</button>
      <DashboardModal
        uppy={uppy}
        note="Upload an image, max size 10MB"
        plugins={["ImageEditor"]}
        metaFields={[{ id: "avatar", name: "avatar", placeholder: "avatar" }]}
        closeModalOnClickOutside={false}
        closeAfterFinish={true}
        showProgressDetails={false}
        autoOpenFileEditor={true}
        theme="auto"
        open={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      />
    </>
  );
}
