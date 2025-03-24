import { reactShinyInput } from 'reactR'

import "./styles/style.scss";
import { useState, createContext, useEffect, useMemo } from "react";
import Nav from "./components/Nav";
import ThemesMenu from "./components/ThemesMenu";
import Footer from "./components/Footer";
import Lenis from "@studio-freight/lenis";
import { Routes, Route, MemoryRouter as Router } from "react-router-dom";
import Main from "./components/pages/Main";
import About from "./components/pages/About";
import Team from "./components/pages/Team";
import decodeHtml from "./utils/htmlUtils";
import { translation_df } from "./data/translation.js";

// Create a Language context to be used with the useContext hook. This will allow us to pass the language
// to any component without having to pass it through props.
export const LanguageContext = createContext();

export const Landing = ({ configuration, value, setValue }) => {
  // Set language
  const [lang, setLang] = useState(configuration.lang || "en");

  // Set configState
  const [configState, setConfigState] = useState(() => {
    let state = Object.fromEntries(
      Object.entries(configuration).map(([key, value]) => {
        if (typeof value === "string") {
          try {
            value = JSON.parse(decodeHtml(value));
          } catch (e) {}
        }
        return [key, value];
      })
    );
    // if translation_df is available in the configuration, concatenate it with translation_df from translation.js
    if (state.translation_df) {
      state.translation_df = state.translation_df.concat(translation_df);
    }
    return state;
  });

  // This effect will listen for changes in the configuration prop
  // and update the configState accordingly
  // Map over configuration to modify everything to JSON
  useEffect(() => {
    let parsedConfiguration = Object.fromEntries(
      Object.entries(configuration).map(([key, value]) => {
        if (typeof value === "string") {
          try {
            value = JSON.parse(decodeHtml(value));
          } catch (e) {}
        }
        return [key, value];
      })
    );
    // if translation_df is available in the configuration, concatenate it with translation_df from translation.js
    if (parsedConfiguration.translation_df) {
      parsedConfiguration.translation_df =
        parsedConfiguration.translation_df.concat(translation_df);
    }

    setConfigState((prevConfig) => ({
      ...prevConfig,
      ...parsedConfiguration,
    }));
  }, [configuration]);

  // Get all the pages from the configState
  const pages = useMemo(() => configState.pages || [], [configState.pages]);

  // Get all unique the themes from the pages, only if/when the pages change
  const themes = useMemo(() => {
    let themes = [];
    pages.forEach((page) => {
      if (!themes.includes(page.theme)) {
        themes.push(page.theme);
      }
    });
    return themes;
  }, [pages]);

  // Smooth scroll
  const lenis = new Lenis();

  // Setup the lenis scroll
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  // Start the lenis scroll
  requestAnimationFrame(raf);

  // Turn on and off the whole component depending on the configuration
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (configState.turn === undefined) return;

    if (configState.turn === "on") {
      setIsVisible(true);
    } else if (configState.turn === "off") {
      lenis.destroy();
      setIsVisible(false);
    }
  }, [configState]);

  // Set the language
  useEffect(() => {
    if (configState.lang === undefined) return;

    setLang(configState.lang);
  }, [configState]);

  return (
    <div className="landing">
      <div className="background-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 800"
          preserveAspectRatio="xMidYMid meet"
        >
          <ellipse
            cx="550"
            cy="400"
            rx={1197 / 2}
            ry={1197 / 2}
            fill="#FB702E"
          />

          <ellipse
            cx="570"
            cy="420"
            rx={1063 / 2}
            ry={753 / 2}
            fill="#F84437"
          />

          <ellipse
            cx="550"
            cy="400"
            rx={651 / 2}
            ry={461 / 2}
            fill="#F51B47"
            transform="rotate(110 500 400)"
          />

          <ellipse
            cx="500"
            cy="400"
            rx={411 / 2}
            ry={397 / 2}
            fill="#DA0A5A"
            transform="rotate(160 500 400)"
          />

          <ellipse
            cx="500"
            cy="470"
            rx={243 / 2}
            ry={173 / 2}
            fill="#C70068"
            transform="rotate(110 500 400)"
          />
        </svg>
      </div>
      {isVisible && (
        <LanguageContext.Provider value={{ lang, configState }}>
          <Router>
            <Nav lenis={lenis} setLang={setLang} setValue={setValue} />
            <div id="main-content">
              <ThemesMenu
                lenis={lenis}
                pages={pages}
                themes={themes}
                setValue={setValue}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main lenis={lenis} lang={lang} setValue={setValue} />
                  }
                />
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
              </Routes>
            </div>
            <Footer
              lang={lang}
              pages={pages}
              themes={themes}
              setValue={setValue}
            />
          </Router>
        </LanguageContext.Provider>
      )}
    </div>
  );
};

export default function initLanding() {
	reactShinyInput('.landing', 'cc.landing.landing', Landing)
}
