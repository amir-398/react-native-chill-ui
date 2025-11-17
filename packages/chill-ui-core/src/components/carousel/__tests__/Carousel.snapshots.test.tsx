import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselElement,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../index';

describe('Carousel Snapshots', () => {
  it('should export Carousel for snapshots', () => {
    expect(Carousel).toBeDefined();
  });

  it('should export CarouselContent for snapshots', () => {
    expect(CarouselContent).toBeDefined();
  });

  it('should export CarouselItem for snapshots', () => {
    expect(CarouselItem).toBeDefined();
  });

  it('should export CarouselElement for snapshots', () => {
    expect(CarouselElement).toBeDefined();
  });

  it('should export CarouselDots for snapshots', () => {
    expect(CarouselDots).toBeDefined();
  });

  it('should export CarouselPrevious for snapshots', () => {
    expect(CarouselPrevious).toBeDefined();
  });

  it('should export CarouselNext for snapshots', () => {
    expect(CarouselNext).toBeDefined();
  });
});
