import "./AboutPage.scss";
import { Link } from "react-router-dom";
import avatar from "../../assets/Avatar.jpg";
import NavBar from "../../components/NavBar/NavBar";

function About() {
  return (
    <>
      <header className="header">
        <h1 className="header__title">ABOUT</h1>
      </header>
      <NavBar />
      <main className="about">
        <article className="about__contact">
          <h2 className="about__title">About Me</h2>
          <img
            className="about__img"
            src={avatar}
            alt="avatar image of app creator"
          />
          <p className="about__me">
            This game was built as my Capstone project at the end of a brilliant
            bootcamp with Brainstation. Both an amazing experience and a
            lifelong learning journey I'm throughly glad to have started with
            both an amazing group of cohorts, colleagues, friends and educators.
          </p>
          <Link
            className="about__contact-info-link"
            to="https://www.linkedin.com/in/gurpreet-chana-"
          >
            <p className="about__contact-info">LinkedIn</p>
          </Link>
          <Link
            className="about__contact-info-link"
            to="https://github.com/GChana"
          >
            <p className="about__contact-info">GitHub</p>
          </Link>
        </article>
        <article className="about__brainstation">
          <h2 className="about__brainstation-title">THANK YOU!</h2>
          <p className="about__brainstation-text">
            I also wanted to include a huge thank you to all the educators and
            careers team at Brainstaiton for all their help and support
            throughout the bootcamp they are an amazing group of people, Sammy,
            Joe, Emma, Egita, Madi, thank you all!!
          </p>
        </article>
      </main>
    </>
  );
}

export default About;
