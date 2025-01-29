
interface DotProps {
    fill?: string;
    width?: number;
    height?: number;
}
export default function Dot({ fill, width, height }: DotProps) {
    return (
        <svg width={width ? width : 8} height={height ? height : 9} viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Dot">
                <circle id="Ellipse 1" cx="4" cy="4.06592" r="3"
                    fill={fill ? fill : "#34C759"} />
            </g>
        </svg>
    )
}