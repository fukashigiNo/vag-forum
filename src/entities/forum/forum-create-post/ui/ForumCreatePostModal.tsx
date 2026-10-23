"use client"

import { Select } from "@/shared/ui"
import { useEffect, useState } from "react"
import type { IForumCreatePostModalProps } from "../types"

const CATEGORIES = ["Engine", "Electronics", "Maintenance", "Bodywork", "Other"]
const BRANDS = ["Volkswagen", "Audi", "Skoda", "SEAT", "CUPRA", "Porsche"]

export default function ForumCreatePostModal({
  onClose,
  onCreatePost,
}: IForumCreatePostModalProps) {
  const [title, setTitle] = useState("")
  const [enterprise, setEnterprise] = useState("")
  const [description, setDescription] = useState("")
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const vehicle = [brand, model.trim()].filter(Boolean).join(" ")
    onCreatePost({
      title: title.trim(),
      enterprise,
      description: description.trim(),
      ...(vehicle ? { vehicle } : {}),
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        aria-labelledby="create-post-title"
        aria-modal="true"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-950 p-6 shadow-2xl"
        role="dialog"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-400">Forum</p>
            <h2 id="create-post-title" className="mt-1 text-2xl font-semibold text-white">
              Create a post
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Describe the issue so other owners can help.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close form"
            className="rounded-lg px-3 py-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="post-title" className="mb-2 block text-sm font-medium text-zinc-200">
              Title
            </label>
            <input
              id="post-title"
              autoFocus
              required
              minLength={8}
              maxLength={120}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="For example: Golf Mk7 makes a clicking sound when turning"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-500"
            />
            <p className="mt-1 text-right text-xs text-zinc-500">{title.length}/120</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="post-category" className="mb-2 block text-sm font-medium text-zinc-200">
                Category
              </label>
              <Select
                id="post-category"
                required
                value={enterprise}
                values={CATEGORIES}
                onChange={(event) => setEnterprise(event.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="post-brand" className="mb-2 block text-sm font-medium text-zinc-200">
                Brand <span className="text-zinc-500">(optional)</span>
              </label>
              <Select
                id="post-brand"
                value={brand}
                values={BRANDS}
                onChange={(event) => setBrand(event.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="post-model" className="mb-2 block text-sm font-medium text-zinc-200">
              Model <span className="text-zinc-500">(optional)</span>
            </label>
            <input
              id="post-model"
              maxLength={60}
              value={model}
              onChange={(event) => setModel(event.target.value)}
              placeholder="e.g. Golf Mk7 2.0 TSI"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="post-description" className="mb-2 block text-sm font-medium text-zinc-200">
              Description
            </label>
            <textarea
              id="post-description"
              required
              minLength={20}
              maxLength={2000}
              rows={5}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add details about the symptoms, when they started, and what you have already tried..."
              className="w-full resize-y rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-500"
            />
            <p className="mt-1 text-right text-xs text-zinc-500">{description.length}/2000</p>
          </div>

          <div className="flex justify-end gap-3 border-t border-zinc-800 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              Publish post
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
