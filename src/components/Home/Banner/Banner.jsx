import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Banner = () => {
    return (
        <div className="-mt-24">
            <Carousel autoPlay infiniteLoop dynamicHeight>
                <div>
                <img className="" src="https://i.ibb.co/m03KCHH/how-to-build-an-apartment-complex-green.jpg" />
                    
                </div>
                <div>
                <img src="https://i.ibb.co/mvrF0pq/2.jpg" />
                    
                </div>
                <div>
                    <img src="https://i.ibb.co/B32PVvz/171030143526-960-fifth-avenue-2.jpg" />
                    
                </div>
                <div>
                    <img src="https://i.ibb.co/4F1sJvY/interior-design-of-apartments-building-entrance-ha-3d-model-223704.webp" />
                    
                </div>
                <div>
                    <img src="https://i.ibb.co/phtZwng/Interior-Design-Morris-Adjmi-Architects-idx231101-roundup25.jpg" />
                    
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;