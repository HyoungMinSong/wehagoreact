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
        widget: "localStatistics",
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
      "To have clinical medicine safely delivered to your home, please refer to the link below.",
      {
        widget: "medicineDelivery",
        loading: true,
        terminateLoading: true,
        withAvatar: true
      }
    );

    this.addMessageToState(message);
  };

  handleJoke = () => {
    var jokes = [
      "So many coronavirus jokes out there, it’s a pundemic!",
      "I’ll tell you a coronavirus joke now, but you’ll have to wait two weeks to see if you got it!",
      "Did you hear the joke about coronavirus? Never mind, I don’t want to spread it around!",
      "What should you do if you don’t understand a coronavirus joke? Be patient!",
      "Why do they call it the novel coronavirus? It’s a long story...",
      "Since we’re all in quarantine I guess we’ll be making only inside jokes from now on!"
    ];

    var randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    const message = this.createChatBotMessage(randomJoke);

    this.addMessageToState(message);
  };

  handleThanks = () => {
    const message = this.createChatBotMessage("You're welcome, and stay safe!");

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