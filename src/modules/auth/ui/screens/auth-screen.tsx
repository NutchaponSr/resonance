interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const AuthScreen = ({ 
  title, 
  description, 
  children 
}: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="font-bold mb-6 text-center leading-[1.1] max-w-90 flex flex-col items-center">
        <div className="flex flex-col text-center w-90">
          <h1 className="font-semibold text-2xl text-wrap m-0">
            {title}
          </h1>
          {description && (
            <h2 className="font-medium text-base text-wrap m-0 text-tertiary">
              {description}
            </h2>
          )}
        </div>
      </div>
      <div className="max-w-90 w-full flex flex-col items-center mb-[4vh]">
        <div className="flex w-full flex-col">
          {children}
        </div>
        <div className="w-full mb-0 text-xs leading-4 text-secondary text-center text-balance mt-7">
          By continuing, you acknowledge that you understand and agree to the Terms & Conditions
        </div>
      </div>
    </div>
  );
};