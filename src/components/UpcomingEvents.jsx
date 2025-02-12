import React from "react";
import EventCard from "./EventCard";

const events = [
  {
    title: "Loop Kitch",
    spaceAndDate: "M5 | 2/18/2025",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/b61a56cc27b04509bd02fd0eef641d85/97102cd11edd73d091343d0462b0aff03dad96bc5b93d17ccb3749c710ea0c2a?apiKey=b61a56cc27b04509bd02fd0eef641d85&",
  },
  {
    title: "Event Title",
    spaceAndDate: "Space | Date",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/b61a56cc27b04509bd02fd0eef641d85/8ebb59f17e1a8953cf95ad0c31d3ce78dee572662e823131a171ea06cbfb8a9c?apiKey=b61a56cc27b04509bd02fd0eef641d85&",
  },
  {
    title: "Event Title",
    spaceAndDate: "Space | Date",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/b61a56cc27b04509bd02fd0eef641d85/0cd7d7e5fd10c576771fd94b5fed00c40a8b460226709e65a260456e207d7359?apiKey=b61a56cc27b04509bd02fd0eef641d85&",
  },
  {
    title: "Event Title",
    spaceAndDate: "Space | Date",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/b61a56cc27b04509bd02fd0eef641d85/adcea478f6bc904c83beec2c540bf0c33fc4a6bea45de00245f384cffc960fb6?apiKey=b61a56cc27b04509bd02fd0eef641d85&",
  },
];

function UpcomingEvents() {
  return (
    <div className="flex flex-col pt-3">
      <div className="flex flex-col mt-3 max-md:max-w-full">
        <div className="flex flex-col items-start self-center max-w-full leading-tight text-center text-white w-[811px]">
          <h1 className="tracking-tighter font-[number:var(--sds-typography-title-page-font-weight)] text-[length:var(--sds-typography-title-page-size-base)] max-md:max-w-full max-md:text-4xl">
            Upcoming Events
          </h1>
          <p className="mt-8 font-[number:var(--sds-typography-subheading-font-weight)] text-[length:var(--sds-typography-subheading-size-medium)] max-md:max-w-full">
            We are on a constant mission to build community, empower artists,
            and ...
          </p>
        </div>
        <div className="flex overflow-x-auto gap-10 items-center mt-11 w-full max-md:mt-10 max-md:max-w-full">
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              spaceAndDate={event.spaceAndDate}
              imageSrc={event.imageSrc}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UpcomingEvents;