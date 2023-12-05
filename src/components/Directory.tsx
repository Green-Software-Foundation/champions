import { useState, useRef, useEffect } from 'react';
import { InstantSearch, ClearRefinements, RefinementList } from 'react-instantsearch';
import algoliasearch from 'algoliasearch/lite';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';

import ChampionsCatalog from "./ChampionsCatalog";

const searchClient = algoliasearch("SWCMJQWWC9", "7177f1ae5c3725e4c33f26a69eeeaa90");

const refinements = [
    {
        attribute: 'country',
        label: 'Country',
    },
    {
        attribute: 'activities.contributionType',
        label: 'Contribution Type',
    },
    {
        attribute: 'activities.linkedGSFProject',
        label: 'GSF Project',
    }

];

const Directory = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        }

        // Attach the click event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Remove event listener on cleanup
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="md:grid grid-cols-[256px_auto] gap-12 mb-10 w-full relative">
            <InstantSearch searchClient={searchClient} indexName="Champions" future={{ preserveSharedStateOnUnmount: true }} routing={true} stalledSearchDelay={500}>

                <div ref={sidebarRef} className={`fixed md:static p-8 md:p-0 shadow-md md:shadow-none bg-accent-lightest-1 md:bg-transparent left-0 top-0 h-full w-3/4 md:w-64 overflow-y-auto transform transition-transform ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block z-50 `}>
                    <div className='mb-4'>
                        <h2 className="text-xl md:text-2xl text-primary-darker font-bold text-left ">Filters by</h2>
                        <ClearRefinements className='text-primary-default font-bold text-sm md:text-base ' translations={{
                            resetButtonText: 'Clear all filters',
                        }} />
                    </div>
                    {/* <ToggleRefinement attribute="type"
                        label="Expert Only"
                        on="expert"
                        classNames={{
                            label: "uppercase bg-gradient-to-tr px-2 py-1 my-4 rounded-lg from-primary-gradient-dark to-primary-gradient-light text-white font-extrabold inline-flex items-center justify-center gap-3 tracking-wider text-sm md:text-base",
                            checkbox: "h-4 w-4 accent-accent-light",
                        }}
                    /> */}
                    {refinements.map(refinement => <Accordion key={refinement.attribute} type="single" collapsible className='w-full '>
                        <AccordionItem value={refinement.attribute}>
                            <AccordionTrigger className='capitalize font-bold text-primary-darkest-1 md:text-lg '>{refinement.label}</AccordionTrigger>
                            <AccordionContent>
                                <RefinementList sortBy={['name:asc']} attribute={refinement.attribute} classNames={{
                                    list: "flex flex-col gap-4 border-l-2 border-gray-timeline",
                                    item: "relative before:absolute before:w-4 before:left-0 before:border before:border-gray-timeline before:top-1/2 before:-translate-y-1/2 pl-8 text-gray-800",
                                    label: "flex gap-2 items-center text-sm md:text-base capitalize",
                                    count: "flex-shrink-0 text-[0.675rem] font-extrabold w-5 h-5 rounded-full bg-accent-default flex items-center justify-center text-accent-darker",
                                    checkbox: "flex-shrink-0 accent-primary-default h-4 w-4 border border-primary-default",
                                }} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>)}
                </div>


                <ChampionsCatalog toggleFilter={() => setIsFilterOpen(prevState => !prevState)} />
            </InstantSearch >
        </div >
    );
};

export default Directory;