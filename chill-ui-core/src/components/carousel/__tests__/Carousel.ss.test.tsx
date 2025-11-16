import { Carousel } from '../components/Carousel.ss';
import { CarouselContent } from '../components/CarouselContent.ss';
import { CarouselItem } from '../components/CarouselItem.ss';
import { CarouselElement } from '../components/CarouselElement.ss';
import { CarouselDots } from '../components/CarouselDots.ss';
import { CarouselPrevious } from '../components/CarouselPrevious.ss';
import { CarouselNext } from '../components/CarouselNext.ss';

describe('Carousel Component (StyleSheet)', () => {
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
