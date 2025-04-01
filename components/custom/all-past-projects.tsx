import SectionContainer from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import { PAGE_QUERYResult } from "@/sanity.types";
import { fetchSanityPastProjects } from "@/app/(main)/about/actions";
import { Accordion } from "../ui/accordion";
import OnePastProject from "./one-past-project";

type AllPastProjectsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "all-past-projects" }
>;

export default async function AllPastProjects({
  padding,
  colorVariant,
}: AllPastProjectsProps) {
  const color = stegaClean(colorVariant);
  const pastProjects = await fetchSanityPastProjects();

  return (
    <SectionContainer color={color} padding={padding}>
      <Accordion
        className="space-y-4 flex h-[80vh]"
        type="single"
        orientation="horizontal"
        defaultValue={pastProjects[0].name!}
      >
        {pastProjects.map((project) => (
          <OnePastProject {...project} key={project.slug?.current} />
        ))}
      </Accordion>
    </SectionContainer>
  );
}
