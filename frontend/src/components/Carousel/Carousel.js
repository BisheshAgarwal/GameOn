import React from "react";
import { Carousel } from "react-bootstrap";

import styles from "./Carousel.module.css";
import Button from "../Button/Button";

const ProductCarousel = (props) => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    src="/images/carousel-image-1.jpg"
                    alt="Valhalla"
                    className={styles.CarouselImg}
                ></img>
                <Carousel.Caption className={styles.CarouselCaption}>
                    <div>
                        <h1 className={styles.CarouselHeading}>Ac Valhalla</h1>
                        <p className={styles.CarouselText}>
                            Assassin's Creed Valhalla is an upcoming action
                            role-playing video game developed by Ubisoft
                            Montreal and published by Ubisoft.
                        </p>
                        <Button link={`/product/${props.id1}`}>
                            View Details
                        </Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    src="/images/carousel-image-2.png"
                    alt="Cyberpunk 2077"
                    className={styles.CarouselImg}
                ></img>
                <Carousel.Caption className={styles.CarouselCaption}>
                    <div>
                        <h1 className={styles.CarouselHeading}>
                            Cyberpunk 2077
                        </h1>
                        <p className={styles.CarouselText}>
                            Cyberpunk 2077 is an upcoming action role-playing
                            video game developed and published by CD Projekt. It
                            is scheduled to be released for all platforms on 10
                            December 2020.
                        </p>
                        <Button link={`/product/${props.id2}`}>
                            View Details
                        </Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    src="/images/carousel-image-3.jpg"
                    alt="Forza Horizon 4"
                    className={styles.CarouselImg}
                ></img>
                <Carousel.Caption className={styles.CarouselCaption}>
                    <div>
                        <h1 className={styles.CarouselHeading}>
                            Forza Horizon 4
                        </h1>
                        <p className={styles.CarouselText}>
                            Forza Horizon 4 is a 2018 racing video game
                            developed by Playground Games and published by
                            Microsoft Studios. It was released on 2 October 2018
                            on all platforms.
                        </p>
                        <Button link={`/product/${props.id3}`}>
                            View Details
                        </Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default ProductCarousel;
