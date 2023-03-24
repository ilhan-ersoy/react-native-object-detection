import * as React from "react";
import { Circle, Rect, Path, Svg, Mask, Line, G, Defs, Use, LinearGradient, Stop, ClipPath } from "react-native-svg";

function LoginLogo() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122.15 72.056"
        >
            <Defs>
                <LinearGradient
                    id="a"
                    y2={226.28}
                    gradientUnits="userSpaceOnUse"
                    x2={362.82}
                    y1={241.26}
                    x1={348.14}
                >
                    <Stop offset={0} stopColor="#fff" />
                    <Stop offset={1} stopColor="#fff" stopOpacity={0} />
                </LinearGradient>
            </Defs>
            <Path
                d="M352.96 223.72a11.219 10.958 0 11-.1.01"
                transform="translate(-173.21 -262.83) translate(-381.03 -111.16) scale(1.7416)"
                fill="#0000de"
            />
            <Path
                d="M234.79 331.58c-31.88.03-57.72-31.09-58.23-32.67-1.25-3.82 25.39-32.75 57.26-32.78 31.88-.03 58.69 30.04 58.23 32.67-.18 1.02-24.29 32.21-55.55 32.76"
                transform="translate(-173.21 -262.83)"
                stroke="#fff"
                strokeLinecap="round"
                strokeWidth={3.605}
                fill="none"
            />
            <Path
                d="M352.96 223.72a11.219 10.958 0 11-.1.01"
                transform="translate(-173.21 -262.83) translate(-380.9 -111.41) scale(1.7416)"
                fill="#3d3d3d"
            />
            <Path
                d="M363.19 240.24a11.219 10.958 0 11-10.33-16.51"
                transform="translate(-173.21 -262.83) translate(-254.53 -26.823) scale(1.3845)"
                stroke="#fff"
                strokeLinecap="round"
                strokeWidth={4.605}
                fill="none"
            />
        </Svg>
    )
}
function LoginIcon({width=35, height=35}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M9.991 18.742c4.984 0 9.097-4.113 9.097-9.088 0-4.974-4.122-9.088-9.106-9.088C5.008.566.903 4.68.903 9.654c0 4.975 4.114 9.088 9.088 9.088zm0-6.047c-2.478 0-4.403.888-5.335 1.907a7.26 7.26 0 01-1.925-4.948 7.234 7.234 0 017.251-7.268 7.264 7.264 0 017.287 7.268c0 1.916-.73 3.656-1.934 4.957-.932-1.028-2.857-1.916-5.344-1.916zm0-1.441c1.705.018 3.032-1.441 3.032-3.322 0-1.776-1.335-3.261-3.032-3.261-1.687 0-3.032 1.485-3.023 3.26.009 1.881 1.327 3.314 3.023 3.323z"
                fill="#fff"
            />
        </Svg>
    )
}
function PasswordIcon() {
    return (
        <Svg
            width={35}
            height={35}
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M3.674 16.88h10.643c1.908 0 2.892-.983 2.892-2.864V3.319c0-1.88-.984-2.865-2.892-2.865H3.674C1.775.454.782 1.43.782 3.32v10.697c0 1.88.993 2.865 2.892 2.865zm.114-1.748c-.809 0-1.257-.422-1.257-1.275V3.477c0-.852.448-1.274 1.257-1.274h10.415c.8 0 1.257.422 1.257 1.275v10.38c0 .852-.457 1.274-1.257 1.274H3.788zm2.066-3.173c0 .677.298.984.922.984h4.456c.616 0 .915-.307.915-.984V8.54c0-.598-.238-.905-.739-.958v-.993c0-1.617-.967-2.698-2.408-2.698-1.433 0-2.408 1.08-2.408 2.698v.993c-.492.053-.738.36-.738.958v3.419zm1.775-4.395V6.501c0-.967.545-1.6 1.371-1.6s1.371.633 1.371 1.6v1.063H7.63z"
                fill="#fff"
            />
        </Svg>
    )
}
function MenuIcon({width, height}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 30 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M15 23.25H1.875a1.876 1.876 0 010-3.75H15a1.876 1.876 0 010 3.75zM28.125 4.536H15a1.876 1.876 0 010-3.75h13.125a1.876 1.876 0 010 3.75zM28.125 13.875H1.875a1.876 1.876 0 010-3.75h26.25a1.876 1.876 0 010 3.75z"
                fill="#FAFAFA"
            />
        </Svg>
    )
}
function HomeLogo() {
    return (
        <Svg
            width={20}
            height={19}
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M10 18.742c4.966 0 9.08-4.104 9.08-9.079 0-4.966-4.114-9.079-9.089-9.079-4.966 0-9.07 4.113-9.07 9.08 0 4.974 4.113 9.078 9.079 9.078zm-3.49-4.807V5.392c0-.862.607-1.442 1.504-1.442h3.972c.897 0 1.503.58 1.503 1.442v8.543c0 .86-.606 1.45-1.503 1.45H8.014c-.897 0-1.503-.59-1.503-1.45zm2.435-8.983c0 .114.097.211.211.211h1.688c.123 0 .21-.097.21-.21 0-.141-.087-.23-.21-.23H9.156c-.114 0-.21.089-.21.23zm-1.45 8.508h5.01V5.866h-5.01v7.594zm2.514 1.336a.467.467 0 000-.932.469.469 0 00-.466.466c0 .255.21.466.466.466z"
                fill="#1C1C1E"
            />
        </Svg>
    )
}

