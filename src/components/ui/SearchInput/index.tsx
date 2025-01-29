import React from "react";
import SearchIconPrimary from "assets/icons/search-lg";

interface SearchPrimaryProps {
    placeholder?: string; // Opsional props
}

const SearchPrimary: React.FC<SearchPrimaryProps> = ({ placeholder = "Search..." }) => {
    return (
        <div className="flex items-center bg-[#1A1A1D] px-[14px] py-[10px] rounded-lg gap-2 w-[400px] text-[#84948D]">
            <SearchIconPrimary />
            <input
                type="text"
                className="bg-[#1A1A1D] w-full text-white outline-none"
                placeholder={placeholder}
            />
        </div>
    );
};

export default SearchPrimary;
