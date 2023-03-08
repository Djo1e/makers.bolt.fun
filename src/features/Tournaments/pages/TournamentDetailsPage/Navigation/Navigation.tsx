import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useCarousel } from "src/utils/hooks";
import { useTournament } from "../TournamentDetailsContext";

export default function Navigation() {
  const { viewportRef } = useCarousel({
    align: "start",
    slidesToScroll: 2,
    containScroll: "trimSnaps",
  });

  const {
    tournamentDetails,
    staticData: {
      config: { showFeed },
    },
  } = useTournament();

  const links = useMemo(
    () => [
      {
        text: "Overview",
        path: "overview",
      },
      {
        text: `Feed`,
        path: "feed",
        hide: !showFeed,
      },
      {
        text: `Events (${tournamentDetails.events_count})`,
        path: "events",
      },
      {
        text: `Makers (${tournamentDetails.makers_count})`,
        path: "makers",
      },
      {
        text: `Projects (${tournamentDetails.projects_count})`,
        path: "projects",
      },
      {
        text: `Ideas`,
        path: "ideas",
      },
      // {
      //     text: "???? 🚧",
      //     path: "ideas",
      //     isDisabled: true,
      // },
      // {
      //     text: "?????????? 🚧",
      //     path: "resources",
      //     isDisabled: true,
      // },
    ],
    [
      showFeed,
      tournamentDetails.events_count,
      tournamentDetails.makers_count,
      tournamentDetails.projects_count,
    ]
  );

  return (
    <div className="w-full bg-white py-16 border-y border-gray-200 sticky-top-element z-10">
      <div className="content-container">
        <div className="relative group">
          <div className="overflow-hidden" ref={viewportRef}>
            <div className="select-none w-full flex gap-8 md:gap-16">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => ` 
  return (
    <div className="w-full bg-white py-16 border-y border-gray-200 sticky-top-element z-10">
      <div className="content-container">
        <div className="relative group">
          <div className="overflow-hidden" ref={viewportRef}>
            <div className="select-none w-full flex gap-8 md:gap-16">
              {links
                .filter((link) => !link.hide)
                .map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => ` 
                   min-w-max rounded-48 px-16 py-8 cursor-pointer font-medium text-body5
                    active:scale-95 transition-transform
                    ${
                      isActive
                        ? "bg-primary-100 text-primary-600"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                    }
                    `}
                  role="button"
                >
                  {link.text}
                </NavLink>
              ))}
            </div>
          </div>
          {/* <button className={`absolute text-body6 w-[28px] aspect-square flex justify-center items-center left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full bg-white text-gray-400 opacity-0 ${canScrollPrev && 'group-hover:opacity-100'} active:scale-90 transition-opacity border border-gray-200 shadow-md`} onClick={() => scrollSlides(-1)}>
                    {"<"}
                </button>
                <button className={`absolute text-body6 w-[28px] aspect-square flex justify-center items-center right-0 translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full bg-white text-gray-400  opacity-0 ${canScrollNext && 'group-hover:opacity-100'} active:scale-90 transition-opacity border border-gray-200 shadow-md`} onClick={() => scrollSlides(1)}>
                    {">"}
                </button> */}
        </div>
      </div>
    </div>
  );
}
