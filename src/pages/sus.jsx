import { useState } from "react";
import { header } from "../Components/header";
import Footer from "../Components/footer";
import { Select } from "../Components/m";

const sectionsData = [
  {
    name: "Commitment",
    files: [`Commitment`],
  },
  {
    name: "Prospectus",
    files: [`Prospectus`],
  },
  {
    name: "Sustainability-Linked Bond Framework",
    files: [`Sustainability-Linked Bond Framework`, `Verification Assurance Report 2025`],
  },
  {
    name: "Second-party opinion",
    files: [`Second-party opinion`],
  },
  {
    name: "Financial model",
    files: [`Check financial model`],
  },
  {
    name: "Issuance final terms",
    files: [`Final terms AMD`, `Final terms USD(1)`, `Final terms USD(2)`],
  },
];

export default function Sus() {
  const [selected, setSelected] = useState(sectionsData[0].name);
  const [isOpen, setIsOpen] = useState(true);

  const selectSection = (name) => {
    setSelected(name);
    setIsOpen(true);
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const current = sectionsData.find((s) => s.name === selected);

  return (
    <>
      {header()}
      {Select(sectionsData,`Sustainable Development`)}
      <Footer />
    </>
  );
}