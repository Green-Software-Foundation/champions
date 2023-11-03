import type { Champion } from "types";
import ExpertStar from "@/icons/expert-star.svg?raw";
import { MapPin } from "lucide-react"

const ProfileCard = ({
  data
}: { data: Champion }) => {
  const { url,
    city,
    country,
    image,
    firstName,
    lastName,
    role,
    organization, type } = data;
  const isExpert = type === "expert";

  return (
    <a
      className="relative p-1 rounded-xl w-full overflow-hidden inline-block h-full"
      href={url}
    >
      {isExpert && <div className="absolute -inset-px rounded-xl bg-gradient-to-tr from-primary-gradient-dark to-primary-gradient-light z-0 w-full" />}
      <div className="w-full h-full p-6 bg-white rounded-lg shadow relative z-10">
        <div className="grid grid-rows-[1fr_auto_1fr] text-center h-full">
          <div>
            {isExpert && <div className="flex flex-row items-center justify-center gap-1">
              <span className="h-4 w-4 inline-block" dangerouslySetInnerHTML={{ __html: ExpertStar }}></span>
              <span className="uppercase font-black bg-gradient-to-tr from-primary-gradient-dark to-primary-gradient-light bg-clip-text text-transparent">
                Expert
              </span>
            </div>}

            <span className="text-sm font-bold text-gray-600 flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" /> {city? `${city},`: null} {country}
            </span>
          </div>
          <div className="flex flex-row md:flex-col items-center justify-center gap-4">
            <img
              className="w-24 h-24 mb-3 rounded-full ring-1 ring-primary-lightest-2  mt-4"
              src={image}
              alt={`${firstName} image`}
            />
            <div className="flex flex-col text-left md:text-center">
              <h4 className=" text-xl font-bold text-primary-default mt-4">
                {firstName} {lastName}
              </h4>

              <span className="text-sm font-semibold text-gray-darker">
                {role}
              </span>

              <span className="text-xs text-gray-darker">{organization}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProfileCard;
