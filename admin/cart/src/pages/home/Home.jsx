import Chart from "../../components/Chart/Chart";
import FeaturedInfo from "../../components/featuredInfo3/FeaturedInfo";

import "./home.css";
import { userData } from "../../../../data";
import WidgetSm from "../../components/widgetSm/WidgetSm";


export default function Home() {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        
      </div>
    </div>
  );
}
