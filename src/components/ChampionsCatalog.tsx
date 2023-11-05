import ProfileCard from "./ProfileCard";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import type { Champion } from "types";
import { Search as SearchIcon } from "lucide-react";
import { SearchBox, PoweredBy, Hits, Pagination, useInstantSearch } from 'react-instantsearch';


const Hit = ({ hit }: {
  hit: Champion
}) =>
  <ProfileCard data={{ ...hit, url: `/champions/${hit.url}` }} />

const NoResults = () => (
  <div className="w-full flex flex-col items-center justify-center gap-3">
    <p className="text-2xl font-bold text-primary-dark">No results found</p>
    <p className="text-gray-400">Try a different search term</p>
  </div>
)
const ChampionsCatalog = ({
  toggleFilter
}: {
  toggleFilter: () => void
}) => {
  const { status, results } = useInstantSearch();
  return (
    <div className="w-full flex flex-col items-start justify-start gap-3 md:gap-6 ">

      <div className="w-full relative">
        <SearchBox
          placeholder="Search champions..."
          classNames={
            {
              root: "w-full",
              input: "w-full pl-12 pr-40 rounded-lg h-12 border px-3 py-2 text-md text-gray-800 ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            }
          }
          submitIconComponent={() => <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-dark " />}
          resetIconComponent={() => undefined}
          loadingIconComponent={() => undefined}
        />
        <PoweredBy className="absolute right-3 top-1/2 -translate-y-1/2" classNames={
          {
            logo: "w-32",
          }
        } />
      </div>
      <button onClick={toggleFilter} className="md:hidden border bg-accent-lightest-1 border-gray-400 p-2 rounded-md w-full text-sm font-bold tracking-wide text-gray-700">Show Filters</button>
      {
        status === "loading" || status === "stalled" && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center mx-auto gap-6 w-full">
          <ProfileCardSkeleton />
          <ProfileCardSkeleton />
          <ProfileCardSkeleton />
        </div>
      }
      <Hits hitComponent={Hit} classNames={
        {
          root: "w-full",
          list: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center mx-auto gap-6",
          item: "w-full h-full"
        }
      } />
      {
        status === "idle" && results?.nbHits === 0 && <NoResults />
      }
      {results.nbPages > 1 &&
        <Pagination
          showLast={false}
          showFirst={false}
          classNames={{
            root: "flex justify-center gap-2 mt-8 w-full ",
            list: "flex gap-2 justify-center items-center",
            item: "text-gray-800 font-bold px-2 py-1 rounded-md hover:bg-gray-200 aspect-square w-8 h-8 flex items-center justify-center",
            selectedItem: "bg-primary-default text-white",
            disabledItem: "opacity-50 cursor-not-allowed",
          }}
        />}
    </div>
  );
};
export default ChampionsCatalog;
