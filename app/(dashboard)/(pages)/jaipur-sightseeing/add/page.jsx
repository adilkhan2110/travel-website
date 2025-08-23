'"use client";';
import dynamic from "next/dynamic";

const JaipurSightseeing = dynamic(
  () =>
    import("../../../../../components/Jaipur-Sightseeing/Jaipur-Sightseeing"),
  { ssr: false }
);

const Page = () => {
  return (
    <div>
      <JaipurSightseeing />
    </div>
  );
};

export default Page;
