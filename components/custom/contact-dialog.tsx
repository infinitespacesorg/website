import { useState } from "react";
import { PAGE_QUERYResult } from "@/sanity.types";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "motion/react";
import ContactUsForm from "./contact-us";

type ContactUsFormProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "contact-us-form" }
>;

interface ContactDialogProps {
  contactDialogOpen: boolean;
  setContactDialogOpen: (open: boolean) => void;
}

export default function ContactDialog({
  setContactDialogOpen,
  contactDialogOpen,
}: ContactDialogProps) {

  const [isExiting, setIsExiting] = useState(false);

  function handleClose() {
    if (isExiting) return;
    setIsExiting(true);

    setTimeout(() => {
      setIsExiting(false);
      setContactDialogOpen(false);
    }, 300);
  }

  const handleBackdropClick = (event: React.MouseEvent) => {
    handleClose();
  };

  const contactUsFormProps: ContactUsFormProps = {
    _type: "contact-us-form",
    padding: { bottom: true, top: true, _type: "section-padding" },
    colorVariant: "background",
    consentText:
      "By submitting this form, you agree to the terms and conditions.",
    buttonText: "Submit",
    successMessage: "Thanks for your submission! We'll be in touch soon.",
    // _type: "form-newsletter",
    _key: "contact-dialog-form",
    stackAlign: "left",
    formField1: "Name",
    formField2: "Email",
    formField3: "Website",
    formField4: "Message",
  };

  return (
    <AnimatePresence>
      {contactDialogOpen && (
      <motion.div
        key="contact-dialog"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => {
          if (isExiting) {
            setIsExiting(false);
            setContactDialogOpen(false);
          }
        }}
        className={` ${contactDialogOpen ? "fixed h-full w-full top-0 left-0 flex justify-center items-center z-9999 bg-muted/90 backdrop-blur-xs" : "hidden"}`}
        onClick={handleBackdropClick}
      >
        <Button
          className={
            "absolute right-5 top-10 bg-white text-black hover:bg-gray-200"
          }
          onClick={handleClose}
          disabled={isExiting}
        >
          X
        </Button>
        <div
          className={`flex flex-row  justify-around items-center bg-background mx-auto h-fit my-auto px-5 w-[80vw] rounded-xl shadow-lg`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <h1>Get in touch</h1>
            <p className={`mt-3`}>We're excited to work with you!</p>
          </div>
          <div className="w-full max-w-md">
            <ContactUsForm {...contactUsFormProps} />
          </div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
