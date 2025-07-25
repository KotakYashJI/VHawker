import React from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhoneAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addcontact } from "../actions/contactaction";

const ContactPage = () => {
    const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(addcontact(data));
    reset();
  };

  return (
    <div className="bg-gray-100 pt-20 min-h-screen px-4 md:px-16 lg:px-32">
      <h1 className="text-4xl font-bold text-center text-[#00ADB5] mb-6">
        Contact Us
      </h1>
      <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
        We're happy to hear from you. Please reach out using the form below or contact details.
      </p>

      <div className="flex flex-col lg:flex-row gap-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-full lg:w-2/3 rounded-xl shadow-lg p-6 space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Your Name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address",
                  },
                })}
                placeholder="Your Email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <input
              {...register("subject", { required: "Subject is required" })}
              placeholder="Subject"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register("message", { required: "Message is required" })}
              placeholder="Your Message"
              rows="6"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#00ADB5] text-white px-6 py-3 rounded-lg hover:bg-[#007B83] transition-all"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="flex items-start gap-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#00ADB5] text-2xl mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Our Office</h3>
              <p className="text-gray-600">Ahmedabad, Gujarat, India</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FontAwesomeIcon icon={faEnvelope} className="text-[#00ADB5] text-2xl mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-600">support@vhawker.in</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FontAwesomeIcon icon={faPhoneAlt} className="text-[#00ADB5] text-2xl mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="w-full mt-12">
        <iframe
          className="w-full h-64 rounded-xl border"
          src="https://maps.google.com/maps?q=Ahmedabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
          allowFullScreen
          loading="lazy"
          title="Vhawker Location"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;