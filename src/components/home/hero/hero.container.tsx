import { ReactNode } from "react";

export const HeroContainer = ({ children }: {children: ReactNode}) => {

  return (
    <div className="flex w-full h-screen items-center justify-center bg-foreground">
      {children}
    </div>
  );
}