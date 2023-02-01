import React from "react";
import { Footer } from "flowbite-react";
import { BsTwitter, BsFacebook, BsLinkedin, BsTelegram } from "react-icons/bs";
import util from "../util/util.json";

const FooterComponent = () => {
  return (
    <div className="text-right text-white md:mx-10 sm:mx-5 md:py-10 drop-shadow-md">
      <Footer bgDark={true} className="bg-blue-800" container={true}>
        <div className="w-full">
          <div>
            <Footer.Title title="About Us" className="text-white" />
            <Footer.LinkGroup col={true}>
              <Footer.Link className="text-white">
                {util.configuration.companyName}
              </Footer.Link>
              <Footer.Link className="text-white">
                {util.configuration.phoneNum}
              </Footer.Link>
              <Footer.Link className="text-white">
                {util.configuration.companyEmail}
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between my-5">
            <Footer.Copyright
              className="text-white"
              by={util.configuration.companyName}
              year={2022}
            />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon
                href={util.configuration.socialLinks.twitter}
                className="text-white"
                target="_blank"
                icon={BsTwitter}
              />
              <Footer.Icon
                href={util.configuration.socialLinks.facebook}
                className="text-white"
                target="_blank"
                icon={BsFacebook}
              />
              <Footer.Icon
                href={util.configuration.socialLinks.linkedIn}
                className="text-white"
                target="_blank"
                icon={BsLinkedin}
              />
              <Footer.Icon
                href={util.configuration.socialLinks.telegram}
                className="text-white"
                target="_blank"
                icon={BsTelegram}
              />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default FooterComponent;
