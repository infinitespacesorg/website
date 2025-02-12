import React from 'react';

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col self-stretch px-8 pt-8 pb-12 my-auto rounded-2xl border border-solid bg-zinc-900 border-slate-500 min-h-[260px] min-w-[240px] w-[340px] max-md:px-5">
      <div className="flex flex-col w-full">
        <img
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain aspect-[0.98] w-[43px]"
        />
        <div className="mt-4 tracking-tight leading-tight font-[number:var(--sds-typography-heading-font-weight)] text-[length:var(--sds-typography-heading-size-base)]">
          {title}
        </div>
        <div className="mt-4 leading-6 font-[number:var(--sds-typography-subheading-font-weight)] text-[length:var(--sds-typography-subheading-size-medium)]">
          {description}
        </div>
      </div>
    </div>
  );
}

export default FeatureCard;