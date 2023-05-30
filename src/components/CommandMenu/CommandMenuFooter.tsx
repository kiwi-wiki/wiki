export function CommandMenuFooter() {
  return (
    <div className="p-2 flex items-center text-[11px] dark:text-gray-400 space-x-4 justify-end">
      <div className="space-x-2">
        <span>Back to previous</span>
        <span className="kbd">Backspace</span>
      </div>
      <div className="space-x-2">
        <span>Select</span>
        <span className="kbd">Enter</span>
      </div>
    </div>
  );
}
