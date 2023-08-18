import Image from 'next/image';

function PageNotFound() {
    return (
        <>
            <Image src="/404thumbnail.png" width={100} height={100} alt="" />
        </>
    );
}

export default PageNotFound;
