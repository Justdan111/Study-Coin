import trophyIcon from "../../../public/images/trophy.png";

export default function TrophyIcon({ size = '' }) {
    return (
        <>
            <img src={trophyIcon} className={`w-${size} h-${size}`} />
        </>
    );
}
