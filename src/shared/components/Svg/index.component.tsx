interface IIconPropsComponent {
    width?: string;
    height?: string;
    className?: string;
    fill?: string;
}

export const FacebookIcon = ({ width = '100%', height = '100%', className, fill = 'none' }: IIconPropsComponent) => (
    <svg
        className={className}
        style={{ pointerEvents: 'none', display: 'block', width, height, fill }}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="#1877F2"
            d="M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z"
        />
        <path
            fill="#ffffff"
            d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z"
        />
    </svg>
);

export const GoogleIcon = ({ width = '100%', height = '100%', className, fill = 'none' }: IIconPropsComponent) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className={className}
        style={{ pointerEvents: 'none', display: 'block', width, height, fill }}
    >
        <defs>
            <path
                id="a"
                d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
            />
        </defs>
        <clipPath id="b">
            <use href="#a" overflow="visible" />
        </clipPath>
        <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
        <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
        <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
        <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
    </svg>
);

export const UploadIcon = ({ width = '100%', height = '100%', className }: IIconPropsComponent) => (
    <svg width={width} height={height} className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.5 17L12.5 4M12.5 4L18 8.78947M12.5 4L7 8.78947"
            stroke="#909090"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path d="M6 21H19" stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const MainLogo = ({
    width = '90%',
    height = '100%',
    className,
    fillIcon = 'blue',
}: IIconPropsComponent & { fillIcon: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={width}
        height={height}
        className={className}
        zoomAndPan="magnify"
        viewBox="0 0 375 225"
        preserveAspectRatio="xMidYMid meet"
        version="1.0"
    >
        <defs>
            <g />
            <clipPath id="50bd2085df">
                <path
                    d="M 58.972656 55.871094 L 133.222656 55.871094 L 133.222656 110.621094 L 58.972656 110.621094 Z M 58.972656 55.871094 "
                    clip-rule="nonzero"
                />
            </clipPath>
            <clipPath id="586431cf69">
                <path d="M 84.601562 89 L 87 89 L 87 92 L 84.601562 92 Z M 84.601562 89 " clip-rule="nonzero" />
            </clipPath>
            <clipPath id="1868844a7c">
                <path d="M 95 87.6875 L 97 87.6875 L 97 90 L 95 90 Z M 95 87.6875 " clip-rule="nonzero" />
            </clipPath>
            <clipPath id="8b9a204bab">
                <path d="M 95 107 L 97 107 L 97 109.4375 L 95 109.4375 Z M 95 107 " clip-rule="nonzero" />
            </clipPath>
            <clipPath id="76bf453818">
                <path d="M 105 89 L 107.101562 89 L 107.101562 92 L 105 92 Z M 105 89 " clip-rule="nonzero" />
            </clipPath>
            <clipPath id="1027e25eca">
                <path d="M 84.601562 105 L 87 105 L 87 108 L 84.601562 108 Z M 84.601562 105 " clip-rule="nonzero" />
            </clipPath>
            <clipPath id="5609f8e066">
                <path d="M 105 105 L 107.101562 105 L 107.101562 108 L 105 108 Z M 105 105 " clip-rule="nonzero" />
            </clipPath>
            <clipPath id="00567abfe4">
                <path d="M 84.601562 97 L 86 97 L 86 104 L 84.601562 104 Z M 84.601562 97 " clip-rule="nonzero" />
            </clipPath>
        </defs>
        <g fill="#00bf63" fill-opacity="1">
            <g transform="translate(0.00000375, 110.187062)">
                <g>
                    <path d="M 12.183594 0.113281 C 16.707031 0.113281 19 -2.179688 19 -6.707031 L 19 -44.59375 L 34.648438 -44.59375 C 39.175781 -44.59375 41.464844 -42.304688 41.464844 -37.722656 L 41.464844 -6.707031 C 41.464844 -2.179688 43.699219 0.113281 48.171875 0.113281 C 52.640625 0.113281 54.875 -2.125 54.875 -6.59375 L 54.875 -37.441406 C 54.875 -51.132812 48.171875 -58.007812 34.757812 -58.007812 L 19 -58.007812 L 19 -69.183594 C 19 -73.710938 16.765625 -76 12.292969 -76 C 7.824219 -76 5.589844 -73.765625 5.589844 -69.351562 L 5.589844 -6.707031 C 5.589844 -2.179688 7.769531 0.113281 12.183594 0.113281 Z M 12.183594 0.113281 " />
                </g>
            </g>
        </g>
        <g fill="#00bf63" fill-opacity="1">
            <g transform="translate(58.738881, 110.187062)">
                <g />
            </g>
        </g>
        <g fill="#00bf63" fill-opacity="1">
            <g transform="translate(70.99269, 110.187062)">
                <g />
            </g>
        </g>
        <g fill="#00bf63" fill-opacity="1">
            <g transform="translate(83.246498, 110.187062)">
                <g />
            </g>
        </g>
        <g fill="#00bf63" fill-opacity="1">
            <g transform="translate(95.500306, 110.187062)">
                <g />
            </g>
        </g>
        <g fill="#00bf63" fill-opacity="1">
            <g transform="translate(107.754115, 110.187062)">
                <g />
            </g>
        </g>
        <g fill="#00bf63" fill-opacity="1">
            <g transform="translate(120.007925, 110.187062)">
                <g />
            </g>
        </g>
        <g fill="#00bf63" fill-opacity="1">
            <g transform="translate(132.258372, 110.187062)">
                <g>
                    <path d="M 50.292969 -40.234375 L 50.292969 -51.355469 C 50.292969 -55.769531 48.058594 -57.949219 43.589844 -57.949219 L 25.707031 -58.007812 C 12.292969 -58.007812 5.589844 -51.132812 5.589844 -37.441406 L 5.589844 -6.59375 C 5.589844 -2.125 7.824219 0.113281 12.292969 0.113281 C 16.765625 0.113281 19 -2.179688 19 -6.707031 L 19 -37.722656 C 19 -42.304688 21.292969 -44.59375 25.816406 -44.59375 L 36.882812 -44.59375 L 36.882812 -40.234375 C 36.882812 -35.710938 39.175781 -33.417969 43.699219 -33.417969 C 48.113281 -33.417969 50.292969 -35.710938 50.292969 -40.234375 Z M 50.292969 -40.234375 " />
                </g>
            </g>
        </g>
        <g fill="#00bf63" fill-opacity="1">
            <g transform="translate(186.479984, 110.187062)">
                <g>
                    <path d="M 12.40625 -58.117188 C 7.878906 -58.007812 5.589844 -55.769531 5.589844 -51.355469 L 5.589844 -6.761719 C 5.589844 -2.234375 7.769531 0 12.183594 0 C 16.707031 0 19 -2.234375 19 -6.761719 L 19 -44.59375 L 30.066406 -44.59375 C 34.589844 -44.59375 36.882812 -42.304688 36.882812 -37.722656 L 36.882812 -6.707031 C 36.882812 -2.179688 39.117188 0.113281 43.589844 0.113281 C 48.058594 0.113281 50.292969 -2.125 50.292969 -6.59375 L 50.183594 -44.59375 L 61.359375 -44.59375 C 65.886719 -44.59375 68.175781 -42.304688 68.175781 -37.722656 L 68.175781 -6.707031 C 68.175781 -2.179688 70.414062 0.113281 74.882812 0.113281 C 79.355469 0.113281 81.589844 -2.125 81.589844 -6.59375 L 81.589844 -37.441406 C 81.589844 -51.132812 74.882812 -58.007812 61.472656 -58.007812 Z M 12.40625 -58.117188 " />
                </g>
            </g>
        </g>
        <g fill="#00bf63" fill-opacity="1">
            <g transform="translate(271.939937, 110.187062)">
                <g>
                    <path d="M 5.589844 -37.886719 L 5.589844 -20.117188 C 5.589844 -6.707031 12.238281 0 25.59375 0 L 34.757812 0 C 48.171875 0 54.875 -6.875 54.875 -20.566406 L 54.875 -37.945312 C 54.875 -51.414062 48.113281 -58.117188 34.648438 -58.117188 L 25.761719 -58.117188 C 12.292969 -58.117188 5.589844 -51.355469 5.589844 -37.886719 Z M 34.648438 -44.59375 C 39.175781 -44.59375 41.464844 -42.414062 41.464844 -38.113281 L 41.464844 -20.285156 C 41.464844 -15.703125 39.175781 -13.410156 34.648438 -13.410156 L 25.59375 -13.410156 C 21.179688 -13.410156 19 -15.703125 19 -20.285156 L 19 -37.945312 C 19 -42.359375 21.179688 -44.59375 25.59375 -44.59375 Z M 34.648438 -44.59375 " />
                </g>
            </g>
        </g>
        <g fill="#00bf63" fill-opacity="1">
            <g transform="translate(330.688029, 110.187062)">
                <g>
                    <path d="M 12.183594 0 C 16.707031 0 19 -2.234375 19 -6.761719 L 19 -44.59375 L 34.648438 -44.59375 C 39.175781 -44.59375 41.464844 -42.304688 41.464844 -37.722656 L 41.464844 -6.707031 C 41.464844 -2.179688 43.699219 0.113281 48.171875 0.113281 C 52.640625 0.113281 54.875 -2.125 54.875 -6.59375 L 54.875 -37.441406 C 54.875 -51.132812 48.171875 -58.007812 34.757812 -58.007812 L 12.292969 -57.949219 C 7.824219 -57.949219 5.589844 -55.769531 5.589844 -51.355469 L 5.589844 -6.761719 C 5.589844 -2.234375 7.769531 0 12.183594 0 Z M 12.183594 0 " />
                </g>
            </g>
        </g>
        <g fill="#00bf63" fill-opacity="1">
            <g transform="translate(389.436121, 110.187062)">
                <g>
                    <path d="M 48.28125 -53.648438 C 43.757812 -53.648438 41.464844 -51.414062 41.464844 -46.886719 L 41.464844 -8.941406 L 25.816406 -8.941406 C 21.292969 -8.941406 19 -11.234375 19 -15.871094 L 19 -46.886719 C 19 -51.414062 16.765625 -53.648438 12.292969 -53.648438 C 7.824219 -53.648438 5.589844 -51.414062 5.589844 -46.941406 L 5.589844 -16.09375 C 5.589844 -2.402344 12.292969 4.46875 25.707031 4.46875 L 41.464844 4.46875 C 41.464844 7.601562 39.84375 9.164062 36.660156 9.109375 L 20.675781 9.109375 C 16.375 9.109375 14.25 11.34375 14.304688 15.757812 C 14.363281 20.230469 16.484375 22.464844 20.789062 22.464844 L 34.757812 22.464844 C 48.171875 22.464844 54.875 15.871094 54.875 2.683594 L 54.875 -46.886719 C 54.875 -51.414062 52.699219 -53.648438 48.28125 -53.648438 Z M 48.28125 -53.648438 " />
                </g>
            </g>
        </g>
        <g clip-path="url(#50bd2085df)">
            <path
                style={{ fill: fillIcon }}
                d="M 125.269531 85.457031 L 125.269531 84.910156 C 125.269531 77.179688 122.230469 69.898438 116.71875 64.429688 C 111.210938 58.957031 103.882812 55.9375 96.097656 55.9375 C 80.003906 55.9375 66.925781 68.949219 66.925781 84.910156 L 66.925781 85.457031 C 62.253906 87.429688 58.972656 92.023438 58.972656 97.375 C 58.972656 104.507812 64.816406 110.3125 72.003906 110.3125 L 78.46875 110.3125 C 80.457031 110.3125 82.0625 108.71875 82.0625 106.746094 L 82.0625 88 C 82.0625 86.050781 80.457031 84.433594 78.46875 84.433594 L 74.132812 84.433594 C 74.398438 72.613281 84.144531 63.074219 96.097656 63.074219 C 101.964844 63.074219 107.476562 65.355469 111.644531 69.472656 C 115.691406 73.492188 117.941406 78.796875 118.0625 84.433594 L 113.726562 84.433594 C 111.738281 84.433594 110.132812 86.050781 110.132812 88 L 110.132812 106.746094 C 110.132812 108.71875 111.738281 110.3125 113.726562 110.3125 L 120.191406 110.3125 C 127.378906 110.3125 133.222656 104.507812 133.222656 97.375 C 133.222656 92.023438 129.941406 87.429688 125.269531 85.457031 Z M 125.269531 85.457031 "
                fill-opacity="1"
                fill-rule="nonzero"
            />
        </g>
        <g clip-path="url(#586431cf69)">
            <path
                style={{ fill: fillIcon }}
                d="M 86.007812 90.046875 L 85.832031 90.046875 L 85.832031 89.867188 C 85.832031 89.667969 85.671875 89.503906 85.480469 89.503906 C 85.285156 89.503906 85.128906 89.667969 85.128906 89.867188 L 85.128906 90.046875 L 84.953125 90.046875 C 84.757812 90.046875 84.601562 90.210938 84.601562 90.410156 C 84.601562 90.609375 84.757812 90.773438 84.953125 90.773438 L 85.128906 90.773438 L 85.128906 90.953125 C 85.128906 91.152344 85.285156 91.316406 85.480469 91.316406 C 85.671875 91.316406 85.832031 91.152344 85.832031 90.953125 L 85.832031 90.773438 L 86.007812 90.773438 C 86.199219 90.773438 86.359375 90.609375 86.359375 90.410156 C 86.359375 90.210938 86.199219 90.046875 86.007812 90.046875 Z M 86.007812 90.046875 "
                fill-opacity="1"
                fill-rule="nonzero"
            />
        </g>
        <g clip-path="url(#1868844a7c)">
            <path
                style={{ fill: fillIcon }}
                d="M 96.554688 88.234375 L 96.378906 88.234375 L 96.378906 88.054688 C 96.378906 87.855469 96.21875 87.691406 96.027344 87.691406 C 95.832031 87.691406 95.675781 87.855469 95.675781 88.054688 L 95.675781 88.234375 L 95.5 88.234375 C 95.304688 88.234375 95.148438 88.398438 95.148438 88.597656 C 95.148438 88.796875 95.304688 88.960938 95.5 88.960938 L 95.675781 88.960938 L 95.675781 89.140625 C 95.675781 89.339844 95.832031 89.503906 96.027344 89.503906 C 96.21875 89.503906 96.378906 89.339844 96.378906 89.140625 L 96.378906 88.960938 L 96.554688 88.960938 C 96.746094 88.960938 96.90625 88.796875 96.90625 88.597656 C 96.90625 88.398438 96.746094 88.234375 96.554688 88.234375 Z M 96.554688 88.234375 "
                fill-opacity="1"
                fill-rule="nonzero"
            />
        </g>
        <g clip-path="url(#8b9a204bab)">
            <path
                style={{ fill: fillIcon }}
                d="M 96.554688 108.164062 L 96.378906 108.164062 L 96.378906 107.984375 C 96.378906 107.785156 96.21875 107.621094 96.027344 107.621094 C 95.832031 107.621094 95.675781 107.785156 95.675781 107.984375 L 95.675781 108.164062 L 95.5 108.164062 C 95.304688 108.164062 95.148438 108.328125 95.148438 108.527344 C 95.148438 108.726562 95.304688 108.890625 95.5 108.890625 L 95.675781 108.890625 L 95.675781 109.070312 C 95.675781 109.269531 95.832031 109.433594 96.027344 109.433594 C 96.21875 109.433594 96.378906 109.269531 96.378906 109.070312 L 96.378906 108.890625 L 96.554688 108.890625 C 96.746094 108.890625 96.90625 108.726562 96.90625 108.527344 C 96.90625 108.328125 96.746094 108.164062 96.554688 108.164062 Z M 96.554688 108.164062 "
                fill-opacity="1"
                fill-rule="nonzero"
            />
        </g>
        <g clip-path="url(#76bf453818)">
            <path
                style={{ fill: fillIcon }}
                d="M 105.695312 90.773438 L 105.871094 90.773438 L 105.871094 90.953125 C 105.871094 91.152344 106.027344 91.316406 106.222656 91.316406 C 106.414062 91.316406 106.574219 91.152344 106.574219 90.953125 L 106.574219 90.773438 L 106.75 90.773438 C 106.941406 90.773438 107.101562 90.609375 107.101562 90.410156 C 107.101562 90.210938 106.941406 90.046875 106.75 90.046875 L 106.574219 90.046875 L 106.574219 89.867188 C 106.574219 89.667969 106.414062 89.503906 106.222656 89.503906 C 106.027344 89.503906 105.871094 89.667969 105.871094 89.867188 L 105.871094 90.046875 L 105.695312 90.046875 C 105.5 90.046875 105.34375 90.210938 105.34375 90.410156 C 105.34375 90.609375 105.5 90.773438 105.695312 90.773438 Z M 105.695312 90.773438 "
                fill-opacity="1"
                fill-rule="nonzero"
            />
        </g>
        <g clip-path="url(#1027e25eca)">
            <path
                style={{ fill: fillIcon }}
                d="M 86.007812 106.351562 L 85.832031 106.351562 L 85.832031 106.171875 C 85.832031 105.972656 85.671875 105.808594 85.480469 105.808594 C 85.285156 105.808594 85.128906 105.972656 85.128906 106.171875 L 85.128906 106.351562 L 84.953125 106.351562 C 84.757812 106.351562 84.601562 106.515625 84.601562 106.714844 C 84.601562 106.914062 84.757812 107.078125 84.953125 107.078125 L 85.128906 107.078125 L 85.128906 107.257812 C 85.128906 107.457031 85.285156 107.621094 85.480469 107.621094 C 85.671875 107.621094 85.832031 107.457031 85.832031 107.257812 L 85.832031 107.078125 L 86.007812 107.078125 C 86.199219 107.078125 86.359375 106.914062 86.359375 106.714844 C 86.359375 106.515625 86.199219 106.351562 86.007812 106.351562 Z M 86.007812 106.351562 "
                fill-opacity="1"
                fill-rule="nonzero"
            />
        </g>
        <g clip-path="url(#5609f8e066)">
            <path
                style={{ fill: fillIcon }}
                d="M 106.75 106.351562 L 106.574219 106.351562 L 106.574219 106.171875 C 106.574219 105.972656 106.414062 105.808594 106.222656 105.808594 C 106.027344 105.808594 105.871094 105.972656 105.871094 106.171875 L 105.871094 106.351562 L 105.695312 106.351562 C 105.5 106.351562 105.34375 106.515625 105.34375 106.714844 C 105.34375 106.914062 105.5 107.078125 105.695312 107.078125 L 105.871094 107.078125 L 105.871094 107.257812 C 105.871094 107.457031 106.027344 107.621094 106.222656 107.621094 C 106.414062 107.621094 106.574219 107.457031 106.574219 107.257812 L 106.574219 107.078125 L 106.75 107.078125 C 106.941406 107.078125 107.101562 106.914062 107.101562 106.714844 C 107.101562 106.515625 106.941406 106.351562 106.75 106.351562 Z M 106.75 106.351562 "
                fill-opacity="1"
                fill-rule="nonzero"
            />
        </g>
        <path
            style={{ fill: fillIcon }}
            d="M 88.820312 91.316406 C 88.625 91.316406 88.46875 91.476562 88.46875 91.675781 L 88.46875 101.824219 C 88.46875 102.023438 88.625 102.1875 88.820312 102.1875 C 89.011719 102.1875 89.171875 102.023438 89.171875 101.824219 L 89.171875 91.675781 C 89.171875 91.476562 89.011719 91.316406 88.820312 91.316406 Z M 88.820312 91.316406 "
            fill-opacity="1"
            fill-rule="nonzero"
        />
        <path
            style={{ fill: fillIcon }}
            d="M 92.335938 91.316406 C 92.140625 91.316406 91.984375 91.476562 91.984375 91.675781 L 91.984375 101.824219 C 91.984375 102.023438 92.140625 102.1875 92.335938 102.1875 C 92.527344 102.1875 92.6875 102.023438 92.6875 101.824219 L 92.6875 91.675781 C 92.6875 91.476562 92.527344 91.316406 92.335938 91.316406 Z M 92.335938 91.316406 "
            fill-opacity="1"
            fill-rule="nonzero"
        />
        <path
            style={{ fill: fillIcon }}
            d="M 94.09375 93.128906 C 93.898438 93.128906 93.742188 93.289062 93.742188 93.488281 L 93.742188 103.636719 C 93.742188 103.835938 93.898438 103.996094 94.09375 103.996094 C 94.285156 103.996094 94.445312 103.835938 94.445312 103.636719 L 94.445312 93.488281 C 94.445312 93.289062 94.285156 93.128906 94.09375 93.128906 Z M 94.09375 93.128906 "
            fill-opacity="1"
            fill-rule="nonzero"
        />
        <path
            style={{ fill: fillIcon }}
            d="M 90.578125 93.671875 C 90.382812 93.671875 90.226562 93.832031 90.226562 94.03125 L 90.226562 99.46875 C 90.226562 99.667969 90.382812 99.832031 90.578125 99.832031 C 90.769531 99.832031 90.929688 99.667969 90.929688 99.46875 L 90.929688 94.03125 C 90.929688 93.832031 90.769531 93.671875 90.578125 93.671875 Z M 90.578125 93.671875 "
            fill-opacity="1"
            fill-rule="nonzero"
        />
        <path
            style={{ fill: fillIcon }}
            d="M 87.0625 94.9375 C 86.867188 94.9375 86.710938 95.101562 86.710938 95.300781 L 86.710938 105.445312 C 86.710938 105.644531 86.867188 105.808594 87.0625 105.808594 C 87.253906 105.808594 87.414062 105.644531 87.414062 105.445312 L 87.414062 95.300781 C 87.414062 95.101562 87.253906 94.9375 87.0625 94.9375 Z M 87.0625 94.9375 "
            fill-opacity="1"
            fill-rule="nonzero"
        />
        <g clip-path="url(#00567abfe4)">
            <path
                style={{ fill: fillIcon }}
                d="M 85.65625 103.089844 L 85.65625 97.65625 C 85.65625 97.457031 85.496094 97.292969 85.304688 97.292969 C 85.109375 97.292969 84.953125 97.457031 84.953125 97.65625 L 84.953125 103.089844 C 84.953125 103.289062 85.109375 103.453125 85.304688 103.453125 C 85.496094 103.453125 85.65625 103.289062 85.65625 103.089844 Z M 85.65625 103.089844 "
                fill-opacity="1"
                fill-rule="nonzero"
            />
        </g>
        <path
            style={{ fill: fillIcon }}
            d="M 104.640625 94.9375 C 104.445312 94.9375 104.289062 95.101562 104.289062 95.300781 L 104.289062 105.445312 C 104.289062 105.644531 104.445312 105.808594 104.640625 105.808594 C 104.832031 105.808594 104.992188 105.644531 104.992188 105.445312 L 104.992188 95.300781 C 104.992188 95.101562 104.832031 94.9375 104.640625 94.9375 Z M 104.640625 94.9375 "
            fill-opacity="1"
            fill-rule="nonzero"
        />
        <path
            style={{ fill: fillIcon }}
            d="M 106.046875 97.65625 L 106.046875 103.089844 C 106.046875 103.289062 106.203125 103.453125 106.398438 103.453125 C 106.589844 103.453125 106.75 103.289062 106.75 103.089844 L 106.75 97.65625 C 106.75 97.457031 106.589844 97.292969 106.398438 97.292969 C 106.203125 97.292969 106.046875 97.457031 106.046875 97.65625 Z M 106.046875 97.65625 "
            fill-opacity="1"
            fill-rule="nonzero"
        />
        <path
            style={{ fill: fillIcon }}
            d="M 96.203125 101.28125 L 96.203125 95.84375 C 96.203125 95.644531 96.042969 95.480469 95.851562 95.480469 C 95.65625 95.480469 95.5 95.644531 95.5 95.84375 L 95.5 101.28125 C 95.5 101.480469 95.65625 101.640625 95.851562 101.640625 C 96.042969 101.640625 96.203125 101.480469 96.203125 101.28125 Z M 96.203125 101.28125 "
            fill-opacity="1"
            fill-rule="nonzero"
        />
        <path
            style={{ fill: fillIcon }}
            d="M 99.367188 91.316406 C 99.171875 91.316406 99.015625 91.476562 99.015625 91.675781 L 99.015625 101.824219 C 99.015625 102.023438 99.171875 102.1875 99.367188 102.1875 C 99.558594 102.1875 99.71875 102.023438 99.71875 101.824219 L 99.71875 91.675781 C 99.71875 91.476562 99.558594 91.316406 99.367188 91.316406 Z M 99.367188 91.316406 "
            fill-opacity="1"
            fill-rule="nonzero"
        />
        <path
            style={{ fill: fillIcon }}
            d="M 101.125 93.671875 C 100.929688 93.671875 100.773438 93.832031 100.773438 94.03125 L 100.773438 99.46875 C 100.773438 99.667969 100.929688 99.832031 101.125 99.832031 C 101.316406 99.832031 101.476562 99.667969 101.476562 99.46875 L 101.476562 94.03125 C 101.476562 93.832031 101.316406 93.671875 101.125 93.671875 Z M 101.125 93.671875 "
            fill-opacity="1"
            fill-rule="nonzero"
        />
        <path
            style={{ fill: fillIcon }}
            d="M 97.609375 93.128906 C 97.414062 93.128906 97.257812 93.289062 97.257812 93.488281 L 97.257812 103.636719 C 97.257812 103.835938 97.414062 103.996094 97.609375 103.996094 C 97.800781 103.996094 97.960938 103.835938 97.960938 103.636719 L 97.960938 93.488281 C 97.960938 93.289062 97.800781 93.128906 97.609375 93.128906 Z M 97.609375 93.128906 "
            fill-opacity="1"
            fill-rule="nonzero"
        />
        <path
            style={{ fill: fillIcon }}
            d="M 102.882812 91.316406 C 102.6875 91.316406 102.53125 91.476562 102.53125 91.675781 L 102.53125 101.824219 C 102.53125 102.023438 102.6875 102.1875 102.882812 102.1875 C 103.074219 102.1875 103.234375 102.023438 103.234375 101.824219 L 103.234375 91.675781 C 103.234375 91.476562 103.074219 91.316406 102.882812 91.316406 Z M 102.882812 91.316406 "
            fill-opacity="1"
            fill-rule="nonzero"
        />
    </svg>
);
