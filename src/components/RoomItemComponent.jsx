import { Button, Carousel, Modal, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { RatingBar } from "./RatingBar";
import _ from "lodash";
import {
  BsFillXOctagonFill,
  BsFillCheckCircleFill,
  BsPencilFill,
} from "react-icons/bs";
import axios from "axios";
import util from "../util/util.json";

const plusIconStyle = { fontSize: "1em" };

export const RoomItemComponent = (props) => {
  const baseUrl = util.baseUrl;
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [result, setResult] = useState({});
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [imagePreviews, setImagePreviews] = useState([]);

  const onCloseDialog = () => {
    setShowUploadDialog(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    console.log(selectedFiles);
    let uploadData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      uploadData.append("Images", selectedFiles[i]);
    }
    uploadData.append("roomId", props.room.id);

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    console.log(uploadData);

    axios
      .post(baseUrl + "/api/medias/createMultiple", uploadData, headers)
      .then((response) => {
        console.log(response);
        setResult(response.data);
        setIsUploading(false);
        setShowUploadDialog(false);
        setShowResultDialog(true);
        setSelectedFiles(null);
        setImagePreviews([]);
      })
      .catch((error) => {
        console.log(error);
        setIsUploading(false);
        setShowUploadDialog(false);
        setShowResultDialog(true);
      });
  };
  const onResultClose = () => {
    setShowResultDialog(false);
  };

  const handeUploadChange = (e) => {
    let imgs = [];
    for (let i = 0; i < e.target.files.length; i++) {
      imgs.push(e.target.files[i]);
    }

    setSelectedFiles(e.target.files);
    setImagePreviews(imgs);
    console.log(imgs);
  };

  return (
    <div>
      <Modal show={showResultDialog} size="md" onClose={onResultClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {result.success ? (
              <div>
                <BsFillCheckCircleFill className="mx-auto mb-4 h-14 w-14 text-gray-600" />
                <h3 className="mb-5 text-lg font-normal text-gray-600">
                  Success!
                </h3>
              </div>
            ) : (
              <div>
                <BsFillXOctagonFill className="mx-auto mb-4 h-14 w-14 text-gray-600" />
                <h3 className="mb-5 text-lg font-normal text-gray-600">
                  {typeof result.error == "undefined"
                    ? " Unknwon error! "
                    : result.error.msg}
                </h3>
              </div>
            )}
            <div className="flex justify-center gap-4">
              <Button color="gray" pill size="xs" onClick={onResultClose}>
                Close
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showUploadDialog} size="md" onClose={onCloseDialog}>
        <Modal.Body>
          <div>
            <div className="flex flex-row justify-center">
              <input
                type="file"
                multiple
                accept="image/*"
                size="xs"
                pill
                className="border rounded-lg"
                onChange={handeUploadChange}
              />
            </div>
            <div className="flex flex-col">
              {imagePreviews &&
                imagePreviews.map((img, i) => {
                  return (
                    <p className="my-3" key={i}>
                      {img.name}
                    </p>
                  );
                })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {isUploading ? (
            <div className="flex flex-row justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-row gap-3">
              <Button size="xs" onClick={handleSubmit}>
                Post
              </Button>
              <Button size="xs" color="gray" onClick={onCloseDialog}>
                Cancel
              </Button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
      <div className="rounded-lg shadow hover:shadow-lg overflow-hidden m-2">
        {props.room.medias.length == 0 ? (
          <div className="relative inline-block">
            <div
              data-placeholder
              className="h-[200px] w-[300px] rounded-md bg-gray-200"
            />
            <div className="w-4 h-4 rounded-full absolute top-2 5 right-2 5">
              <button onClick={(e) => setShowUploadDialog(true)}>
                <BsPencilFill style={plusIconStyle} />
              </button>
            </div>
          </div>
        ) : (
          <Carousel className=" h-[200px] w-[300px]">
            {props.room.medias &&
              props.room.medias.map((image) => {
                return (
                  <img
                    src={image.file_url}
                    alt="Room Image"
                    height="300"
                    width="200"
                    className="rounded-md"
                  />
                );
              })}
          </Carousel>
        )}
        <div className="px-4 py-4 text-left">
          <div className="font-bold text-xl mb-2">{props.room.address}</div>
          <RatingBar value={_.random(1, 5)} />
          <p className="text-gray-700 text-base">{props.room.price} ETB</p>
        </div>
      </div>
    </div>
  );
};
