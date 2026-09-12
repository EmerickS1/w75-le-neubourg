"use client";

import { useCallback, useEffect, useState } from "react";
import { Play, Radio, RefreshCw } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PlayerLabel } from "@/components/player-label";

type Event = {
  id: number;
  homeTeam: { name: string };
  awayTeam: { name: string };
  homeScore?: { current?: number; period1?: number; period2?: number; period3?: number };
  awayScore?: { current?: number; period1?: number; period2?: number; period3?: number };
  status?: { type?: string; description?: string };
  tournament?: { name?: string; uniqueTournament?: { name?: string } };
};

export default function Live() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [updated, setUpdated] = useState("");

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/live", { cache: "no-store" });
      if (!response.ok) throw new Error();
      const data = (await response.json()) as { events?: Event[] };
      setEvents((data.events || []).filter((event) =>
        `${event.tournament?.name || ""} ${event.tournament?.uniqueTournament?.name || ""}`
          .toLowerCase().includes("neubourg"),
      ));
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setUpdated(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }
  }, []);

  useEffect(() => {
    const firstRefresh = setTimeout(refresh, 0);
    const timer = setInterval(refresh, 30_000);
    return () => {
      clearTimeout(firstRefresh);
      clearInterval(timer);
    };
  }, [refresh]);

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-[1200px] px-5 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow">Centre en temps réel</p><h1 className="page-title">Direct</h1></div>
          <button onClick={refresh} className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-bold">
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Actualiser
          </button>
        </div>
        <section className="mt-9 overflow-hidden rounded-[1.25rem] border border-[#b9c1bc] bg-white">
          <div className="flex items-center justify-between border-b border-[#1a2b23] p-6">
            <div><p className="eyebrow">Scores en direct</p><h2 className="mt-2 !text-4xl !tracking-tight">Matchs en cours</h2></div>
            <Radio className="text-[#197c57]" />
          </div>
          <div className="bg-[#edf0ee] p-5 sm:p-8">
            {loading && <Status text="Actualisation des scores…" />}
            {!loading && error && <Status text="La source de scores ne répond pas actuellement. Une nouvelle tentative sera effectuée automatiquement." />}
            {!loading && !error && events.length === 0 && <Status text="Aucun match du Neubourg n’est en cours aujourd’hui." />}
            {events.map((event) => <Score key={event.id} event={event} />)}
          </div>
          <p className="border-t px-6 py-3 text-right text-xs text-[#68736d]">Dernière actualisation : {updated || "—"}</p>
        </section>

        <section className="mt-8 overflow-hidden rounded-[1.25rem] bg-[#061f17] text-white">
          <div className="grid min-h-[360px] place-items-center p-8 text-center">
            <div>
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#d9f13b] text-[#061f17]"><Play size={34} /></span>
              <h2 className="mt-6 !text-3xl !tracking-tight">Aucun livestream actif</h2>
              <p className="mx-auto mt-3 max-w-lg text-white/60">Le lecteur apparaîtra ici lorsqu’un match du tournoi sera effectivement diffusé. Aucun flux vidéo n’est disponible avant le début des rencontres.</p>
            </div>
          </div>
        </section>
        <a href="/programme" className="mt-7 inline-flex rounded-full bg-[#0b3427] px-5 py-3 font-bold text-white">Voir le programme complet</a>
      </div>
      <SiteFooter />
    </main>
  );
}

function Status({ text }: { text: string }) {
  return <div className="grid min-h-72 place-items-center text-center"><p className="max-w-xl text-lg text-[#68736d]">{text}</p></div>;
}

function Score({ event }: { event: Event }) {
  const homeScore = event.homeScore || {};
  const awayScore = event.awayScore || {};
  return (
    <article className="mx-auto mb-4 max-w-3xl border border-[#9fa7a2] bg-white p-4">
      <div className="mb-3 flex justify-between text-xs font-black uppercase text-[#197c57]">
        <span>{event.status?.description || "En cours"}</span><span>{event.tournament?.name}</span>
      </div>
      <div className="grid grid-cols-[1fr_120px] gap-3">
        <div className="space-y-1"><PlayerLabel name={event.homeTeam.name} link={false} /><PlayerLabel name={event.awayTeam.name} link={false} /></div>
        <div className="grid grid-cols-4 items-center text-center font-mono font-black">
          <span>{homeScore.period1 ?? "–"}</span><span>{homeScore.period2 ?? "–"}</span><span>{homeScore.period3 ?? "–"}</span><b>{homeScore.current ?? "–"}</b>
          <span>{awayScore.period1 ?? "–"}</span><span>{awayScore.period2 ?? "–"}</span><span>{awayScore.period3 ?? "–"}</span><b>{awayScore.current ?? "–"}</b>
        </div>
      </div>
    </article>
  );
}
