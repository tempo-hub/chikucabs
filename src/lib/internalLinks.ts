export function getDestination(url?: string) {
  if (!url || !url.includes("-to-")) return "";

  return (
    url
      .split("-to-")[1]
      ?.replace(/-cab-fare$/, "")
      ?.replace(/-tempo-traveller-fare$/, "")
      ?.replace(/-taxi-fare$/, "")
      ?.trim() || ""
  );
}

function normalize(dest: string) {
  return dest.toLowerCase().replace(/-/g, " ").trim();
}

const REGION_MAP: Record<string, string> = {
  shimla: "himachal",
  kufri: "himachal",
  khajjiar: "himachal",
  dharamshala: "himachal",
  mcleodganj: "himachal",
  arki: "himachal",
  baddi: "himachal",
  banjar: "himachal",
  barog: "himachal",
  barot: "himachal",
  bhota: "himachal",
  bhuntar: "himachal",
  bir: "himachal",
  chaupal: "himachal",
  chuari: "himachal",
  daulatpur: "himachal",
  dera: "himachal",
  solan: "himachal",
  sundernagar: "himachal",
  talai: "himachal",
  tattapani: "himachal",
  tira: "himachal",
  tirthan: "himachal",
  tosh: "himachal",

  // Tamil Nadu
  madurai: "tamilnadu",
  rameswaram: "tamilnadu",
  kodaikanal: "tamilnadu",
  dindigul: "tamilnadu",
  theni: "tamilnadu",
  sivakasi: "tamilnadu",
  virudhunagar: "tamilnadu",
  tirunelveli: "tamilnadu",
  thoothukudi: "tamilnadu",
  kanyakumari: "tamilnadu",
  nagercoil: "tamilnadu",
  coimbatore: "tamilnadu",
  ooty: "tamilnadu",
  mettupalayam: "tamilnadu",
  palani: "tamilnadu",
  karur: "tamilnadu",
  salem: "tamilnadu",
  erode: "tamilnadu",
  namakkal: "tamilnadu",
  tiruppur: "tamilnadu",
  pollachi: "tamilnadu",
  chennai: "tamilnadu",
  trichy: "tamilnadu",
  "madurai airport": "tamilnadu",
  yercaud: "tamilnadu",
  coonoor: "tamilnadu",
  kotagiri: "tamilnadu",
  valparai: "tamilnadu",
  tanjore: "tamilnadu",
  kumbakonam: "tamilnadu",
  chidambaram: "tamilnadu",
  velankanni: "tamilnadu",
  nagapattinam: "tamilnadu",
  pondicherry: "tamilnadu",
  mahabalipuram: "tamilnadu",
  vellore: "tamilnadu",
  yelagiri: "tamilnadu",
  hogenakkal: "tamilnadu",
  dharmapuri: "tamilnadu",
  krishnagiri: "tamilnadu",
  hosur: "tamilnadu",

  // Nearby connected South India tourist routes
  bangalore: "tamilnadu",
  mysore: "tamilnadu",
  wayanad: "tamilnadu",
  kochi: "tamilnadu",
  munnar: "tamilnadu",
  thekkady: "tamilnadu",
  alleppey: "tamilnadu",
  trivandrum: "tamilnadu",
  guruvayur: "tamilnadu",
  kovalam: "tamilnadu",

  // Madhya Pradesh
  indore: "mp",
  bhopal: "mp",
  omkareshwar: "mp",
  maheshwar: "mp",
  dewas: "mp",
  ratlam: "mp",
  mandsaur: "mp",
  neemuch: "mp",
  jaora: "mp",
  shajapur: "mp",
  "agar malwa": "mp",
  khargone: "mp",
  khandwa: "mp",
  burhanpur: "mp",
  dhar: "mp",
  mandu: "mp",
  sehore: "mp",
  vidisha: "mp",
  pachmarhi: "mp",
  sanchi: "mp",
  gwalior: "mp",
  jabalpur: "mp",
  amarkantak: "mp",
  chitrakoot: "mp",
  orchha: "mp",
  khajuraho: "mp",

  // Nearby states / connected tourist routes
  nagpur: "mp",
  kota: "mp",
  jaipur: "mp",
  ahmedabad: "mp",
  udaipur: "mp",
  "mount abu": "mp",
  ajmer: "mp",
  pushkar: "mp",
  jodhpur: "mp",
  bikaner: "mp",
  chittorgarh: "mp",
  bundi: "mp",
  shirdi: "mp",
  nashik: "mp",
  aurangabad: "mp",
  ellora: "mp",
  ajanta: "mp",
  pune: "mp",
  mumbai: "mp",
  surat: "mp",
  vadodara: "mp",
  dwarka: "mp",
  somnath: "mp",
  saputara: "mp",

  // Andhra Pradesh
  visakhapatnam: "andhra",
  "araku valley": "andhra",
  annavaram: "andhra",
  rajahmundry: "andhra",
  kakinada: "andhra",
  vijayawada: "andhra",
  guntur: "andhra",
  tirupati: "andhra",
  srikakulam: "andhra",
  vizianagaram: "andhra",

  // Odisha connected routes
  bhubaneswar: "andhra",
  puri: "andhra",
  cuttack: "andhra",

  // Telangana connected routes
  hyderabad: "andhra",
  warangal: "andhra",
  khammam: "andhra",

  // Andhra major cities
  nellore: "andhra",
  ongole: "andhra",
  kurnool: "andhra",
  kadapa: "andhra",
  chittoor: "andhra",
  amaravati: "andhra",
  eluru: "andhra",
  machilipatnam: "andhra",
  yanam: "andhra",

  // Tourist destinations
  simhachalam: "andhra",
  lambasingi: "andhra",
  "borra caves": "andhra",

  // Nearby connected states
  jagdalpur: "andhra",
  raipur: "andhra",
  kolkata: "andhra",

  // Varanasi Region Routes
  varanasi: "varanasi",
  prayagraj: "varanasi",
  allahabad: "varanasi",
  ayodhya: "varanasi",
  faizabad: "varanasi",
  lucknow: "varanasi",
  gorakhpur: "varanasi",
  patna: "varanasi",
  bodh: "varanasi",
  "bodh gaya": "varanasi",
  gaya: "varanasi",
  ranchi: "varanasi",
  kanpur: "varanasi",
  delhi: "varanasi",
  agra: "varanasi",
  mathura: "varanasi",
  vrindavan: "varanasi",
  // jaipur: "varanasi",
  haridwar: "varanasi",
  rishikesh: "varanasi",
  dehradun: "varanasi",
  kathmandu: "varanasi",
  sonbhadra: "varanasi",
  mirzapur: "varanasi",
  chunar: "varanasi",
  ghazipur: "varanasi",
  ballia: "varanasi",
  mau: "varanasi",
  azamgarh: "varanasi",
  jaunpur: "varanasi",
  sultanpur: "varanasi",
  amethi: "varanasi",
  raebareli: "varanasi",
  basti: "varanasi",
  kushinagar: "varanasi",
  "nepal border": "varanasi",
  sasaram: "varanasi",
  "aurangabad bihar": "varanasi",
  dhanbad: "varanasi",
  // kolkata: "varanasi",
  // puri: "varanasi",
  // bhubaneswar: "varanasi",
  jamshedpur: "varanasi",
  hazaribagh: "varanasi",
  rewa: "varanasi",
  satna: "varanasi",
  // khajuraho: "varanasi",
  // jabalpur: "varanasi",
  // bhopal: "varanasi",
  // indore: "varanasi",
  "allahabad airport": "varanasi",
  "lal bahadur shastri airport": "varanasi",
  "agra airport": "varanasi",
  "lucknow airport": "varanasi",
  "gorakhpur airport": "varanasi",
  "patna airport": "varanasi",
  "bodh gaya airport": "varanasi",
  sarnath: "varanasi",
  ramnagar: "varanasi",
  vindhyachal: "varanasi",
  shaktinagar: "varanasi",
  robertsganj: "varanasi",
  "dehri on sone": "varanasi",
  buxar: "varanasi",
  ara: "varanasi",
  hajipur: "varanasi",
  muzaffarpur: "varanasi",
  darbhanga: "varanasi",
  sitamarhi: "varanasi",
  motihari: "varanasi",
  bettiah: "varanasi",
  siwan: "varanasi",
  chapra: "varanasi",
  gopalganj: "varanasi",
  lumbini: "varanasi",
  // chitrakoot: "varanasi",
  noida: "varanasi",
  "greater noida": "varanasi",
  gurgaon: "varanasi",
  faridabad: "varanasi",
  jhansi: "varanasi",
  "varanasi airport": "varanasi",
  daltonganj: "varanasi",
  latehar: "varanasi",
  chatra: "varanasi",
  deoghar: "varanasi",
  parasnath: "varanasi",
};

function getRegion(dest: string): string {
  return REGION_MAP[normalize(dest)] || "other";
}

export function getNearbyRoutes(
  currentUrl: string,
  routes: { slug: string }[],
) {
  const currentDest = getDestination(currentUrl);
  const currentRegion = getRegion(currentDest);

  return routes
    .filter((r) => r.slug !== currentUrl)
    .filter((r) => {
      const dest = getDestination(r.slug);
      return getRegion(dest) === currentRegion;
    })
    .slice(0, 8);
}

// FINAL FIXED
export function getAnchorText(slug: string) {
  const parts = slug.split("/");
  const city = parts[1] || "city";

  const dest = getDestination(slug);

  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);

  const formattedDest = dest
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return `${formattedCity} → ${formattedDest}`;
}
