import { header } from "../Components/header";
import Footer from "../Components/footer";
import { Select } from "../Components/m1";

const sectionsData = [
  { glname: "General terms and conditions", name: "General terms and conditions", files: ["General terms and conditions"] },
  { glname: "Archive", name: "Archive general and conditions", files: [`General terms and conditions, from 2023 December 25 to 2024 October 1`,`General terms and conditions, from 2024 October 1 to 2025 October 31`,`General terms and conditions, from 2025 November 1 to 2025 June 30`] }
];

export default function TermandCon() {
  return (
    <>
      {header()}
      <Select sectionsData={sectionsData} title="Terms and conditions" />
      <Footer />
    </>
  );
}