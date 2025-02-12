import React from "react";

function EventCard({ title, spaceAndDate, imageSrc }) {
  return (
    <div className="flex overflow-hidden relative justify-between items-start self-stretch my-auto rounded-2xl border border-solid border-slate-500 min-h-[468px] min-w-[240px] w-[454px] max-md:max-w-full">
      <img
        loading="lazy"
        src={imageSrc}
        alt={`Event image for ${title}`}
        className="object-contain absolute right-0 top-2/4 z-0 self-start -translate-y-2/4 aspect-[0.56] h-[808px] min-w-[240px] translate-x-[0%] w-[454px] max-md:max-w-full"
      />
      <div className="flex z-0 flex-1 shrink gap-10 justify-between items-center self-end px-6 py-4 w-full basis-0 bg-zinc-900 min-w-[240px] max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col self-stretch my-auto leading-tight text-center text-white w-[122px]">
          <h2 className="tracking-tight font-[number:var(--sds-typography-heading-font-weight)] text-[length:var(--sds-typography-heading-size-base)]">
            {title}
          </h2>
          <p className="mt-2 font-[number:var(--sds-typography-subheading-font-weight)] text-[length:var(--sds-typography-subheading-size-medium)]">
            {spaceAndDate}
          </p>
        </div>
        <button className="gap-2.5 self-stretch px-6 py-2 my-auto text-2xl font-medium text-white whitespace-nowrap border-white border-solid border-[3px] rounded-[45px] max-md:px-5">
          RSVP
        </button>
      </div>
    </div>
  );
}

export default EventCard;