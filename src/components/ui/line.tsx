export const Line = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center justify-center pointer-events-none w-full h-5 grow-0 shrink-0 basis-0">
      <div className="grow shrink basis-0 min-w-0">
        <div className="w-full h-[1.25px] bg-border" />
      </div>
      <div className="min-w-0 mx-3 max-w-[70%] text-center text-balance">
        <div className="text-tertiary text-sm leading-5 font-normal">
          {label}
        </div>
      </div>
      <div className="grow shrink basis-0 min-w-0">
        <div className="w-full h-[1.25px] bg-border" />
      </div>
    </div>
  );
};