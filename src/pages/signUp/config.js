import { createChatBotMessage } from "react-chatbot-kit";
import Overview from "./widgets/Overview";
import GlobalStatistics from "./widgets/GlobalStatistics";
import LocalStatistics from "./widgets/LocalStatistics";
import Contact from "./widgets/Contact";
import MedicineDelivery from "./widgets/MedicineDelivery";
import CoBotAvatar from "./CoBotAvatar";

const config = {
  lang: "no",
  botName: "CoBot",
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
      widgetFunc: (props) => <GlobalStatistics />
    },
    {
      widgetName: "localStatistics",
      widgetFunc: (props) => <LocalStatistics />
    },
    {
      widgetName: "emergencyContact",
      widgetFunc: (props) => <Contact />
    },
    {
      widgetName: "medicineDelivery",
      widgetFunc: (props) => <MedicineDelivery />
    }
  ]
};

export default config;
