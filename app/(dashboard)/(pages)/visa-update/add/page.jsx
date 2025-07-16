import dynamic from "next/dynamic";

const VisaView = dynamic(() => import("../../../../../components/visa-page/visa-page"), {
  ssr: false,
});

const Page = () => {
  return (
    <div>
      <VisaView />
    </div>
  );
};

export default Page;
