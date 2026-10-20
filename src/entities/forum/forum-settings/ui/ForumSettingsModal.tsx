import { Select } from "@/shared/ui"
import type { IForumSettingsModal } from "../types"


export default function ForumSettingsModal({
    setShow
}: IForumSettingsModal) {
  return (
    <div 
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    onClick={setShow}
    >
      
      <div
         className="w-full max-w-md rounded-2xl bg-zinc-900 p-6 shadow-xl"
         onClick={e => e.stopPropagation()}
        >
      </div>

    </div>
  )
}