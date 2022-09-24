import Link from "next/link";

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default ContentWrapper;
