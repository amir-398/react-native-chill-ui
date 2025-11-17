import { Carousel } from '../components/Carousel.hybrid';
import { CarouselContent } from '../components/CarouselContent.hybrid';
import { CarouselItem } from '../components/CarouselItem.hybrid';
import { CarouselElement } from '../components/CarouselElement.hybrid';
import { CarouselDots } from '../components/CarouselDots.hybrid';
import { CarouselPrevious } from '../components/CarouselPrevious.hybrid';
import { CarouselNext } from '../components/CarouselNext.hybrid';

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
