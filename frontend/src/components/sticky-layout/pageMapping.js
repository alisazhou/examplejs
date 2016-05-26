import IntroPage from '../intro-page/IntroPage.jsx';
import ContactPage from '../contact-page/ContactPage.jsx';
import ReservationPage from '../reservation-page/ReservationPage.jsx';
import AvailabilityPage from '../availability-page/AvailabilityPage.jsx';
import PaymentPage from '../payment-page/PaymentPage.jsx';


// other files that need to click through to pages will import these constants
// to make sure that there are no mispellings etc
// right now this is also being used to display progresss bar headings
const INTRO = 'intro-page';
const CONTACT = 'contact-page';
const BOOK = '1. Booking Details';
const CHOICE = '2. Choose Available People';
const CONFIRM = '3. Confirmation & Payment';

const pageMapping = new Map([
  [ INTRO, IntroPage ],
  [ CONTACT, ContactPage ],
  [ BOOK, ReservationPage ],
  [ CHOICE, AvailabilityPage ],
  [ CONFIRM, PaymentPage ],
]);

export { INTRO, CONTACT, BOOK, CHOICE, CONFIRM, pageMapping };

