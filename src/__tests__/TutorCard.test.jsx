import { render, screen } from '@testing-library/react';
import TutorCard from '../components/TutorCard';

test('карточка репетитора містить атрибут lazy loading', () => {
  const mockTutor = {
    id: 1,
    name: 'Олена Петрівна',
    subjects: ['Математика'],
    price: 500,
    city: 'Київ',
    format: 'online',
    rating: 5.0,
    image: 'test.jpg',
    reviews: []
  };

  render(
    <TutorCard 
      tutor={mockTutor} 
      favorites={[]} 
      onSelect={() => {}} 
      onToggleFavorite={() => {}} 
    />
  );

  const img = screen.getByRole('img');
  expect(img.getAttribute('loading')).toBe('lazy');
});