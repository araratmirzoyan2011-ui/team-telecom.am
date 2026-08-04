import { useState } from "react";
import { header } from "../Components/header";
import Footer from "../Components/footer";
import { Select } from "../Components/m";

const sectionsData = [
  
  {
    name: "Prospectus",
    files: [],
  },
  {
    name: "Internal legal acts",
    files: [],
  },
  {
    name: "Annual declarations on corporate governance",
    files: [],
  },
  {
    name: "Reports",
    files: [`Check financial model`],
  },
  {
    name: "Board of Directors",
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