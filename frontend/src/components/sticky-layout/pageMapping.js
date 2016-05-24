import IntroPage from '../intro-page/IntroPage.jsx';
import ContactPage from '../contact-page/ContactPage.jsx';
import ReservationPage from '../reservation-page/ReservationPage.jsx';
import AvailabilityPage from '../availability-page/AvailabilityPage.jsx';


// other files that need to click through to pages will  import these constants
// to make sure that there are no mispellings etc
const INTRO = 'intro-page';
const CONTACT = 'contact-page';
const BOOK = 'book-page';
const CHOICE = 'choice-page';
const CONFIRM = 'confirm-page';

const pageMapping = new Map([
  [ INTRO, IntroPage ],
  [ CONTACT, ContactPage ],
  [ BOOK, ReservationPage ],
  [ CHOICE, AvailabilityPage ],
  [ CONFIRM, IntroPage ],
]);

export { INTRO, CONTACT, BOOK, CHOICE, CONFIRM, pageMapping };

