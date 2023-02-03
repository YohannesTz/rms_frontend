import {
  Label,
  TextInput,
  Button,
  Textarea,
  Spinner,
  Modal,
} from "flowbite-react";
import React, { useState } from "react";

const ContactPage = () => {
  const [isDataLoading, setIsDataLoading] = useState(false);

  const handleInputChange = () => {};
  const handleSubmit = () => {};
  return (
    <div>
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
                  htmlFor="telegramusername"
                  value="Your Telegram UserName"
                />
              </div>
              <TextInput
                id="telegramusername"
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