function Camera({width, height}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M3.29 14.919h1.635v1.327c0 1.881.993 2.865 2.9 2.865h12.876c1.907 0 2.9-.984 2.9-2.865V8.125c0-1.88-.993-2.865-2.9-2.865H19.63c-.229 0-.413-.009-.563-.035V3.089c0-1.881-.993-2.865-2.891-2.865H3.29C1.383.224.398 1.208.398 3.089v8.965c0 1.89.985 2.865 2.892 2.865zm.114-1.75c-.808 0-1.257-.421-1.257-1.274V3.248c0-.852.449-1.266 1.257-1.266h12.657c.8 0 1.256.414 1.256 1.266v.563c-.36-.247-.747-.37-1.274-.37h-3.56c-.712 0-1.177.22-1.652.695l-.668.659c-.395.387-.606.466-1.266.466H7.825c-1.907 0-2.9.984-2.9 2.865v5.045h-1.52zm4.535 4.184c-.817 0-1.256-.421-1.256-1.265V8.283c0-.852.44-1.265 1.256-1.265h1.433c.73 0 1.195-.15 1.626-.59l.835-.817c.325-.307.58-.413 1.081-.413h2.698c.501 0 .756.106 1.09.413l.826.818c.431.44.897.589 1.635.589h1.424c.817 0 1.257.413 1.257 1.265v7.805c0 .844-.44 1.265-1.257 1.265H7.939zm6.329-1.125a4.162 4.162 0 004.157-4.166 4.152 4.152 0 00-4.157-4.148 4.152 4.152 0 00-4.158 4.149 4.162 4.162 0 004.158 4.165zm5.273-6.09a.994.994 0 001.002-.993c0-.554-.448-1.002-1.002-1.002a.994.994 0 00-.993 1.002c0 .553.44.993.993.993zm-5.273 4.57a2.64 2.64 0 010-5.282 2.64 2.64 0 010 5.282z"
                fill="#fff"
            />
        </Svg>
    )
}


function TabBarMenu({size}) {

    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M16 8H9.143C8.512 8 8 8.512 8 9.143V16c0 .631.512 1.143 1.143 1.143H16c.631 0 1.143-.512 1.143-1.143V9.143C17.143 8.512 16.63 8 16 8zM30.857 8H24c-.631 0-1.143.512-1.143 1.143V16c0 .631.512 1.143 1.143 1.143h6.857C31.488 17.143 32 16.63 32 16V9.143C32 8.512 31.488 8 30.857 8zM30.857 22.857H24c-.631 0-1.143.512-1.143 1.143v6.857c0 .631.512 1.143 1.143 1.143h6.857c.631 0 1.143-.512 1.143-1.143V24c0-.631-.512-1.143-1.143-1.143zM16 22.857H9.143C8.512 22.857 8 23.37 8 24v6.857C8 31.488 8.512 32 9.143 32H16c.631 0 1.143-.512 1.143-1.143V24c0-.631-.512-1.143-1.143-1.143z"
                stroke="#FAFAFA"
                strokeWidth={2.28571}
                strokeLinejoin="round"
            />
        </Svg>
    )

}

function TabBarMenuFocused({size}) {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M16 8H9.143C8.512 8 8 8.512 8 9.143V16c0 .631.512 1.143 1.143 1.143H16c.631 0 1.143-.512 1.143-1.143V9.143C17.143 8.512 16.63 8 16 8zM30.857 8H24c-.631 0-1.143.512-1.143 1.143V16c0 .631.512 1.143 1.143 1.143h6.857C31.488 17.143 32 16.63 32 16V9.143C32 8.512 31.488 8 30.857 8zM30.857 22.857H24c-.631 0-1.143.512-1.143 1.143v6.857c0 .631.512 1.143 1.143 1.143h6.857c.631 0 1.143-.512 1.143-1.143V24c0-.631-.512-1.143-1.143-1.143zM16 22.857H9.143C8.512 22.857 8 23.37 8 24v6.857C8 31.488 8.512 32 9.143 32H16c.631 0 1.143-.512 1.143-1.143V24c0-.631-.512-1.143-1.143-1.143z"
                stroke="gray"
                strokeWidth={2.28571}
                strokeLinejoin="round"
            />
        </Svg>
    )

}

export {
    LoginLogo,
    LoginIcon,
    PasswordIcon,
    MenuIcon,
    HomeLogo,
    Camera,
    TabBarMenu,
    TabBarMenuFocused
}
