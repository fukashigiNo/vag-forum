"use client"

import { Select } from "@/shared/ui"
import { useAppDispatch } from "@/shared/store/hooks/app-dispatch"
import type { IForumSettingsModal } from "../types"
import { useAppSelector } from "@/shared/store/hooks/app-selector"
import { setBrand } from "@/shared/store/slices/forum-filter-slice"

const VAG_CATALOG_MOCK = [
  {
    id: "audi",
    name: "Audi",
    models: [
      {
        id: "a3",
        name: "A3 / S3 / RS3",
        generations: [
          { id: "8v", name: "8V", years: "2012 — 2020", code: "MQB" },
          { id: "8y", name: "8Y", years: "2020 — н.в.", code: "MQB evo" },
        ],
      },
      {
        id: "a4",
        name: "A4 / S4 / RS4",
        generations: [
          { id: "b8", name: "B8", years: "2007 — 2015", code: "MLB" },
          { id: "b9", name: "B9 / B9.5", years: "2015 — 2024", code: "MLB evo" },
        ],
      },
      {
        id: "a6",
        name: "A6 / S6 / RS6",
        generations: [
          { id: "c7", name: "C7", years: "2011 — 2018", code: "MLB" },
          { id: "c8", name: "C8", years: "2018 — н.в.", code: "MLB evo" },
        ],
      },
      {
        id: "q5",
        name: "Q5 / SQ5",
        generations: [
          { id: "8r", name: "8R", years: "2008 — 2017", code: "MLB" },
          { id: "fy", name: "FY", years: "2017 — н.в.", code: "MLB evo" },
        ],
      },
      {
        id: "q7",
        name: "Q7 / SQ7",
        generations: [
          { id: "4l", name: "4L", years: "2005 — 2015", code: "PL71" },
          { id: "4m", name: "4M", years: "2015 — н.в.", code: "MLB evo" },
        ],
      },
    ],
  },
  {
    id: "volkswagen",
    name: "Volkswagen",
    models: [
      {
        id: "golf",
        name: "Golf / GTI / R",
        generations: [
          { id: "mk6", name: "Mk6", years: "2008 — 2013", code: "PQ35" },
          { id: "mk7", name: "Mk7 / Mk7.5", years: "2012 — 2020", code: "MQB" },
          { id: "mk8", name: "Mk8 / Mk8.5", years: "2019 — н.в.", code: "MQB evo" },
        ],
      },
      {
        id: "passat",
        name: "Passat",
        generations: [
          { id: "b6", name: "B6", years: "2005 — 2010", code: "PQ46" },
          { id: "b7", name: "B7", years: "2010 — 2015", code: "PQ46" },
          { id: "b8", name: "B8", years: "2014 — 2023", code: "MQB" },
        ],
      },
      {
        id: "tiguan",
        name: "Tiguan",
        generations: [
          { id: "5n", name: "I (5N)", years: "2007 — 2016", code: "PQ35" },
          { id: "ad1", name: "II (AD1 / Allspace)", years: "2016 — 2024", code: "MQB" },
          { id: "ct1", name: "III (CT1)", years: "2023 — н.в.", code: "MQB evo" },
        ],
      },
      {
        id: "touareg",
        name: "Touareg",
        generations: [
          { id: "7l", name: "I (7L)", years: "2002 — 2010", code: "PL71" },
          { id: "7p", name: "II (7P)", years: "2010 — 2018", code: "PL72" },
          { id: "cr", name: "III (CR)", years: "2018 — н.в.", code: "MLB evo" },
        ],
      },
    ],
  },
  {
    id: "porsche",
    name: "Porsche",
    models: [
      {
        id: "911",
        name: "911 (Carrera / Turbo / GT3)",
        generations: [
          { id: "997", name: "997", years: "2004 — 2012" },
          { id: "991", name: "991", years: "2011 — 2019" },
          { id: "992", name: "992", years: "2018 — н.в." },
        ],
      },
      {
        id: "cayenne",
        name: "Cayenne",
        generations: [
          { id: "955-957", name: "I (955 / 957)", years: "2002 — 2010", code: "PL71" },
          { id: "958", name: "II (958)", years: "2010 — 2017", code: "PL72" },
          { id: "9ya", name: "III (9YA / Coupe)", years: "2017 — н.в.", code: "MLB evo" },
        ],
      },
      {
        id: "macan",
        name: "Macan",
        generations: [
          { id: "95b-1", name: "I (95B)", years: "2014 — 2018", code: "MLB" },
          { id: "95b-2", name: "I Facelift", years: "2018 — 2024", code: "MLB" },
        ],
      },
      {
        id: "panamera",
        name: "Panamera",
        generations: [
          { id: "970", name: "I (970)", years: "2009 — 2016" },
          { id: "971", name: "II (971)", years: "2016 — 2023", code: "MSB" },
          { id: "972", name: "III (972)", years: "2023 — н.в.", code: "MSB" },
        ],
      },
    ],
  },
];

export default function ForumSettingsModal({
    setShow
}: IForumSettingsModal) {
  const dispatch = useAppDispatch()
  const brand = useAppSelector(state => state.forumFilter.brand)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={setShow}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-zinc-900 p-6 shadow-xl"
        onClick={event => event.stopPropagation()}
      >
        <Select
          value={brand}
          values={VAG_CATALOG_MOCK.map(item => item.name)}
          onChange={event => dispatch(setBrand(event.target.value || null))}
        />
      </div>
    </div>
  )
}