import React from "react";
import Options from "./Options"; // 이전에 작성한 Options 컴포넌트를 불러옵니다.

const VideoGuideOptions = (props) => {
  const options = [
    {
      name: "위하고 팁 동영상",
      handler: () => handleVideoSelection("tip"),
      id: 1,
    },
    {
      name: "위하고 T 가이드 동영상",
      handler: () => handleVideoSelection("tguide"),
      id: 2,
    },
    // 다른 동영상 가이드 옵션들을 추가할 수 있습니다.
  ];

  const handleVideoSelection = (type) => {
    // 선택한 옵션에 따라 동작을 정의합니다.
    // 예를 들어, "패키지 설명 동영상"을 선택하면 해당 동영상을 재생하는 등의 작업을 수행합니다.
    // 각 옵션마다 다른 동작을 수행하도록 작성하세요.
    if (type === 'tip') {
    const message = props.actionProvider.createChatBotMessage(    
        "위하고 팁 동영상을 유튜브를 통해 시청이 가능합니다.",
        {
          widget: "medicineDelivery",
          loading: true,
          terminateLoading: true,
          withAvatar: true,
        });
    
      props.actionProvider.addMessageToState(message);
  } else {
    const message = props.actionProvider.createChatBotMessage(    
        "위하고 T 가이드 동영상을 유튜브를 통해 시청이 가능합니다.",
        {
          widget: "wehagoTGuide",
          loading: true,
          terminateLoading: true,
          withAvatar: true,
        });
    
      props.actionProvider.addMessageToState(message);
  }
}

  return <Options options={options} title="동영상 가이드 목록" {...props} />;
};

export default VideoGuideOptions;
