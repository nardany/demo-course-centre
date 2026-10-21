import { Icon } from "../icon";

const AUTHOR_URL = "https://www.linkedin.com/in/nar-danielyan";

export function DemoBanner() {
  return (
    <div className="bg-accent text-[#1b1307]">
      <div className="container-x flex flex-col items-center justify-center gap-x-4 gap-y-1 py-2 text-center text-[13px] font-medium sm:flex-row">
        <span className="flex items-center gap-1.5">
          <Icon name="sparkles" className="size-4 shrink-0" />
          Սա դեմո կայք է. դիզայնը, գույները, անիմացիաները և բովանդակությունը կհարմարեցվեն ձեր կենտրոնին։
        </span>
        <a
          href={AUTHOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-bold underline decoration-2 underline-offset-2 hover:no-underline"
        >
          Պատվիրել կայք <Icon name="arrowRight" className="size-3.5" />
        </a>
      </div>
    </div>
  );
}
