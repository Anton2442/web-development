import { teamMembers } from '../data/content';

export default function Team() {
  return (
    <section className="team" id="team">
      <div className="team__content wrap">
        <div className="title__team">
          <p className="desc desc_sm text_red">Our Team</p>
          <h2 className="title title_md text_black">Meet Our Groomers</h2>
        </div>
        <div className="team__cards">
          {teamMembers.map((member, index) => (
            <article key={`${member.name}-${index}`} className="team__card">
              <img src={member.photo} alt={member.name} />
              <h3 className="title title_lt text_black">{member.name}</h3>
              <p className="desc desc_sm text_red">{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

