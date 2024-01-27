import { showAlert } from "./alerts";

export const bookTour = async tourID => {
  try {
    const stripe = Stripe("pk_test_BUkd0ZXAj6m0q0jMyRgBxNns00PPtgvjjr");
    // 1. Get checkout session from API
    const session = await fetch(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourID}`
    ).then(function(response) {
      return response.json();
    });

    console.log(session);
    // 2. create checkout form + change credit card
    await stripe.redirectToCheckout({
      sessionId: session.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
