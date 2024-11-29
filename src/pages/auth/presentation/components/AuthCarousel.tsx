import { Carousel, CarouselProps } from 'antd';

interface LoginCarouselProps extends CarouselProps {
  images: { src: string; alt: string }[];
}

function LoginCarousel({ images, ...others }: LoginCarouselProps) {
  return (
    <Carousel {...others}>
      {images.map((image, index) => (
        <div key={index} className="h-screen w-full relative">
          <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
          <div className="absolute top-0 left-0 w-full h-full bg-dark-950/80"></div>
        </div>
      ))}
    </Carousel>
  );
}

export default LoginCarousel;
