import Image from "next/image"

export default function Trade() {

    return (
        <div>
            <div>
                <Image src={imageSrc} alt="Time Market image" width={200} height={200} className="rounded-t-lg mx-auto" />
            </div>
        </div>
    )
}