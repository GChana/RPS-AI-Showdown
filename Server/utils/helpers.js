// Revenge Routes --->
export const papyrusRevenge = async (model, userName) => {
  try {
    const prompt = `write a response in the tone of an ancient greek scholar named Papyrus master of paper of him losing a game of rock, paper, scissors and vowing revenge on his opponent ${userName}, please limit the response to 1 sentence and randomise this every time but limit to 1 option`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    throw new Error("Error retrieving Papyrus response" + Error);
  }
};

export const edwardRevenge = async (model, userName) => {
  try {
    const prompt = `write a response in the tone of Edward Scissorhands the movie character, of him losing a game of rock, paper, scissors to his opponent ${userName} and being sad about it, please limit the response to 1 sentence and randomise this every time but limit to 1 option`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    throw new Error("Error retrieving Edward response" + Error);
  }
};

export const rockRevenge = async (model, userName) => {
  try {
    const prompt = `write a response in the tone of the professional wrestler The Rock master of rock of him losing a game of rock, paper, scissors to his opponent ${userName} and being angry about it, please limit the response to 1 sentence and randomise this every time but limit to 1 option`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    throw new Error("Error retrieving The Rock response" + Error);
  }
};

// Taunt Routes -->

export const papyrusTaunt = async (model, userName) => {
  try {
    const prompt = `write a response in the tone of an ancient greek scholar named Papyrus master of paper of him winning a game of rock, paper, scissors and taunting his opponent ${userName}, please limit the response to 1 sentence and randomise this every time but limit to 1 option`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    throw new Error("Error retrieving Papyrus response" + Error);
  }
};

export const edwardTaunt = async (model, userName) => {
  try {
    const prompt = `write a response in the tone of Edward Scissorhands the movie character, of him winning a game of rock, paper, scissors against his opponent ${userName} and being happy about it, please limit the response to 1 sentence and randomise this every time but limit to 1 option`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    throw new Error("Error retrieving Edward response" + Error);
  }
};

export const rockTaunt = async (model, userName) => {
  try {
    const prompt = `write a response in the tone of the professional wrestler The Rock master of rock of him winning a game of rock, paper, scissors and taunting his opponent ${userName} in the style of a wrestling promo, please limit the response to 1 sentence and randomise this every time but limit to 1 option`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    throw new Error("Error retrieving The Rock response" + Error);
  }
};
