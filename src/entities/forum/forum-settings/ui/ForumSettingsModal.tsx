"use client"

import { Select } from "@/shared/ui"
import { useAppDispatch } from "@/shared/store/hooks/app-dispatch"
import type { IForumSettingsModal } from "../types"
import { useAppSelector } from "@/shared/store/hooks/app-selector"
import { setBrand, setGeneration, setModel } from "@/shared/store/slices/forum-filter-slice"

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
]

export default function ForumSettingsModal({ setShow }: IForumSettingsModal) {
  const dispatch = useAppDispatch()
  const brand = useAppSelector((state) => state.forumFilter.brand)
  const model = useAppSelector((state) => state.forumFilter.model)
  const generation = useAppSelector((state) => state.forumFilter.generation)

  const activeBrand = VAG_CATALOG_MOCK.find((item) => item.name === brand) ?? VAG_CATALOG_MOCK[0]
  const activeModel = activeBrand.models.find((item) => item.name === model) ?? activeBrand.models[0]
  const activeGeneration = activeModel.generations.find((item) => item.id === generation) ?? activeModel.generations[0]

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextBrand = event.target.value || null
    dispatch(setBrand(nextBrand))

  }

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setModel(event.target.value || null))
    dispatch(setGeneration(null))
  }

  const handleGenerationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setGeneration(event.target.value || null))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={setShow}
    >
      <div
        className="flex h-[72vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-950 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-400">Forum settings</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">Vehicle filter</h2>
          </div>

          <button
            type="button"
            className="rounded-full border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
            onClick={setShow}
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-6">
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">Brand</label>
                  <Select
                    value={brand ?? ""}
                    values={VAG_CATALOG_MOCK.map((item) => item.name)}
                    onChange={handleBrandChange}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-white outline-none ring-0 transition focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-300">Model</label>
                  <Select
                    value={model ?? ""}
                    values={activeBrand.models.map((item) => item.name)}
                    onChange={handleModelChange}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-white outline-none transition focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-300">Generation</label>
                  <Select
                    value={generation ?? ""}
                    values={activeModel.generations.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    onChange={handleGenerationChange}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-white outline-none transition focus:border-blue-500"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Generation details</h3>
                <span className="text-sm text-zinc-400">{activeModel.generations.length} options</span>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {model ? activeModel.generations.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-2xl border p-4 ${
                      generation === item.id
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-zinc-700 bg-zinc-950"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold text-white">{item.name}</span>
                      {item.code ? (
                        <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-zinc-300">
                          {item.code}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-3 text-sm text-zinc-300">{item.years}</p>
                  </div>
                )) 
                : <span className="text-blue-500 text-[20px]">Generations is not picked <br />:-(</span>
                }
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Current selection</p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-zinc-200">
                <span className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1.5">{brand || "Brand is not picked<3"}</span>
                <span className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1.5">{model  || "Model is not picked"}</span>
                <span className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1.5">
                  {generation ?? "Generation is not picked"}
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}