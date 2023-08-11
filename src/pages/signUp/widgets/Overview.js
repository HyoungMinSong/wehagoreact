import Options from "./Options";

const GeneralOptions = (props) => {
  const options = [
    {
      name: "회원가입",
      handler: props.actionProvider.handleGlobalStats,
      id: 1
    },
    {
      name: "요금제",
      handler: props.actionProvider.handleLocalStats,
      id: 2
    },
    {
      name: "전화문의",
      handler: props.actionProvider.handleContact,
      id: 3
    },
    {
      name: "동영상가이드",
      handler: props.actionProvider.handleMedicine,
      id: 4
    }
  ];
  return <Options options={options} title="Options" {...props} />;
};

export default GeneralOptions;