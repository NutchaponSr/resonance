import { Button } from "@/components/ui/button";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-foreground min-h-0 grow leading-normal h-screen">
      <div className="flex flex-row w-full h-full max-h-screen">
        <div className="flex flex-col justify-between grow shrink basis-0">
          <div className="flex flex-col items-center justify-center grow shrink basis-0">
            {children}
          </div>
          <div className="flex justify-center items-center py-4">
            <div className="contents">
              {/* TODO: Localization switcher */}
              <Button variant="ghost" size="sm">
                Language: English (US)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};