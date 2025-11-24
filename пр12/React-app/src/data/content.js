import heroDog from '../assets/dogHero.png';
import iconCare from '../assets/iconCare1.svg';
import storyDog from '../assets/StoryDog.png';
import teamMember from '../assets/team1.png';
import prDog from '../assets/PrDog.png';

export const navLinks = ['Start', 'Services', 'About', 'News', 'Contact'];

export const mobileLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'О нас', href: '#about' },
  { label: 'Техника', href: '#equipment' },
  { label: 'Партнеры', href: '#banners' },
  { label: 'Лицензия', href: '#licen' }
];

export const careCards = Array.from({ length: 4 }).map(() => ({
  title: 'Pet Grooming',
  description:
    'There are many variatio of passage of Lorem for a Ipsum available',
  icon: iconCare
}));

export const successStory = {
  title: 'Experience Vet Clinic\nAnd Services',
  description:
    'Aliquam erat volutpat In id fermentum augue, ut pellentesque  Maecenas at arcu risus. Donec commodo sodales ex, scelerisque laoreet nibh hakso hendrerit id. In aliquet magna nec lobortis maximus.',
  bullets: [
    'Donec commodo scelerisque laoreet nibh hendrerit',
    'In aliquet magna nec lobortis maximus. Etiam a dolor placerat',
    'Etiam dolor nec elementum ipsum convall Maecenas'
  ],
  image: storyDog
};

export const teamMembers = Array.from({ length: 4 }).map(() => ({
  name: 'Rosalina Wiliam',
  role: 'CEO & Founder',
  photo: teamMember
}));

export const servicePacks = [
  {
    name: 'Regular Pack',
    duration: '3 Days',
    price: '$150Per Visit',
    theme: 'light',
    items: [
      'Pet Shower',
      'Fitness Checkup',
      'Pet Grooming',
      'Hair and Nail Cut',
      'Control Hair Falling'
    ]
  },
  {
    name: 'Exclusive Pack',
    duration: '10 Days',
    price: '$350Per Visit',
    theme: 'primary',
    items: [
      'Pet Shower',
      'Fitness Checkup',
      'Pet Grooming',
      'Hair and Nail Cut',
      'Control Hair Falling',
      'Brush & Blow Dry',
      'Pet Park And Games'
    ]
  },
  {
    name: 'Premium Pack',
    duration: '30 Days',
    price: '$550Per Visit',
    theme: 'light',
    items: [
      'Pet Shower',
      'Fitness Checkup',
      'Pet Grooming',
      'Hair and Nail Cut',
      'Control Hair Falling'
    ]
  }
];

export const heroContent = {
  title: 'For Your Pet’s Natural Life & Care',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt',
  primaryCta: 'Our Services',
  secondaryCta: 'Make Appointment',
  image: heroDog
};

export const professionalBlurb = {
  title: 'Professional Pet Care',
  description:
    'Pet owners trust us to look after the needs of their beloved companions. We are specialists committed to delivering the very highest of veterinary care and affection.',
  image: prDog
};

