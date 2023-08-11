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
        <path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
        <path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
        <path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
        <path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
    </svg>
);

export const UploadIcon = ({ width = '100%', height = '100%', className }: IIconPropsComponent) => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12.5 17L12.5 4M12.5 4L18 8.78947M12.5 4L7 8.78947"
            stroke="#909090"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path d="M6 21H19" stroke="#909090" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
);
