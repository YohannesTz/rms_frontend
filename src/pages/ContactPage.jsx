import {
  Label,
  TextInput,
  Button,
  Textarea,
  Spinner,
  Modal,
} from "flowbite-react";
import React, { useState } from "react";
import util from "../util/util.json";
import { BsFillCheckCircleFill, BsFillXOctagonFill } from "react-icons/bs";
import axios from "axios";

const ContactPage = () => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const baseUrl = util.baseUrl;

  const initialValues = {
    name: "",
    email: "",
    phonenumber: "",
    telegram_username: "",
    note: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [result, setResult] = useState({});
  const [showResultDialog, setShowResultDialog] = useState(false);

  const handleInputChange = (e) => {
    const { value } = e.target;

    setFormValues({
      ...formValues,
      [e.target.id]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsDataLoading(true);

    axios
      .post(baseUrl + "/api/contact", formValues)
      .then((response) => {
        console.log(response);
        setResult(response.data);
        setIsDataLoading(false);
        setShowResultDialog(true);
        setFormValues(initialValues);
      })
      .catch((err) => {
        console.log(err);
        setIsDataLoading(false);
      });
  };

  const closeResultDialog = (e) => {
    setShowResultDialog(false);
  };

  return (
    <div>
      <Modal
        show={showResultDialog}
        size="md"
        popup={true}
        onClose={closeResultDialog}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {result.success ? (
              <div>
                <BsFillCheckCircleFill className="mx-auto mb-4 h-14 w-14 text-gray-600 " />
                <h3 className="mb-5 text-lg font-normal text-gray-600 ">
                  Success!
                </h3>
              </div>
            ) : (
              <div>
                <BsFillXOctagonFill className="mx-auto mb-4 h-14 w-14 text-gray-600 " />
                <h3 className="mb-5 text-lg font-normal text-gray-600 ">
                  {typeof result.error == "undefined"
                    ? " Unknwon error! "
                    : result.error.message}
                </h3>
              </div>
            )}
            <div className="flex justify-center gap-4">
              <Button color="gray" pill size="xs" onClick={closeResultDialog}>
                Close
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="flex flex-row flex-wrap my-6 justify-center">
        <div className="text-gray-800 text-left whitespace-break-normal justify-center ">
          <p className="text-3xl">Contact us</p>
        </div>
      </div>
      <div className="flex flex-row justify-center px-5 lg:px-56 md:px-30 sm:px-14 ">
        <div className="w-3/5">
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Please input your name here"
                required={true}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="Please input your email here "
                required={true}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="phonenumber" value="Your PhoneNumber" />
              </div>
              <TextInput
                id="phonenumber"
                type="phoneNo"
                placeholder="Please input your phone number here"
                required={true}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="telegram_username"
                  value="Your Telegram UserName"
                />
              </div>
              <TextInput
                id="telegram_username"
                type="text"
                placeholder="Please input your username here"
                required={true}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="note" value="Your note to Us" />
              </div>

              <Textarea
                id="note"
                type="text"
                placeholder="Please input your question or not to us here "
                required={true}
                onChange={handleInputChange}
              />
            </div>

            {isDataLoading ? (
              <div className="flex flex-row justify-center">
                <Spinner />
              </div>
            ) : (
              <Button size="xs" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
