import { Switch } from "@headlessui/react";

export default function SwitchCourse({ isVideo, setIsVideo }) {
  return (
    <div>
      <Switch
        checked={isVideo}
        onChange={setIsVideo}
        className={`${isVideo ? "bg-teal-900" : "bg-teal-700"}
          relative inline-flex h-[25px] w-[49px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span className="sr-only">Course or video</span>
        <span
          aria-hidden="true"
          className={`${isVideo ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-[21px] w-[21px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
