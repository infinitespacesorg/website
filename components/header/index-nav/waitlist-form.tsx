import FormNewsletter from "@/components/ui/forms/newsletter";
import { useState } from "react";
import { PAGE_QUERYResult } from "@/sanity.types";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";

type FormNewsletterProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "form-newsletter" }
>;

interface WaitlistFormProps {
  waitlistFormOpen: boolean;
  setWaitlistFormOpen: (open: boolean) => void;
}

export default function WaitlistForm({
  setWaitlistFormOpen,
  waitlistFormOpen,
}: WaitlistFormProps) {
  const [isExiting, setIsExiting] = useState(false);

  function handleClose() {
    if (isExiting) return;
    setIsExiting(true);

    setTimeout(() => {
      setIsExiting(false);
      setWaitlistFormOpen(false);
    }, 300);
  }

  const handleBackdropClick = (event: React.MouseEvent) => {
    handleClose();
  };

  const formNewsletterProps: FormNewsletterProps = {
    _type: "form-newsletter",
    padding: { bottom: false, top: false, _type: "section-padding" },
    colorVariant: "background",
    consentText:
      "By submitting this form, you agree to the terms and conditions.",
    buttonText: "Submit",
    successMessage: "Thanks for your submission! We'll be in touch soon.",
    _key: "contact-dialog-form",
    stackAlign: "left",
  };

  return (
    <AnimatePresence>
      {waitlistFormOpen && (
        <motion.div
          key="contact-dialog"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={() => {
            if (isExiting) {
              setIsExiting(false);
              setWaitlistFormOpen(false);
            }
          }}
          className={` ${waitlistFormOpen ? "fixed h-full w-full top-0 left-0 flex justify-center items-center z-9999 bg-muted/90 backdrop-blur-xs" : "hidden"}`}
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
            className={`flex flex-col bg-background mx-auto h-fit my-auto py-10 w-[80vw] max-w-[400px] rounded-xl shadow-lg`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center m-auto">
              <h1 className="text-3xl">Join the waitlist</h1>
              <p className={`mt-3`}>We're excited to work with you!</p>
            </div>
            <div className="w-full max-w-md">
            <FormNewsletter {...formNewsletterProps} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
