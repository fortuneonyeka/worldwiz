import Header from "../components/navigations/header/Header";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <Header />
      <section>
       
        <div>
          <h2>Wordlwiz: Your Ultimate Travel Companion.</h2>
          <p>
            Welcome to the Travel Guide Application, your all-in-one tool to
            explore, document, and relive your journeys with ease. Whether
            you're planning your next adventure or reminiscing about past trips,
            this app is designed to make every step of your travel experience
            seamless and memorable. With a powerful, well-integrated map, you
            can effortlessly pinpoint and navigate to cities, landmarks, and
            points of interest. Each location comes alive with detailed notes,
            including historical facts, cultural insights, and personal
            experiences, helping you dive deeper into the places you visit.
          </p>
          <p>
            Capture your travels like never before by saving visited cities with
            custom notes, photos, and travel dates, creating a personalized
            travel diary that grows with every trip. The app also provides
            essential country-specific information, such as currency, ensuring
            you're always well-prepared for your adventures. Featuring an
            intuitive interface and seamless integration of maps and notes, the
            Travel Guide Application is your ultimate companion for exploring
            the world. Start your journey today and make the most of every trip!
            🌍✈️.
          </p>
        </div>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
      </section>
    </main>
  );
}
