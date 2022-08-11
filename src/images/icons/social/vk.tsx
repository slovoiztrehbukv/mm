import React from "react";
import { IconProps } from "../../../interfaces";

export const VKIcon : React.FC = (props: IconProps) => {

    const fill = props.fill ? props.fill : '#fff'
    const px = props.px ? props.px : 32

    return (
        <svg
            width={`${px}px`}
            height={`${px}px`}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            fill={fill}
        >
            <path d="M60,51.1h-8.4c-1,0-2-0.6-2.6-1.4l-0.8-1.3c-0.5-0.6-5.1-5.9-7.9-7.6c-1.1-0.6-1.5-0.5-1.5-0.5c0,0-0.1,0.3-0.1,0.4v5.3    c0,2.8-2.3,5-5,5h-2c-0.5,0-11.7-0.2-20.6-13.5c-7-10.4-9.3-17.2-10.1-21.1c-0.2-0.9,0.1-1.8,0.6-2.5c0.6-0.7,1.4-1.1,2.3-1.1h7.1    c1.3,0,2.4,0.8,2.8,2.1c0.8,2.3,2.8,8.2,5.2,12c3.5,5.8,4.9,6.3,5.3,6.3c0.3-0.5,0.2-2.5,0.2-3.8c0-0.6,0-1.1,0-1.7    c0-0.4,0-0.9,0-1.4c0-2.5,0.1-5.9-0.9-7.5l-2-2.9c-0.4-0.6-0.5-1.4-0.1-2.1c0.3-0.7,1-1.1,1.8-1.1h11.4c1.7,0,3,1.4,3,3v14.4    c0,0.1,0.1,0.2,0.1,0.2c0,0,0.4,0,1.5-1c2.3-2.3,5.2-6.6,8.1-12.5l1-2.3c0.5-1.1,1.6-1.8,2.8-1.8h7.4c1,0,1.9,0.5,2.5,1.3    c0.6,0.8,0.7,1.9,0.3,2.8l-0.8,2.1c0,0,0,0.1,0,0.1c-0.1,0.2-2.8,5.5-5.6,9.4c-2.2,3-3.1,4.4-2.9,4.9c0.2,0.3,1.5,1.8,2.8,3    c2.4,2.5,5.4,5.7,6.5,7.8c0.5,0.9,1,1.7,1.3,2.4c0.5,0.9,0.5,2-0.1,3C62,50.6,61.1,51.1,60,51.1z M39,38.3c0.7,0,1.5,0.3,2.4,0.8    c3.3,1.9,8.3,7.8,8.5,8.1c0,0,0.1,0.1,0.1,0.1l0.8,1.3c0.2,0.3,0.5,0.5,0.9,0.5H60c0.5,0,0.8-0.3,0.9-0.5c0.1-0.1,0.3-0.5,0-1    c-0.4-0.7-0.8-1.5-1.3-2.4c-1-1.8-4-5-6.2-7.4c-2.2-2.4-3-3.2-3.2-3.7c-0.6-1.5,0.3-2.7,3.2-6.7c2.6-3.6,5.1-8.5,5.4-9.1l0.8-2.1    c0.1-0.3,0.1-0.7-0.1-0.9c-0.2-0.3-0.5-0.4-0.8-0.4h-7.4c-0.4,0-0.8,0.2-0.9,0.6l-1,2.4c-2.2,4.3-5.4,10-8.5,13.1    c-1.3,1.3-2.5,1.7-3.5,1.4c-1.2-0.4-1.5-1.7-1.5-1.8c0-0.1,0-0.1,0-0.2V15.9c0-0.6-0.5-1-1-1H23.3l2,2.9c1.3,2.1,1.3,5.8,1.2,8.7    c0,0.5,0,0.9,0,1.3c0,0.5,0,1.1,0,1.6c0.1,2.8,0.1,5.4-1.7,5.8c-2,0.4-4.1-1.7-7.5-7.2c-2.3-3.9-4.3-9.4-5.3-12.4    c-0.1-0.4-0.5-0.7-1-0.7H4c-0.3,0-0.6,0.1-0.8,0.4C3,15.5,3,15.8,3,16.1c0.7,3.7,3,10.2,9.8,20.4c8.3,12.4,18.8,12.6,18.9,12.6h2    c1.7,0,3-1.4,3-3v-5.3c0-0.1,0-1.5,1.1-2.2C38.2,38.4,38.6,38.3,39,38.3z"/>
        </svg>
    )
}