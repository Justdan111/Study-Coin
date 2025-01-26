import { FC } from "react";

interface HomePageTabProps {
    image: string;
    statCount: number | string;
    sectionName: string;
    link: string;
}

const HomePageTab: FC<HomePageTabProps> = ({ image, statCount, sectionName, link }) => {
    return (
        <div
            className="w-full h-52 rounded-xl border flex flex-row items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => window.location.href = link}
        >
            <img src={image} className="h-20 w-20 mr-4" alt={`${sectionName} icon`} />
            <div className="flex flex-col">
                <h1 className="text-black font-medium text-3xl">{statCount}</h1>
                <h1 className="text-black font-normal text-xl">{sectionName}</h1>
            </div>
        </div>
    );
};

export default HomePageTab;
