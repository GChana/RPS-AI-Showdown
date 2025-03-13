# RPS-AI-Showdown

RPS-AI-Showdown is a realtime hand gesture recognition application that allows a person to play Rock, Paper, Scissors against 3 AI opponents all with their own personalities and responses.

## Features

- Player vs. AI Gameplay: Play rock, paper, scissors against an AI opponent in real-time.
- Real-Time recognition: The game state allows users to change their choice within the countdown window.
- User-Friendly Interface: Built with React and Vite for a responsive and intuitive UI.

## Live Deployment

https://rps-showdown.netlify.app/

## Technology Stack

- **Front End:** React.js, Sass
- **Back End:** Node.js, Express.js
- **AI:** Tensorflow, Gemini 1.5 flash

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/GChana/RPS-AI-Showdown.git
   ```


2. **Install Dependancies**:

Ensure you have Node.js installed. Then, run:

```bash
npm install
```

3. **Start the development server***:

```bash
npm run dev
```

The application should now be accessible at http://localhost:5050.

## Usage
Upon launching the application, you'll be presented with the game interface. To play:

1. Enter your player name and click PLAY!
2. Select START GAME: A count down timer will appear, hold up your hand with a selection of either Rock ✊ Paper ✋ or Scissors ✌️
3. View the result: Once the timer expires the AI opponent will display their selection (the user selection is not incldued in the response or decision making for the AI opponent) and the
   game will reveal the results of that round reducing the losing players health accordingly and displaying the result in the bottom left of the screen.
5. Continue playing: There are 3 AI opponents to defeat in order to become the grand champion.

## Features
1. Realtime hand gesture recognition utilising Tensorflow and HandPostjs
2. Responsive Design: Optimized for various screen sizes, ensuring a seamless experience on both desktop and mobile devices.
3. Real-time Feedback: Instantly displays game results after each round.
4. Personality based and personanised responses to game outcomes i.e. AI wins/AI loss

##Contributing
Contributions are welcome! To contribute:

1. Fork the repository.

2. Create a new branch:

```bash
git checkout -b feature/YourFeatureName
```

3. Make your changes.

4. Commit your changes:

```bash
git commit -m 'Add some feature'
```

5. Push to the branch:

```bash
git push origin feature/YourFeatureName
```

6. Open a Pull Request.

Contact
For questions or feedback, please reach out to https://github.com/GChana.


 
