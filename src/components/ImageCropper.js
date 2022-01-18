import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import create from "zustand";

const useCroppedImage = create((set) => ({
  image: null,
}));

export const getCroppedImage = () => {
  return useCroppedImage.getState().image;
};

const Input = styled("input")({
  display: "none",
});

export default function ImageCropper() {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "%",
    height: 80,
    aspect: 1,
    x: 10,
    y: 10,
    circularCrop: true,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const convertCanvasToFile = (canvas, filename) => {
    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          blob.name = filename;
          resolve(blob);
        },
        "image/jpeg",
        0.6
      );
    });
  };

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width * scaleX, crop.height * scaleY);
    // convert canvas to blob

    convertCanvasToFile(canvas, "updateprofile.jpg").then((res) => {
      useCroppedImage.setState({ image: res });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedCrop]);

  return (
    <div>
      <div>
        <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" type="file" onChange={onSelectFile} />
          <Button fullWidth variant="contained" component="span" endIcon={<PhotoCamera />} style={{ marginBottom: "1em" }}>
            Unggah
          </Button>
        </label>
      </div>
      <ReactCrop circularCrop={true} src={upImg} onImageLoaded={onLoad} crop={crop} onChange={(c) => setCrop(c)} onComplete={(c) => setCompletedCrop(c)} />
      <div className="flex-center">
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
            borderRadius: "50%",
          }}
        />
      </div>
    </div>
  );
}
