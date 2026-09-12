import { getPlayerByName, slugify } from "@/lib/players";
import { FlagIcon } from "@/components/flag-icon";

const nations: Record<string, string> = { "petra-marcinko":"CRO", "alyssa-reguer":"FRA", "polina-iatcenko":"N/C", "ayana-akli":"USA", "daria-snigur":"UKR", "tamira-paszek":"AUT", "amarni-banks":"GBR", "mio-kawamura":"JPN", "lucia-cortez-llorca":"ESP", "jenny-lim":"FRA", "oceane-dodin":"FRA", "alina-korneeva":"RUS", "sonay-kartal":"GBR", "marine-partaud":"FRA", "ysaline-bonaventure":"BEL", "harmony-tan":"FRA", "magali-kempen":"BEL", "ylena-in-albon":"SUI", "arianne-hartono":"NED", "anna-bondar":"HUN" };

export function PlayerLabel({ name, seed, link = true, compact = false }: { name: string; seed?: number | null; link?: boolean; compact?: boolean }) {
  const p = getPlayerByName(name);
  const code = p?.code || nations[slugify(name)] || "N/C";
  const body = <><span className={`grid shrink-0 place-items-center border-r border-[#c9d0cb] bg-white ${compact ? "w-14" : "w-16"}`}><FlagIcon code={code}/><small className="mt-0.5 text-[9px] font-black leading-none">{code}</small></span><span className="flex min-w-0 flex-1 items-center justify-center truncate px-3 text-center font-bold">{name} {seed && <small className="ml-1 font-black">[{seed}]</small>}</span><span className="h-full w-7 bg-[#e5e6e5]"/><span className="h-full w-7 bg-[#f1f1f1]"/></>;
  const cls = `flex min-h-14 items-stretch overflow-hidden border border-[#b8c0bb] bg-white text-left ${compact ? "text-sm" : ""}`;
  return link ? <a href={`/joueuses/${slugify(name)}`} className={`${cls} hover:border-[#197c57] hover:bg-[#f5f8f5]`}>{body}</a> : <span className={cls}>{body}</span>;
}
