import React from "react";
import { IconProps } from "../../interfaces";

export const PhoneIcon : React.FC = function (props: IconProps) {

    const fill = props.fill ? props.fill : '#fff'
    const px = props.px ? props.px : 32

    return (
        <svg
            width={`${px}px`}
            height={`${px}px`}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill={fill}
        >
            <path d="M27.36,6.15,25.09,3.88a3,3,0,0,0-4.54.35l-2.21,3a3,3,0,0,0-.44,2.66l.13.38c.27.89.62,2,.84,2.74a1,1,0,0,1-.05.7,12.44,12.44,0,0,1-2.08,3,1,1,0,0,0,0,1.42,1,1,0,0,0,1.41,0,14.14,14.14,0,0,0,2.46-3.51,2.92,2.92,0,0,0,.17-2.17c-.21-.72-.57-1.86-.85-2.75l-.12-.39A1,1,0,0,1,20,8.44l2.21-3a1,1,0,0,1,1.51-.12l.67.67-2,3.1a1,1,0,0,0,.84,1.54,1,1,0,0,0,.84-.45l1.77-2.74.16.15a2.59,2.59,0,0,1,.68,1.88c0,1.76-1.19,5-6.73,10.44-5.81,5.7-10.42,8-12.33,6.07L5.29,23.68A1,1,0,0,1,5,22.9a1,1,0,0,1,.41-.73l3-2.21a1,1,0,0,1,.88-.15l1.89.59L9.05,21.91a1,1,0,0,0-.24,1.4,1,1,0,0,0,.82.42,1,1,0,0,0,.57-.18L14,20.88a1,1,0,0,0,.25-1.4,1,1,0,0,0-.53-.36v0L9.92,17.9a3,3,0,0,0-2.66.44l-3,2.21a3,3,0,0,0-.35,4.54l2.27,2.28A4.31,4.31,0,0,0,9.3,28.63c2.52,0,6.32-1.75,12-7.32,4.84-4.75,7.31-8.74,7.33-11.86A4.46,4.46,0,0,0,27.36,6.15Z" />
        </svg>
    );
}