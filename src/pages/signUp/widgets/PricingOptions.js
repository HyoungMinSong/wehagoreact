import React from "react";
import Options from "./Options"; // 이전에 작성한 Options 컴포넌트를 불러옵니다.


const PricingOptions = (props) => {
    const options = [
        {
            name: "CLUB 요금제",
            handler: () => handleVideoSelection("club"),
            id: 1,
        },
        {
            name: "PRO 요금제",
            handler: () => handleVideoSelection("pro"),
            id: 2,
        },
        // 다른 동영상 가이드 옵션들을 추가할 수 있습니다.
    ];

    const handleVideoSelection = (type) => {
        // 선택한 옵션에 따라 동작을 정의합니다.
        // 예를 들어, "패키지 설명 동영상"을 선택하면 해당 동영상을 재생하는 등의 작업을 수행합니다.
        // 각 옵션마다 다른 동작을 수행하도록 작성하세요.
        if (type === 'club') {
            const message = props.actionProvider.createChatBotMessage(
                "CLUB 패키지 요금제입니다.",
                {
                    widget: "localStatistics",
                    loading: true,
                    terminateLoading: true,
                    withAvatar: true,
                });

            props.actionProvider.addMessageToState(message);
        }else {
            const message = props.actionProvider.createChatBotMessage(
                "PRO 패키지 요금제입니다.",
                {
                    widget: "proFee",
                    loading: true,
                    terminateLoading: true,
                    withAvatar: true,
                });

            props.actionProvider.addMessageToState(message);
        }
       
    };
    //   원하시는 항목 선택해주세요!
    return <Options options={options} title="패키지를 선택해주세요" {...props} />;
}
    export default PricingOptions;
