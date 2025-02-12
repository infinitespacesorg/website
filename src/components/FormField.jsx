import React from "react";

function FormField({ label, placeholder, type }) {
  const id = label.toLowerCase();
  const isTextarea = type === "textarea";
  const InputComponent = isTextarea ? "textarea" : "input";

  return (
    <div className={`flex flex-col ${isTextarea ? "mt-10 min-h-[316px]" : "mt-10"} w-full max-md:max-w-full`}>
      <label htmlFor={id} className="text-2xl font-bold tracking-tight text-white max-md:max-w-full">
        {label}
      </label>
      <InputComponent
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className={`gap-2.5 self-stretch p-4 mt-4 w-full text-3xl tracking-tighter rounded-xl border border-white border-solid text-white text-opacity-70 max-md:max-w-full ${isTextarea ? "flex-1 size-full" : ""}`}
        aria-label={label}
      />
    </div>
  );
}

export default FormField; 