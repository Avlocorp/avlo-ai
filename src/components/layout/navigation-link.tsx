import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { NavLink } from "react-router-dom";

type TProps = {
    href: string;
    label: string;
    Icon?: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
};

const NavigationLink = ({ href, label, Icon }: TProps) => {
    const isSame = location.pathname.split("/")[1] === href;

    return (
        <NavLink
            to={href}
            className={(isActive) => {
                return `flex items-center gap-3 border-primary ${isActive.isActive || isSame
                    ? "border-l-2 bg-[rgba(0,_138,_62,_0.22)]"
                    : ""
                    } px-4 py-2 text-primary transition-all hover:text-primary`;
            }}
        >
            {Icon && (
                <Icon
                    size={20}
                    color={
                        isSame || location.pathname.split("/")[1] === href.split("/")[1]
                            ? "#006d2f"
                            : "#666666"
                    }
                />
            )}
            <span
                className={
                    isSame || location.pathname.split("/")[1] === href.split("/")[1]
                        ? "text-[#006d2f]"
                        : "text-[#666666]"
                }
            >
                {label}
            </span>
        </NavLink>
    );
};

export default NavigationLink;
