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

// Cloudflare Images responses
//
// example success response
// response {
//      result: {
//        id: '1f9246fa-3761-4398-d99f-837b9ebd3700',
//        filename: 'The White House.jpg',
//        uploaded: '2022-03-09T10:16:25.130Z',
//        requireSignedURLs: false,
//        variants: [
//          ...
//        ]
//      },
//      result_info: null,
//      success: true,
//      errors: [],
//      messages: []
//    }

// example failure response
//  response: {
//        success: false,
//        errors: [ { code: 10000, message: 'Authentication error' } ]
//      }
