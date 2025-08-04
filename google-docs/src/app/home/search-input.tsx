"use client";
import { Button } from "@/components/ui/button";
import { SearchIcon, XIcon } from "lucide-react";
import React, {  useRef, useState } from "react";
import { useSearchParams } from "@/hooks/use-search-param";
const SearchInput = () => {
const[search,setSearch]=useSearchParams();
  const [value, setvalue] = useState(search);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setvalue(e.target.value);
  };
  const handleClear = () => {
    setvalue("");
    setSearch("");
    inputRef.current?.blur();
  };
  const handleSUbmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  }
  return (
    <div className="flex-1 flex item-center justify-center">
      <form onSubmit={handleSUbmit}
      className="relative max-w-[720px] w-full">
        <input
          value={value}
          onChange={handleChnage}
          ref={inputRef}
          type="text"
          placeholder="Search"
          className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none  shadow-md bg-[#F0F5F8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white "
        ></input>
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
        >
          <SearchIcon />
        </Button>
        {value && (
          <Button
            onChange={handleClear}
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );


};

export default SearchInput;
