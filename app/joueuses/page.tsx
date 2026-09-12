import { ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FlagIcon } from "@/components/flag-icon";
import { direct, officialQualifiers, slugify, type Player } from "@/lib/players";

function PlayerList({ title, subtitle, players }: { title: string; subtitle?: string; players: Player[] }) {
  return <section className="mt-12"><div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h2 className="!text-3xl !tracking-tight">{title}</h2>{subtitle&&<p className="mt-2 text-[#68766f]">{subtitle}</p>}</div><span className="pill dark">{players.length} joueuses</span></div><div className="overflow-hidden rounded-xl border border-[#aeb5b0] bg-white"><div className="hidden grid-cols-[70px_1fr_150px_110px_40px] border-b bg-[#edf1ee] px-4 py-3 text-xs font-black uppercase tracking-wider text-[#5d6b64] md:grid"><span>Ordre</span><span>Joueuse</span><span>Statut</span><span>Classement</span><span/></div>{players.map((p)=><a key={p.name} href={`/joueuses/${slugify(p.name)}`} className="group grid grid-cols-[48px_1fr_28px] items-center gap-3 border-b px-4 py-3 last:border-0 hover:bg-[#f3f7f4] md:grid-cols-[70px_1fr_150px_110px_40px]"><b className="text-[#197c57]">{p.pos}</b><span className="flex items-center gap-3"><span className="grid w-11 justify-items-center gap-1"><FlagIcon code={p.code}/><small className="text-[9px] font-black">{p.code||"N/C"}</small></span><b>{p.name}</b></span><span className="hidden text-sm md:block">{p.seed?`Tête de série ${p.seed}`:p.entry}</span><span className="hidden font-mono text-sm md:block">{p.rank?`WTA ${p.rank}`:"—"}</span><ChevronRight size={18} className="text-[#8b9891] group-hover:text-[#197c57]"/></a>)}</div></section>;
}

export default function PlayersPage() {
  return <main><SiteHeader/><div className="mx-auto max-w-[1120px] px-5 py-12"><p className="eyebrow">Édition 2026</p><h1 className="page-title">Les participantes</h1><PlayerList title="Tableau principal" players={direct}/><PlayerList title="Qualifications" subtitle="Ordre du tableau officiel publié le 12 septembre 2026" players={officialQualifiers}/></div><SiteFooter/></main>;
}
