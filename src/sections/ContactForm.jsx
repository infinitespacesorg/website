import React from "react";
/*
import FormField from "../components/FormField";

const formFields = [
  { label: "Name", placeholder: "Your name", type: "text" },
  { label: "Email", placeholder: "your@gmail.com", type: "email" },
  { label: "Company", placeholder: "Company name", type: "text" },
  { label: "Message", placeholder: "How can we partner with you?", type: "textarea" }
];
*/


const ContactForm = () => {
  return (
    <iframe
      src="https://infinite-spaces.myflodesk.com/contact"
      title="contactform"
      width="600"
      height="600"
      frameborder="0"
      //style="border: none; border-radius: 4px; overflow:hidden; "
      scrolling="no"
      allowfullscreen=""
      aria-hidden="false"
      tabindex="0"
    ></iframe>
    /*
    <form className="flex flex-col py-11 max-w-[811px]">
      <div className="flex flex-col items-start w-full text-center text-white max-md:max-w-full">
        <h1 className="text-5xl font-bold tracking-tighter leading-tight max-md:max-w-full max-md:text-4xl">
          Get In Touch
        </h1>
        <p className="mt-8 text-xl leading-6 max-md:max-w-full">
          We specialize in setting up immersive experiences in spaces of all
          shapes and sizes, from intimate to arena sized we provide
          infrastructure and creative expertise.
        </p>
      </div>
      <div className="flex flex-col mt-16 w-full leading-tight max-md:mt-10 max-md:max-w-full">
        {formFields.map((field, index) => (
          <FormField
            key={index}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
          />
        ))}
      </div>
      <button type="submit" className="sr-only">Submit</button>
    </form>
    */
  );
}

export default ContactForm;