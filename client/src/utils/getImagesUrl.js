import Axios from "axios";

export const getInteriorLinks =  (VINum) => {

  return {
    front:`https://${process.env.DO_SPACE_BUCKET_NAME}.${process.env.DO_SPACE_ENDPOINT}/HooHoop/uploads/cars/${VINum}/interior360/interiorfront.jpg`,
    middle:`https://${process.env.DO_SPACE_BUCKET_NAME}.${process.env.DO_SPACE_ENDPOINT}/HooHoop/uploads/cars/${VINum}/interior360/interiormiddle.jpg`,
    rear:`https://${process.env.DO_SPACE_BUCKET_NAME}.${process.env.DO_SPACE_ENDPOINT}/HooHoop/uploads/cars/${VINum}/interior360/interiorrear.jpg`,
  }
};

export const getSliderLinks = (VINum,noOfImages) => {
    let arr = [];
    for(let i = 1; i <= noOfImages; i++){
      arr.push(
        `https://${process.env.DO_SPACE_BUCKET_NAME}.${process.env.DO_SPACE_ENDPOINT}/HooHoop/uploads/cars/${VINum}/exterior/Photo_${i}.jpg`
      )
    }
    return arr;
}

export const getFramesFolder = (VINum) => {
  return `https://${process.env.DO_SPACE_BUCKET_NAME}.${process.env.DO_SPACE_ENDPOINT}/HooHoop/uploads/cars/${VINum}/exterior360/`
}
export const getThumbnailLink = (VINum) => {
    return `https://${process.env.DO_SPACE_BUCKET_NAME}.${process.env.DO_SPACE_ENDPOINT}/HooHoop/uploads/cars/${VINum}/thumbnail/Photo300.jpg`
}

export const getSmallThumbnailLink = (VINum) => {
  return `https://${process.env.DO_SPACE_BUCKET_NAME}.${process.env.DO_SPACE_ENDPOINT}/HooHoop/uploads/cars/${VINum}/thumbnail/Photo30.jpg`
}
