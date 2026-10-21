export const TOPICS = [
  { value: "trial", label: "Անվճար փորձնական դաս" },
  { value: "level", label: "Մակարդակի որոշում" },
  { value: "kids", label: "Դասընթաց երեխայի համար" },
  { value: "question", label: "Հարց" },
] as const;

export function topicLabel(value: string) {
  return TOPICS.find((t) => t.value === value)?.label ?? "";
}
