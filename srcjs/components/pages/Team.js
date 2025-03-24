import Translate from "../Translate";
import { useContext } from "react";
import { LanguageContext } from "../../landing";
import React from "react";

// Component for each member
function MemberCard({ card, lang }) {
  // const maxLength = 375
  // const bio = card[`bio_${lang}`]
  // const truncatedBio =
  // 	bio.length > maxLength ? bio.substring(0, maxLength - 3) + '...' : bio

  return (
    <div className="card">
      <div className="card__img">
        <img src={card.img} alt={card.name} />
      </div>
      <div className={`card__title bg-${card.theme}`}>
        <span>{card.name}</span>
        <span style={{ fontSize: "12px" }}>{card[`role_${lang}`]}</span>
      </div>
      {/* <div className={`card__hover bg-${card.theme}`}>
				<span title={bio}>{truncatedBio}</span>
			</div> */}
    </div>
  );
}

function Team() {
  const contextValue = useContext(LanguageContext);
  const lang = contextValue.lang;
  const configState = contextValue.configState;
  if (!configState) {
    return null;
  }
  const team_cards = configState.team_cards;

  return (
    <main>
      <div className="hero">
        <h1 className="h1 main-title">
          <div className="main-title__first-part">
            <Translate str={"CURBCUT&nbsp; TEAM"} />
          </div>
        </h1>
      </div>

      <section className="section section-team">
        <div>
          <span className="section__title">
            <Translate str="Main team" />
          </span>
        </div>
        <div className="section-team__cards-wrapper">
          {team_cards.map((card) => (
            <MemberCard key={card.id} card={card} lang={lang} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Team;
