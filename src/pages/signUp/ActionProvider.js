class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }
  handleOptions = (options) => {
    const message = this.createChatBotMessage(
      "어떻게 도와드릴까요? 다음은 몇 가지 가능한 옵션입니다.",
      {
        widget: "overview",
        loading: true,
        terminateLoading: true,
        ...options
      }
    );

    this.addMessageToState(message);
  };

  handleGlobalStats = () => {
    const message = this.createChatBotMessage(
      "회원 가입 방법은 다음과 같습니다.",
      {
        widget: "globalStatistics",
        loading: true,
        terminateLoading: true,
        withAvatar: true
      }
    );

    this.addMessageToState(message);
  };

  handleLocalStats = () => {
    const message = this.createChatBotMessage(
      "위하고의 패키지는 CLUB과 PRO가 있습니다. ",
      {
        widget: "pricingOptions",
        loading: true,
        terminateLoading: true,
        withAvatar: true
      }
    );

    this.addMessageToState(message);
  };

  handleContact = () => {
    const message = this.createChatBotMessage(
      "자세한 상담을 원하시는 경우에는 전화 상담 부탁드리겠습니다.",
      {
        widget: "emergencyContact",
        loading: true,
        terminateLoading: true,
        withAvatar: true
      }
    );

    this.addMessageToState(message);
  };

  handleMedicine = () => {
    const message = this.createChatBotMessage(
    //   "위하고 사용 팁들을 유튜브를 통해 시청이 가능합니다.",
    //   {
    //     widget: "medicineDelivery",
    //     loading: true,
    //     terminateLoading: true,
    //     withAvatar: true
    //   }
    // );
    "어떤 동영상 가이드를 보시겠습니까?",
    {
      widget: "videoGuideOptions",
      loading: true,
      terminateLoading: true,
      withAvatar: true,
    }
  );

    this.addMessageToState(message);
  };

  
  handleVideoSelection = (type) => {
    if(type === "package") {
    const message = this.createChatBotMessage(
    
      {
        widget: "videoGuideOptions",
        loading: true,
        terminateLoading: true,
        withAvatar: true,
      }
// 다른 타입에 따른 처리를 추가할 수 있습니다.
  );
  this.addMessageToState(message);
};
  }

  handleJoke = () => {
    var jokes = [
      "오리가 얼면? 언덕",
      "동그라미 2개, 별이 2개면? 영영이별",
      "딸기가 직장을 잃으면? 딸기시럽",
      "우유가 넘어지면? 아야",
      "용이 놀라면? 띠용",
      "자가용의 반대말은? 커용"
    ];

    var randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    const message = this.createChatBotMessage(randomJoke);

    this.addMessageToState(message);
  };

  handleThanks = () => {
    const message = this.createChatBotMessage("천만에요! 궁금한 점이나 도움이 필요한 내용이 있으면 언제든지 물어보세요. 즐거운 시간 되시길 바랄게요!");

    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((state) => ({
      ...state,
      messages: [...state.messages, message]
    }));
  };
}

export default ActionProvider;