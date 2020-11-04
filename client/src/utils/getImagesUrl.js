import Axios from "axios";

const fetchImage = (url) => {
  return Axios.get(url,{
    responseType: 'arraybuffer'
  })
  .then(console.log)
  .catch(console.log);
}

export const getInteriorLinks = async (VINum) => {
  fetchImage(`https://${process.env.DO_SPACE_BUCKET_NAME}.${process.env.DO_SPACE_ENDPOINT}/HooHoop/uploads/cars/${VINum}/interior360/interiorfront.jpg`);
  fetchImage(`https://${process.env.DO_SPACE_BUCKET_NAME}.${process.env.DO_SPACE_ENDPOINT}/HooHoop/uploads/cars/${VINum}/interior360/interiormiddle.jpg`);
  fetchImage(`https://${process.env.DO_SPACE_BUCKET_NAME}.${process.env.DO_SPACE_ENDPOINT}/HooHoop/uploads/cars/${VINum}/interior360/interiorrear.jpg`);

  return {
    front:`https://${process.env.DO_SPACE_BUCKET_NAME}.${process.env.DO_SPACE_ENDPOINT}/HooHoop/uploads/cars/${VINum}/interior360/interiorfront.jpg`,
    middle:`https://${process.env.DO_SPACE_BUCKET_NAME}.${process.env.DO_SPACE_ENDPOINT}/HooHoop/uploads/cars/${VINum}/interior360/interiormiddle.jpg`,
    rear:`https://${process.env.DO_SPACE_BUCKET_NAME}.${process.env.DO_SPACE_ENDPOINT}/HooHoop/uploads/cars/${VINum}/interior360/interiorrear.jpg`,
  }
};

export const getThumbnailLink = (VINum) => {
    return `https://${process.env.DO_SPACE_BUCKET_NAME}.${process.env.DO_SPACE_ENDPOINT}/HooHoop/uploads/cars/${VINum}/thumbnail/Photo300.jpg`
}

