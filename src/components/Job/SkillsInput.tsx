import { useQueryGetSkills } from "@/hooks/query-hooks/getSkills";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Fuse, { IFuseOptions } from "fuse.js";
import MultipleSelector from "../ui/MultiSelect";
import { Skeleton } from "../ui/skeleton";
interface Skill {
  id: number;
  skill: string;
}

interface SkillsInputProps {
  field: any;
  form: any;
}

const SkillsInput = ({ field, form }: SkillsInputProps) => {
  const { data: skillsData, isLoading, isSuccess } = useQueryGetSkills();
  const [query, setQuery] = useState<string>("");

  const fuseOptions: IFuseOptions<Skill> = {
    keys: ["skill"],
    threshold: 0.3,
  };

  const fuse = useMemo(
    () => new Fuse(skillsData || [], fuseOptions),
    [skillsData]
  );

  const results = useMemo((): Skill[] => {
    if (!fuse || !query) return skillsData || [];
    return fuse.search(query).map((result) => result.item);
  }, [fuse, query, skillsData]);

  useEffect(() => {
    const arr = form.getValues("skills") || [];
    console.log(form.getValues("skills"));
    field.onChange([...arr]);
    field.value = form.getValues("skills") || [];
  }, [skillsData, isLoading]);
  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-9 w-full " />
      ) : (
        <MultipleSelector
          onSearch={(e) => {
            setQuery(e);
          }}
          field={field}
          placeholder="Search Skills"
          options={results.slice(0, 6).map((skill) => ({
            value: skill.skill,
            label: skill.skill,
          }))}
        />
      )}
    </div>
  );
};
export default SkillsInput;
