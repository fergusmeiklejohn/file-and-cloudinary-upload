import {
  Form,
  unstable_parseMultipartFormData,
  useActionData,
  json,
  LinksFunction,
} from "remix";
import type { ActionFunction, UploadHandler } from "remix";

import UppyCore from "@uppy/core/dist/style.min.css";
import UppyDashboard from "@uppy/dashboard/dist/style.min.css";
import UppyImageEditor from "@uppy/image-editor/dist/style.min.css";
import { uploadImage } from "~/utils/utils.server";
import UploadAvatar from "~/components/uploadAvatar";

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: UppyCore },
    { rel: "stylesheet", href: UppyDashboard },
    { rel: "stylesheet", href: UppyImageEditor },
  ];
};

type ActionData = {
  errorMsg?: string;
  imgSrc?: string;
  imgDesc?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const uploadHandler: UploadHandler = async ({ name, stream }) => {
    if (name !== "img") {
      stream.resume();
      return;
    }
    const uploadedImage: any = await uploadImage(stream);
    return uploadedImage.secure_url;
  };

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  const imgSrc = formData.get("img");
  const imgDesc = formData.get("desc");
  if (!imgSrc) {
    return json({
      error: "something wrong",
    });
  }
  return json({
    imgSrc,
    imgDesc,
  });
};

export default function Index() {
  const data = useActionData<ActionData>();
  console.log("action data", data);
  return (
    <>
      {/* This form returns data in useActionData() to the client */}
      <Form method="post" encType="multipart/form-data">
        <label htmlFor="img-field">Image to upload</label>
        <input id="img-field" type="file" name="img" accept="image/*" />
        <label htmlFor="img-desc">Image description</label>
        <input id="img-desc" type="text" name="desc" />
        <button type="submit">upload to cloudinary</button>
      </Form>
      <div>___________________</div>
      {/* This form doesn't return data in useActionData() to the client */}
      <UploadAvatar apiEndpoint="cloudinary-upload" />
      {data?.errorMsg && <h2>{data.errorMsg}</h2>}
      {data?.imgSrc && (
        <>
          <h2>uploaded image</h2>
          <img src={data.imgSrc} alt={data.imgDesc || "Upload result"} />
        </>
      )}
    </>
  );
}
