// src/Pages/LocationsPage.jsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import map from "../assets/map.jpg"
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  Globe2,
  Clock,
  ArrowRight,
  Copy,
  ExternalLink,
  Search,
  Filter,
  Grid,
  List,
} from "lucide-react";

/**
 * LocationsPage.jsx
 * - Self-contained UI for a Locations/Offices page
 * - Dependencies: react, framer-motion, lucide-react, tailwindcss
 * - No external UI libraries required
 */

/* ---------------- Demo data ---------------- */
const OFFICES = [
  {
    id: "hq-delhi",
    name: "GlobalXperts HQ",
    city: "Noida",
    state: "Uttar Pradesh",
    country: "India",
    countryCode: "IN",
    region: "APAC",
    address: "A-123, Sector 63, Noida, UP 201301",
    phone: "+91 98765 43210",
    email: "hello@globalxperts.net",
    hours: "Mon–Fri, 9:30 – 18:30 IST",
    tags: ["Engineering", "Sales", "Support"],
    mapXY: { x: 69.5, y: 39.2 },
  },
  {
    id: "us-austin",
    name: "US Office — Austin",
    city: "Austin",
    state: "Texas",
    country: "United States",
    countryCode: "US",
    region: "Americas",
    address: "600 Congress Ave, Austin, TX 78701",
    phone: "+1 (512) 555-0199",
    email: "usa@globalxperts.net",
    hours: "Mon–Fri, 9:00 – 17:30 CST",
    tags: ["Sales", "Customer Success"],
    mapXY: { x: 26.2, y: 43.5 },
  },
  {
    id: "uk-london",
    name: "UK Office — London",
    city: "London",
    state: "England",
    country: "United Kingdom",
    countryCode: "GB",
    region: "EMEA",
    address: "1 Canada Square, Canary Wharf, London E14 5AB",
    phone: "+44 20 7123 4567",
    email: "uk@globalxperts.net",
    hours: "Mon–Fri, 9:00 – 17:00 GMT",
    tags: ["Solutions", "Partnerships"],
    mapXY: { x: 48.0, y: 36.2 },
  },
  {
    id: "au-sydney",
    name: "Australia Office — Sydney",
    city: "Sydney",
    state: "NSW",
    country: "Australia",
    countryCode: "AU",
    region: "APAC",
    address: "200 George St, Sydney NSW 2000",
    phone: "+61 2 9012 3456",
    email: "anz@globalxperts.net",
    hours: "Mon–Fri, 9:00 – 17:30 AEST",
    tags: ["Engineering", "Support"],
    mapXY: { x: 77.2, y: 78.2 },
  },
];

const REGION_OPTIONS = ["All", "APAC", "EMEA", "Americas"];
const SORT_OPTIONS = [
  { key: "a2z", label: "Name A → Z" },
  { key: "z2a", label: "Name Z → A" },
  { key: "country", label: "Country" },
  { key: "region", label: "Region" },
];

/* ---------------- Helpers & small UI primitives ---------------- */

const flagEmoji = (iso2) => {
  if (!iso2) return "";
  try {
    return iso2
      .toUpperCase()
      .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
  } catch {
    return "";
  }
};

const mapsLink = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

const safeCopy = async (text) => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback (rare)
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
};

