"use client";

import { UpsertDocumentModel } from "@entities";
import { Swiper } from "antd-mobile";
import Image from "next/image";
import { FC } from "react";

type ImageSliderProps = {
  images?: UpsertDocumentModel[];
  width?: number;
  height?: number;
};

const ImageSlider: FC<ImageSliderProps> = ({
  images,
  width,
  height = width,
}) => {
  return !!images?.length ? (
    <Swiper style={{ height: "100%" }}>
      {images.map((img, index) => (
        <Swiper.Item key={index}>
          <Image
            height={height}
            width={width}
            src={img.url}
            alt={img.url}
            fill
            objectFit="cover"
          />
        </Swiper.Item>
      ))}
    </Swiper>
  ) : (
    <Swiper style={{ height: "100%" }}>
      <Swiper.Item>
        <Image
          height={height}
          width={width}
          src="/404-image.jpg"
          alt="404-image"
          fill
          objectFit="cover"
        />
      </Swiper.Item>
    </Swiper>
  );
};

export default ImageSlider;
