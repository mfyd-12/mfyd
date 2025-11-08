import { cn } from "./cn"

function But({ name, className }) {
  return (
    <button
      className={cn(
        "bg-red-400 p-5 rounded-full text-white",
        className
      )}
    >
      {name}
    </button>
  )
}

export default But
