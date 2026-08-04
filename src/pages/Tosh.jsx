import { header } from "../Components/header";
import Footer from "../Components/footer";
import { Select } from "../Components/m1";

const sectionsData = [
  { glname: "Prospectus", name: "", files: "" },
  { glname: "Internal legal acts", name: "", files: "" },
  { glname: "Annual declarations on corporate governance", name: "", files: "" },
  {
    glname: "Reports",
    name: "Financial reports",
    files: [
      `Financial report of Telecom Armenia OJSC for the 1st quarter of 2026`,
      `Annual Financial Report of "Telecom Armenia" OJSC of the 2025`,
      `Financial report of Telecom Armenia OJSC for the 4nd quarter of 2025`,
      `Financial report of Telecom Armenia OJSC for the 3rd quarter of 2025`,
      `Financial report of Telecom Armenia OJSC for the 2nd quarter of 2025`,
      `Financial report of Telecom Armenia OJSC for the 1st quarter of 2025`,
      `Annual Financial Report of "Telecom Armenia" OJSC of the 2024`,
      `Information on the publication of the 2024 annual financial report of Telecom Armenia OJSC`,
    ],
  },
  {
    glname: "Board of Directors",
    name: "Company management",
    name2: "Executive Director",
    name3: "Inspection",
    files: [`Alexandr Yesayan`, `Hayk Yesayan`, `Aram Barseghyan`, `Artavazd Minasyan`, `Albert Toneyan`],
    files2: [`Hayk Yesayan`],
    files3: [`Vahan Manukyan`],
  },
];

export default function Tosh() {
  return (
    <>
      {header()}
      <Select sectionsData={sectionsData} title="To shareholders" />
      <Footer />
    </>
  );
}