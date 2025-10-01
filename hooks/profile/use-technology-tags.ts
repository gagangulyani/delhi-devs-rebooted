import { useState } from "react";

export function useTechnologyTags(onTagsChange?: (tags: string[]) => void) {
  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);

  const addTechnology = (tech: string) => {
    const trimmedTech = tech.trim();
    if (trimmedTech && !technologies.includes(trimmedTech)) {
      const newTags = [...technologies, trimmedTech];
      setTechnologies(newTags);
      onTagsChange?.(newTags);
      return true;
    }
    return false;
  };

  const removeTechnology = (techToRemove: string) => {
    const updatedTechs = technologies.filter(tech => tech !== techToRemove);
    setTechnologies(updatedTechs);
    onTagsChange?.(updatedTechs);
  };

  const handleTechInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTechInput(value);

    if (value.includes(',')) {
      const newTech = value.replace(',', '').trim();
      if (addTechnology(newTech)) {
        setTechInput("");
      } else {
        setTechInput("");
      }
    }
  };

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && techInput === '' && technologies.length > 0) {
      const lastTech = technologies[technologies.length - 1];
      removeTechnology(lastTech);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedInput = techInput.trim();
      if (addTechnology(trimmedInput)) {
        setTechInput("");
      }
    }
  };

  const resetTags = () => {
    setTechnologies([]);
    setTechInput("");
  };

  return {
    techInput,
    technologies,
    setTechInput,
    setTechnologies,
    addTechnology,
    removeTechnology,
    handleTechInputChange,
    handleTechKeyDown,
    resetTags,
  };
}
