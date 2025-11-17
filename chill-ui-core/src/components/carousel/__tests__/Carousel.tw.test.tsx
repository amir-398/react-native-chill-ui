import { Carousel } from '../components/Carousel.tw';
import { CarouselContent } from '../components/CarouselContent.tw';
import { CarouselItem } from '../components/CarouselItem.tw';
import { CarouselElement } from '../components/CarouselElement.tw';
import { CarouselDots } from '../components/CarouselDots.tw';
import { CarouselPrevious } from '../components/CarouselPrevious.tw';
import { CarouselNext } from '../components/CarouselNext.tw';

describe('Carousel Component (Tailwind)', () => {
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
