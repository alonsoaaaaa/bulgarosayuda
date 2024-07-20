/**
 * All the variables for calculating kefir excellence
 * @property {number} kefir - The kefir grains in grams
 */
type CalculatorData = {
  kefir: number;
  milk: number;
  temperature: number;
  time: number;
};
/**
 * Info and location groups of each state
 * @property {LocationInformation[]} locations - Array of municipalities
 */
type StateInformation = {
  id: number;
  state: string;
  image: string;
  locations: LocationInformation[];
};

/**
 * Specific municipality Info
 */
type LocationInformation = {
  name: string;
  link: string;
};
/**
 * Page url id to search for municipality in db
 */
type LocationParams = {
  id: string;
};
/**
 * Status of the form to control bugs and UX
 */
type UploadStatus = "idle" | "uploading" | "uploaded";

type ImageApiResponse = {
  imageUrl: string;
};
