import React from 'react';
import FeatureCard from '../components/FeatureCard';

const features = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/b61a56cc27b04509bd02fd0eef641d85/d5b1eed7c8a069751f539e8f65d5921ff74d0f5a192ec8c0d0cad14686f1c65c?apiKey=b61a56cc27b04509bd02fd0eef641d85&",
    title: "Live Event Enhancement",
    description: "Transforming moments into lasting memories through innovative technology."
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/b61a56cc27b04509bd02fd0eef641d85/a85977d2f4162e77b4924bd8fe4810e43253190687d6cb02154ea2a2cad7eb02?apiKey=b61a56cc27b04509bd02fd0eef641d85&",
    title: "Interactive Installations",
    description: "Creating memorable experiences that blend physical and digital realms."
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/b61a56cc27b04509bd02fd0eef641d85/a31d43a898cd591575cb43c1793ba8cfcde2e73cdacb25a1d636cf8016f21028?apiKey=b61a56cc27b04509bd02fd0eef641d85&",
    title: "Community",
    description: "Enabling artists, communities, and ..."
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/b61a56cc27b04509bd02fd0eef641d85/7c63e5fecac4661215b7a2d788fd8bac66a4e07942c482386422ae8e72191854?apiKey=b61a56cc27b04509bd02fd0eef641d85&",
    title: "Spacial Entertainment Network",
    description: "Building innovative platforms......"
  }
];

function WhatWeDoSection() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 shrink gap-2.5 self-stretch py-11 w-full tracking-tighter text-center text-white font-[number:var(--sds-typography-title-page-font-weight)] leading-[58px] text-[length:var(--sds-typography-title-page-size-base)] max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
        "Our immersive technology transforms spaces into living, breathing
        masterpieces — adaptable, interactive, and unforgettable."
      </div>
      <div className="flex flex-col mt-20 w-full text-white max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col self-center max-w-full text-center w-[811px]">
          <div className="tracking-tighter leading-tight font-[number:var(--sds-typography-title-page-font-weight)] text-[length:var(--sds-typography-title-page-size-base)] max-md:max-w-full max-md:text-4xl">
            What We Do
          </div>
          <div className="mt-8 leading-6 font-[number:var(--sds-typography-subheading-font-weight)] text-[length:var(--sds-typography-subheading-size-medium)] max-md:max-w-full">
            building the future of entertainment through spatial technology and
            community connection
          </div>
        </div>
        <div className="flex flex-wrap gap-8 justify-between items-center mt-20 w-full max-md:mt-10 max-md:max-w-full">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhatWeDoSection;