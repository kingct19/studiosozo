"use client";

import { FiArrowRight } from "react-icons/fi";
import { LitUpButton } from "@/components/lit-up-button";

const Button4 = () => {
  return (
    <LitUpButton href="/contact" className="text-sm font-bold">
      Discuss Your Project
      <FiArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:scale-110" />
    </LitUpButton>
  );
};

export default Button4;
