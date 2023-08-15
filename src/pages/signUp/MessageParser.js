class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    message = message.toLowerCase();
    console.log(message);

    if (
      message.includes("options") ||
      message.includes("help") ||
      message.includes("do for me")
    ) {
      return this.actionProvider.handleOptions({ withAvatar: true });
    }

    if (
      message.includes("상담") ||
      message.includes("전화") ||
      message.includes("고객센터") ||
      message.includes("문의") ||
      message.includes("번호") ||
      message.includes("연락")
    ) {
      return this.actionProvider.handleContact();
    }

    if (
      message.includes("회원") ||
      message.includes("가입") ||
      message.includes("deaths")
    ) {
      return this.actionProvider.handleGlobalStats();

    }

    if (
      message.includes("요금") ||
      message.includes("가격") ||
      message.includes("패키지")
    ) {
      return this.actionProvider.handleLocalStats();
    }
    

    if (message.includes("사용") || message.includes("가이드")) {
      return this.actionProvider.handleMedicine();
    }

    if (
      message.includes("농담") ||
      message.includes("재밌는") ||
      message.includes("재밋는")
    ) {
      return this.actionProvider.handleJoke();
    }

    if (message.includes("고마워") || message.includes("땡큐") || message.includes("감사") || message.includes("고맙") ) {
      return this.actionProvider.handleThanks();
    }

    return this.actionProvider.handleOptions({ withAvatar: true });
  }
}

export default MessageParser;