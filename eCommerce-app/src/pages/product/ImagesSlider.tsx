import { Carousel, Modal, Image, Spin } from 'antd';
import { FC, useState, useEffect } from 'react';
import styles from './ProductImageSlider.module.css';

interface ProductImageSliderProps {
    images: string[];
}

export const ProductImageSlider: FC<ProductImageSliderProps> = ({ images }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState<string[]>([]);

    useEffect(() => {
        if (images.length > 0) {
            setLoading(true);

            const loadImages = async (): Promise<void> => {
                const promises = images.map((img: string) => {
                    return new Promise<string>((resolve) => {
                        const imgObj: HTMLImageElement = document.createElement('img');;
                        imgObj.src = img;
                        imgObj.addEventListener('load', () => {
                            resolve(img);
                        }, { once: true });
                    })
                })
                const loaded = await Promise.all(promises);
                setLoadedImages(loaded);
                setLoading(false);
            }
            loadImages();
        }
    }, [images]);

    if (loading) {
        return <Spin size="large" className={styles.spinner} />;
    }
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
                {loadedImages.map((img, index) => (
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
                    {loadedImages.map((img, index) => (
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