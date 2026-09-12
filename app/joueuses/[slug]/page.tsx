import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FlagIcon } from "@/components/flag-icon";
import { getPlayer, players, slugify } from "@/lib/players";

export function generateStaticParams() { return players.map((p) => ({ slug: slugify(p.name) })); }

export default async function PlayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPlayer(slug);
  if (!p) notFound();
  const rankLabel = p.wtaRankType ? `Classement WTA ${p.wtaRankType === "Doubles" ? "double" : "simple"}` : "Classement simple";
  return <main><SiteHeader/><div className="mx-auto max-w-[1120px] px-5 py-10">
    <a href="/joueuses" className="inline-flex items-center gap-2 font-bold"><ArrowLeft size={17}/> Participantes</a>
    <section className="mt-7 overflow-hidden rounded-[1.5rem] bg-[#0b3427] text-white"><div className="grid md:grid-cols-[240px_1fr]">
      <div className="grid min-h-52 place-items-center bg-white/7"><div className="text-center"><FlagIcon code={p.code} className="!h-16 !w-24"/><b className="mt-3 block tracking-[.25em]">{p.code||"N/C"}</b></div></div>
      <div className="p-8 sm:p-11"><p className="text-sm font-bold uppercase tracking-[.2em] text-[#d9f13b]">{p.entry}</p><h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">{p.name}</h1><p className="mt-4 text-lg text-white/60">{p.code||"Nationalité non publiée"} · {p.age?`${p.age} ans`:"Âge non publié"}</p></div>
    </div></section>
    <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Stat label={rankLabel} value={p.wtaRank?String(p.wtaRank):(p.rank?String(p.rank):"Non publié")}/><Stat label={p.wtaRankType==="Doubles"?"Titres en double":"Titres en simple"} value={p.titles!==undefined?String(p.titles):"Non publié"}/><Stat label="Victoires / défaites 2026" value={p.wonLost||"Non publié"}/><Stat label="Gains en carrière" value={p.prizeMoney||"Non publié"}/></section>
    <section className="mt-8 rounded-[1.5rem] border border-[#d6ddd8] bg-white p-7 sm:p-9"><h2 className="!text-3xl !tracking-tight">Biographie</h2><div className="mt-6 divide-y"><Bio label="Meilleur classement" value={p.careerHigh||"Non publié"}/><Bio label="Taille" value={p.height||"Non publié"}/><Bio label="Date de naissance" value={p.birthDate||"Non publié"}/><Bio label="Lieu de naissance" value={p.birthPlace||"Non publié"}/></div>{p.wtaUrl&&<a href={p.wtaUrl} target="_blank" className="mt-6 inline-flex items-center gap-2 font-bold text-[#197c57]">Fiche officielle WTA <ExternalLink size={16}/></a>}</section>
    {p.careerHighlights&&<section className="mt-8 rounded-[1.5rem] bg-[#e7ece8] p-7 sm:p-9"><h2 className="!text-3xl !tracking-tight">Faits marquants</h2><ul className="mt-6 space-y-3">{p.careerHighlights.map(x=><li key={x} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#197c57]"/>{x}</li>)}</ul></section>}
  </div><SiteFooter/></main>;
}
function Stat({label,value}:{label:string;value:string}){return <div className="rounded-xl border border-[#d6ddd8] bg-white p-5"><span className="text-sm text-[#68736d]">{label}</span><b className="mt-2 block text-3xl">{value}</b></div>}
function Bio({label,value}:{label:string;value:string}){return <div className="grid gap-1 py-4 sm:grid-cols-[220px_1fr]"><b>{label}</b><span className="text-[#68736d]">{value}</span></div>}
