import { Carousel } from '../components/Carousel';
import { CarouselContent } from '../components/CarouselContent';
import { CarouselItem } from '../components/CarouselItem';
import { CarouselElement } from '../components/CarouselElement';
import { CarouselDots } from '../components/CarouselDots';
import { CarouselPrevious } from '../components/CarouselPrevious';
import { CarouselNext } from '../components/CarouselNext';

describe('Carousel Component (Hybrid)', () => {
  it('should export Carousel component', () => {
    expect(Carousel).toBeDefined();
  });

  it('should export CarouselContent component', () => {
    expect(CarouselContent).toBeDefined();
  });

  it('should export CarouselItem component', () => {
    expect(CarouselItem).toBeDefined();
  });

  it('should export CarouselElement component', () => {
    expect(CarouselElement).toBeDefined();
  });

  it('should export CarouselDots component', () => {
    expect(CarouselDots).toBeDefined();
  });

  it('should export CarouselPrevious component', () => {
    expect(CarouselPrevious).toBeDefined();
  });

  it('should export CarouselNext component', () => {
    expect(CarouselNext).toBeDefined();
  });
});
