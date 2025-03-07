import React from "react";
import SearchIconPrimary from "assets/icons/search-lg";

interface SearchPrimaryProps {
    placeholder?: string;
    value?: string; // Value ni prop sifatida qabul qiladi
    onChange: (value: string) => void; // onChange event
}

const SearchPrimary: React.FC<SearchPrimaryProps> = ({ placeholder = "Search...", value, onChange }) => {
    return (
        <div className="flex items-center bg-[#1A1A1D] px-[14px] py-[10px] rounded-lg gap-2 w-[400px] text-[#84948D]">
            <SearchIconPrimary />
            <input
                type="text"
                className="bg-[#1A1A1D] w-full text-white outline-none"
                placeholder={placeholder}
                value={value} // Inputga qiymat beramiz
                onChange={(e) => onChange(e.target.value)} // Harflar yozilganda yangilanadi
            />
        </div>
    );
};

export default SearchPrimary;
