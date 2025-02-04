// Uses the same styles as Product
import Header from "../components/navigations/header/Header";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <Header />
      <section>
        <div>
          <h2>Pricing plans</h2>
          <p>
            We offer flexible pricing plans to suit your travel needs, whether
            you're a casual traveler or a frequent globetrotter. Here’s a
            breakdown of our pricing options:
          </p>
          <div>
            <p>
              1. Free Plan Price: $0/month Perfect for: Casual travelers who
              want basic features. Start your journey today and choose the plan
              that best fits your travel style! 🌍✈️
            </p>
            <p>
              2. Explorer Plan Price: $4.99/month or $49.99/year (save 16%)
              Perfect for: Frequent travelers who want more features and
              flexibility.
            </p>
            <p>
              3. Globetrotter Plan Price: $9.99/month or $99.99/year (save 16%)
              Perfect for: Travel enthusiasts and professionals who want the
              ultimate travel companion.
            </p>
            <p>
              4. Family Plan Price: $14.99/month or $149.99/year (save 16%)
              Perfect for: Families or groups traveling together.
            </p>
          </div>
          <p>
            Why Choose Us? Affordable plans for every type of traveler. No
            hidden fees – transparent pricing. Cancel anytime – no long-term
            commitments. 7-day free trial for all paid plans.
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
