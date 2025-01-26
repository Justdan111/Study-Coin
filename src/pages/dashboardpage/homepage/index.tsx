import DesktopTitlebar from "../../../components/header";
import coin from "../../../../public/images/coin.png";
import resources from "../../../../public/images/resources.png";
import assignment from "../../../../public/images/assignment.png";
import HomePageTab from "../../../components/ui/homepagetab";


export default function HomePage() {
  return (
    <div>
      <DesktopTitlebar pageTitle="Home Page" />
      <div className="w-full flex flex-row justify-between gap-10">
        <HomePageTab
          image={coin}
          statCount={300}
          sectionName="Total Coins Mined"
          link="/coins"
        />
        <HomePageTab
          image={resources}
          statCount={15}
          sectionName="Resources"
          link="/resources"
        />
        <HomePageTab
          image={assignment}
          statCount={8}
          sectionName="Assignments"
          link="/assignments"
        />
      </div>
    </div>
  );
}
