import { createChatBotMessage } from "react-chatbot-kit";
import Overview from "./widgets/Overview";
import GlobalStatistics from "./widgets/GlobalStatistics";
import LocalStatistics from "./widgets/LocalStatistics";
import Contact from "./widgets/Contact";
import MedicineDelivery from "./widgets/MedicineDelivery";
import CoBotAvatar from "./CoBotAvatar";
import VideoGuideOptions from "./widgets/VideoGuideOptions";
import PricingOptions from "./widgets/PricingOptions";
import ProFee from "./widgets/ProFee";
import WehagoTGuide from "./widgets/WehagoTGuide";

const config = {
  lang: "no",
  botName: "WE봇",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#04668a"
    },
    chatButton: {
      backgroundColor: "#0f5faf"
    }
  },
  initialMessages: [
    createChatBotMessage(
      `안녕하세요! WE봇입니다.`
    ),
    createChatBotMessage(
      "원하시는 상담버튼을 클릭해주세요",
      {
        withAvatar: false,
        delay: 400,
        widget: "overview" // Corrected widget property
      }
    )
  ],
  state: {},
  customComponents: { botAvatar: (props) => <CoBotAvatar {...props} /> },
  widgets: [
    {
      widgetName: "overview",
      widgetFunc: (props) => <Overview {...props} />,
      mapStateToProps: ["messages"]
    },
    {
      widgetName: "globalStatistics",
      widgetFunc: (props) => <GlobalStatistics {...props} />
    },
    {
      widgetName: "localStatistics",
      widgetFunc: (props) => <LocalStatistics {...props} />
    },
    {
      widgetName: "emergencyContact",
      widgetFunc: (props) => <Contact  {...props}/>
    },
    {
      widgetName: "medicineDelivery",
      widgetFunc: (props) => <MedicineDelivery {...props}/>
    },
    {
      widgetName: "videoGuideOptions",
      widgetFunc: (props) => <VideoGuideOptions {...props} />,
    },
    {
      widgetName: "pricingOptions",
      widgetFunc: (props) => <PricingOptions {...props} />,
    },
    {
      widgetName: "proFee",
      widgetFunc: (props) => <ProFee {...props} />
    },
    {
      widgetName: "wehagoTGuide",
      widgetFunc: (props) => <WehagoTGuide {...props} />
    },
  ]
};

export default config;