/* Basic styled primitives (Tailwind) */
function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border bg-white shadow-sm ${className}`}>{children}</div>;
}
function CardHeader({ children, className = "" }) {
  return <div className={`p-4 border-b ${className}`}>{children}</div>;
}
function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
function CardFooter({ children, className = "" }) {
  return <div className={`p-4 border-t flex gap-2 ${className}`}>{children}</div>;
}
function Badge({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-700 ${className}`}>
      {children}
    </span>
  );
}
function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
}
function Select({ options, value, onChange, className = "" }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {options.map((o) =>
        typeof o === "string" ? (
          <option key={o} value={o}>
            {o}
          </option>
        ) : (
          <option key={o.key} value={o.key}>
            {o.label}
          </option>
        )
      )}
    </select>
  );
}
/* Button: renders <a> when href provided (keeps markup valid) */
function Button({ children, className = "", variant = "solid", href, ...props }) {
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm transition";
  const style =
    variant === "outline"
      ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
      : "bg-blue-600 text-white hover:bg-blue-700";

  if (href) {
    return (
      <a href={href} className={`${base} ${style} ${className}`} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={`${base} ${style} ${className}`} {...props}>
      {children}
    </button>
  );
}

/* ---------------- Main Page ---------------- */
export default function LocationsPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [sortBy, setSortBy] = useState("a2z");
  const [view, setView] = useState("grid");

  const filtered = useMemo(() => {
    let list = OFFICES.filter((o) =>
      [o.name, o.city, o.state, o.country, o.address].join(" ").toLowerCase().includes(query.toLowerCase())
    );
    if (region !== "All") list = list.filter((o) => o.region === region);

    const mapping = {
      a2z: (a, b) => a.name.localeCompare(b.name),
      z2a: (a, b) => b.name.localeCompare(a.name),
      country: (a, b) => a.country.localeCompare(b.country),
      region: (a, b) => a.region.localeCompare(b.region),
    };
    const sorter = mapping[sortBy] || mapping.a2z;
    return [...list].sort(sorter);
  }, [query, region, sortBy]);

  const stats = useMemo(() => {
    const countries = new Set(OFFICES.map((o) => o.country)).size;
    const regions = new Set(OFFICES.map((o) => o.region)).size;
    return { offices: OFFICES.length, countries, regions };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Hero / Controls */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-3xl md:text-4xl font-semibold tracking-tight">
                Our Offices & Global Presence
              </motion.h1>
              <p className="mt-2 max-w-2xl text-slate-600">
                Find a GlobalXperts location near you. Meet our teams, book a visit, or get directions — across {stats.countries}+ countries.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <Badge>
                  <Building2 className="mr-2 h-4 w-4" /> {stats.offices} Offices
                </Badge>
                <Badge>
                  <Globe2 className="mr-2 h-4 w-4" /> {stats.countries}+ Countries
                </Badge>
                <Badge>
                  <Clock className="mr-2 h-4 w-4" /> Local business hours
                </Badge>
              </div>
            </div>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search city, country, or address" className="pl-9 w-72" />
              </div>

              <Select options={REGION_OPTIONS} value={region} onChange={setRegion} className="w-36" />
              <Select options={SORT_OPTIONS} value={sortBy} onChange={setSortBy} className="w-40" />
              <div className="inline-flex rounded-xl overflow-hidden border">
                <button type="button" onClick={() => setView("grid")} className={`px-3 py-1 ${view === "grid" ? "bg-blue-600 text-white" : "bg-white text-slate-700"}`}>
                  <Grid className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => setView("list")} className={`px-3 py-1 ${view === "list" ? "bg-blue-600 text-white" : "bg-white text-slate-700"}`}>
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* World map with pins */}
        <div className="mx-auto max-w-7xl px-4 pb-8">
          <div className="relative overflow-hidden rounded-3xl border bg-white shadow-sm">
            <img alt="World map" className="w-full h-[360px] object-cover" src={map} />
            {filtered.map((o) => (
              <motion.button
                key={o.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                title={`${o.city}, ${o.country}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 grid place-items-center h-6 w-6 rounded-full bg-sky-500 ring-4 ring-white text-white shadow-md"
                style={{ left: `${o.mapXY.x}%`, top: `${o.mapXY.y}%` }}
                onClick={() => {
                  // optional: on pin click do something (open details, scroll etc.)
                  const el = document.getElementById(`office-${o.id}`);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              >
                <MapPin className="h-3 w-3" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-4 pb-20 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 xl:col-span-9">
          {view === "grid" ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((o) => (
                <div id={`office-${o.id}`} key={o.id}>
                  <OfficeCard office={o} />
                </div>
              ))}
              {filtered.length === 0 && <EmptyState query={query} />}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((o) => (
                <div id={`office-${o.id}`} key={o.id}>
                  <OfficeRow office={o} />
                </div>
              ))}
              {filtered.length === 0 && <EmptyState query={query} />}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 xl:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Building2 className="h-4 w-4" /> Headquarters
              </div>
              <div className="mt-2 text-xl font-semibold">{OFFICES[0].name}</div>
              <div className="text-slate-600">
                {OFFICES[0].city}, {OFFICES[0].country} {flagEmoji(OFFICES[0].countryCode)}
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <Line icon={<MapPin className="h-4 w-4" />}>{OFFICES[0].address}</Line>
              <Line icon={<Phone className="h-4 w-4" />}>
                <a href={`tel:${OFFICES[0].phone}`} className="hover:underline">
                  {OFFICES[0].phone}
                </a>
              </Line>
              <Line icon={<Mail className="h-4 w-4" />}>
                <a href={`mailto:${OFFICES[0].email}`} className="hover:underline">
                  {OFFICES[0].email}
                </a>
              </Line>
              <Line icon={<Clock className="h-4 w-4" />}>{OFFICES[0].hours}</Line>

              <div className="flex flex-wrap gap-2 pt-1">
                {OFFICES[0].tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter>
              <Button href={mapsLink(OFFICES[0].address)} className="flex-1">
                Get directions <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  await safeCopy(OFFICES[0].address);
                }}
              >
                Copy <Copy className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-sm text-slate-500">Need help?</div>
              <div className="text-lg font-semibold">Talk to a local expert</div>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">Our regional teams can assist with demos, pricing, and implementation.</CardContent>
            <CardFooter>
              <Button className="w-full">Contact Sales <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </CardFooter>
          </Card>
        </aside>
      </section>

      {/* CTA band */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Want to visit an office?</h3>
            <p className="text-slate-600">Book a tour and meet the team in your region.</p>
          </div>
          <div className="flex gap-2">
            <Button>Book a visit</Button>
            <Button variant="outline">View careers</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- Subcomponents ---------------- */
function OfficeCard({ office }) {
  return (
    <Card>
      <CardHeader>
        <div className="text-sm text-slate-500">{office.region}</div>
        <div className="mt-1 text-lg font-semibold">
          {office.city}, {office.country} <span className="ml-1">{flagEmoji(office.countryCode)}</span>
        </div>
        <div className="text-sm text-slate-600">{office.name}</div>
      </CardHeader>

      <CardContent className="space-y-3">
        <Line icon={<MapPin className="h-4 w-4" />}>{office.address}</Line>
        <Line icon={<Phone className="h-4 w-4" />}>
          <a href={`tel:${office.phone}`} className="hover:underline">{office.phone}</a>
        </Line>
        <Line icon={<Mail className="h-4 w-4" />}>
          <a href={`mailto:${office.email}`} className="hover:underline">{office.email}</a>
        </Line>
        <Line icon={<Clock className="h-4 w-4" />}>{office.hours}</Line>

        <div className="flex flex-wrap gap-2 pt-1">
          {office.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button href={mapsLink(office.address)} className="flex-1">
          Directions <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            await safeCopy(office.address);
          }}
        >
          Copy <Copy className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function OfficeRow({ office }) {
  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-sky-600 mt-1" />
            <div>
              <div className="text-sm text-slate-500">{office.region}</div>
              <div className="text-lg font-semibold">
                {office.city}, {office.country}
              </div>
              <div className="text-sm text-slate-600">{office.address}</div>
              <div className="mt-1 flex flex-wrap gap-2">
                {office.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button href={mapsLink(office.address)}>Directions <ExternalLink className="ml-2 h-4 w-4" /></Button>
            <Button variant="outline" onClick={async () => await safeCopy(office.address)}>Copy <Copy className="ml-2 h-4 w-4" /></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Line({ icon, children }) {
  return (
    <div className="flex items-start gap-2 text-sm text-slate-700">
      <span className="mt-0.5 text-slate-500">{icon}</span>
      <span className="leading-6">{children}</span>
    </div>
  );
}

function EmptyState({ query }) {
  return (
    <div className="col-span-full py-12 text-center text-slate-600">
      <div className="text-xl font-semibold">No offices found</div>
      <div className="mt-2">Try a different keyword or clear filters.</div>
      {query && <div className="mt-2 text-sm text-slate-500">Search: "{query}"</div>}
    </div>
  );
}
