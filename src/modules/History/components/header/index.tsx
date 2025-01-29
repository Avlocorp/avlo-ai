import { DatePicker } from "antd"
import SearchPrimary from "components/ui/SearchInput"
import "./style.css"
import CalendarIcon from "assets/icons/calendar"
import FilterLineIcon from "assets/icons/filter-lines";
const { RangePicker } = DatePicker;

export function HeaderHistory() {
    return (
        <div className="mx-8 ">
            <div>
                <p className="text-[30px] text-white">History</p>
                <p className="text-base text-white">View your team’s trades and transactions.</p>
            </div>
            <div className=" my-6 flex items-center justify-between bg-[#343436] px-4  py-3 rounded-xl ">
                <SearchPrimary placeholder={"Search for audios"} />
                <div className="flex items-center gap-3 ">
                    <RangePicker
                        prefix={<CalendarIcon />}
                        bordered={false}
                        suffixIcon={null}
                        allowClear={false}
                        separator={"-"} // Remove separator

                        className="py-[10px] px-4 bg-[#1A1A1D] text-sm text-white placeholder-white hover:bg-[#393941]"
                        placeholder={["   Jan 6, 2022", "  Jan 13, 2022"]}
                    />
                    <button className="text-white bg-[#1A1A1D] gap-2 flex items-center px-4 py-[10px] rounded-lg hover:bg-[#393941]">
                        <FilterLineIcon />
                        <span>Filters</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

