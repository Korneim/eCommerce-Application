import { Carousel, Modal, Image } from 'antd';
import { FC, useState } from 'react';
import styles from './ProductImageSlider.module.css';

interface ProductImageSliderProps {
    images: string[];
}

export const ProductImageSlider: FC<ProductImageSliderProps> = ({ images }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const showModal = (index: number) : void => {
        setCurrentSlide(index);
        setIsModalOpen(true);
    };

    const handleCancel = () : void => {
        setIsModalOpen(false);
    };

    const handleMainCarouselChange = (current: number): void => {
        setCurrentSlide(current);
    };

    return (
        <div className={styles.slidercontainer}>
            <Carousel
                afterChange={handleMainCarouselChange}
                dots={{ className: styles.customdots }}
                arrows
                infinite={false}
            >
                {images.map((img, index) => (
                    <div key={index} className={styles.slide}>
                        <Image
                            src={img}
                            alt={`Product image ${index + 1}`}
                            preview={false}
                            onClick={() => showModal(index)}
                            className={styles.productimage}
                        />
                    </div>
                ))}
            </Carousel>

            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width="80%"
                centered
                className={styles.imagemodal}
                closeIcon={<span className={styles.closeicon}>×</span>}
            >
                <Carousel
                    initialSlide={currentSlide}
                    dots={{ className: styles.modaldots }}
                    arrows
                    infinite={false}
                    className={styles.modalcarousel}
                >
                    {images.map((img, index) => (
                        <div key={index} className={styles.modalslide}>
                            <Image
                                src={img}
                                alt={`Enlarged product image ${index + 1}`}
                                preview={false}
                                className={styles.enlargedimage}
                            />
                        </div>
                    ))}
                </Carousel>
            </Modal>
        </div>
    );
};