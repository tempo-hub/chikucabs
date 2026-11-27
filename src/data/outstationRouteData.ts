import { localDominanceData } from "./localDominanceData";

// ============================================================
// TYPES
// ============================================================

export interface SightseeingSpot {
  name: string;
  desc: string;
  type: "Temple / Pilgrimage" | "Heritage & Monument" | "Scenic Nature" | "Shopping & Culture" | "Leisure & Family";
}

export interface TransitStop {
  name: string;
  desc: string;
}

export interface FoodStop {
  name: string;
  location: string;
  specialty: string;
}

export interface TravelPurpose {
  title: string;
  desc: string;
  icon: string;
  tag: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface RouteBookingInfo {
  cancellationPolicy: string;
  waitingPolicy: string;
  luggagePolicy: string;
  nightCharges: string;
  bookingSteps: Array<{
    step: string;
    title: string;
    desc: string;
    icon: string;
  }>;
}

export interface RouteIntelligence {
  startCity: string;
  endCity: string;
  distance: number;
  estimatedHours: number;
  highway: string;
  roadCondition: string;
  tollPlazas: number;
  tollEstimate: number;
  majorStops: TransitStop[];
  foodStops: FoodStop[];
  pickupLocalities: string[];
  dropPoints: string[];
  destinationSightseeing: SightseeingSpot[];
  travelPurposes: TravelPurpose[];
  faqs: FAQItem[];
  bookingInfo: RouteBookingInfo;
}

interface CityDataEntry {
  localAreas: string[];
  touristPlaces: SightseeingSpot[];
  airports?: string[];
  railwayStations?: string[];
  landmarks?: string[];
}

// ============================================================
// COMPREHENSIVE CITY INTELLIGENCE MAP
// Covers major origins and destinations across Gujarat, North,
// West, South, Central & East India.
// ============================================================

export const CITY_INTELLIGENCE: Record<string, CityDataEntry> = {
  ahmedabad: {
    localAreas: [
      "Vastrapur", "Bodakdev", "Satellite", "Prahlad Nagar", "SG Highway",
      "Navrangpura", "Maninagar", "Bopal & South Bopal", "Thaltej", "Gota",
      "Chandkheda", "Nikol & Naroda", "Paldi", "Ashram Road", "Airport Circle"
    ],
    touristPlaces: [
      { name: "Sabarmati Ashram", desc: "Mahatma Gandhi's iconic residence and museum along the river.", type: "Heritage & Monument" },
      { name: "Sabarmati Riverfront", desc: "Scenic river promenade with flower garden, boating and walks.", type: "Scenic Nature" },
      { name: "Adalaj Stepwell (Rudabai Vav)", desc: "15th-century intricately carved 5-storey subterranean stepwell.", type: "Heritage & Monument" },
      { name: "Akshardham Temple (Gandhinagar)", desc: "Grand pink sandstone cultural and spiritual complex.", type: "Temple / Pilgrimage" },
      { name: "Science City", desc: "Interactive robotics gallery, aquatic gallery and IMAX 3D theatre.", type: "Leisure & Family" },
      { name: "Kankaria Lake", desc: "Historic 15th-century lake with zoo, toy train and balloon safari.", type: "Leisure & Family" },
      { name: "Sidi Saiyyed Mosque", desc: "World-famous 'Tree of Life' marble jali architecture in old city.", type: "Heritage & Monument" },
      { name: "Law Garden Night Market", desc: "Vibrant traditional handicraft stalls, bandhani textiles and street food.", type: "Shopping & Culture" }
    ],
    airports: ["Sardar Vallabhbhai Patel International Airport (AMD)"],
    railwayStations: ["Ahmedabad Junction (Kalupur - ADI)", "Sabarmati Junction (SBT)", "Maninagar (MAN)"]
  },

  surat: {
    localAreas: [
      "Athwa Lines", "Adajan", "Vesu", "Pal", "Piplod",
      "Varachha", "Katargam", "City Light", "Rander", "Dumas Road",
      "Udhna", "Althan", "Ghod Dod Road", "Ring Road Textile Hub"
    ],
    touristPlaces: [
      { name: "Dumas Beach", desc: "Popular black sand beach famous for sunset views and lashkari bhajiya.", type: "Scenic Nature" },
      { name: "Surat Castle (Old Fort)", desc: "16th-century fortress built by Khudawand Khan on Tapi riverbank.", type: "Heritage & Monument" },
      { name: "Dutch & Armenian Cemeteries", desc: "Historic monumental colonial-era mausoleums at Katargam.", type: "Heritage & Monument" },
      { name: "Sarthana Nature Park", desc: "Sprawling wildlife zoo and botanical reserve alongside Tapi.", type: "Leisure & Family" },
      { name: "Gopi Talav", desc: "Restored historical urban lake with amusement zone and musical fountain.", type: "Leisure & Family" },
      { name: "Iskcon Temple Jahangirpura", desc: "Spiritual temple sanctuary adorned with intricate carvings.", type: "Temple / Pilgrimage" },
      { name: "VR Surat Mall & Dumas Road", desc: "Prime shopping, dining and entertainment lifestyle destination.", type: "Shopping & Culture" }
    ],
    airports: ["Surat International Airport (STV)"],
    railwayStations: ["Surat Railway Station (ST)", "Udhna Junction (UDN)"]
  },

  vadodara: {
    localAreas: [
      "Alkapuri", "Sayajigunj", "Manjalpur", "Vasna-Bhayli", "Akota",
      "Gotri", "Fatehgunj", "Karelibaug", "Sama-Savli Road", "Waghodia Road",
      "Gorwa", "Nizampura", "Makarpura", "Old Padra Road"
    ],
    touristPlaces: [
      { name: "Laxmi Vilas Palace", desc: "Four times the size of Buckingham Palace, grand Gaekwad royal residence.", type: "Heritage & Monument" },
      { name: "Sayaji Baug (Kamati Baug)", desc: "Sprawling 113-acre royal garden with zoo, planetarium and toy train.", type: "Leisure & Family" },
      { name: "Baroda Museum & Picture Gallery", desc: "Rich collection of European oil paintings, sculptures and Asian artifacts.", type: "Heritage & Monument" },
      { name: "EME Temple (Dakshinamurthy)", desc: "Unique geodesic aluminium alloy military temple dedicated to Lord Shiva.", type: "Temple / Pilgrimage" },
      { name: "Kirti Mandir", desc: "Memorial cenotaph complex honouring the Gaekwad dynasty of Baroda.", type: "Heritage & Monument" },
      { name: "Sursagar Lake", desc: "Iconic central lake with a 120-foot tall golden Lord Shiva statue.", type: "Scenic Nature" },
      { name: "Champaner-Pavagadh (Nearby)", desc: "UNESCO World Heritage archaeological park and Kalika Mata hilltop shrine.", type: "Heritage & Monument" }
    ],
    airports: ["Vadodara Civil Airport (Harni - BDQ)"],
    railwayStations: ["Vadodara Junction (BRC)"]
  },

  rajkot: {
    localAreas: [
      "Kalawad Road", "150 Feet Ring Road", "Yagnik Road", "Madhapar",
      "University Road", "Kothariya", "Mavdi", "Raiya Road", "Bhaktinagar", "Tagore Road"
    ],
    touristPlaces: [
      { name: "Kaba Gandhi No Delo", desc: "Mahatma Gandhi's ancestral childhood home, now a heritage memorial museum.", type: "Heritage & Monument" },
      { name: "Watson Museum", desc: "Colonial Jubilee Garden museum featuring Saurashtra historical artifacts.", type: "Heritage & Monument" },
      { name: "Rotary Dolls Museum", desc: "Unique global collection of over 1,600 dolls representing 102 countries.", type: "Leisure & Family" },
      { name: "Aji Dam & Garden", desc: "Scenic reservoir supplying water with landscaped park and evening lighting.", type: "Scenic Nature" },
      { name: "Ishwariya Temple & Lake Park", desc: "Peaceful hillside Shiva temple with scenic boating and picnic grounds.", type: "Temple / Pilgrimage" },
      { name: "Race Course Ground", desc: "Central recreational hub with sports complexes, children's park and jogging tracks.", type: "Leisure & Family" },
      { name: "Chotila Chamunda Mata (Nearby)", desc: "Sacred hilltop temple sanctuary revered across Saurashtra.", type: "Temple / Pilgrimage" }
    ],
    airports: ["Rajkot International Airport (Hirasar - HSR)"],
    railwayStations: ["Rajkot Junction (RJT)", "Bhakti Nagar (BKNG)"]
  },

  gandhinagar: {
    localAreas: [
      "Sector 1 to 30", "Infocity", "Kudasan", "Raysan", "Sargasan",
      "GIFT City", "Bhaijipura", "Koba Circle", "Vavol", "Chiloda"
    ],
    touristPlaces: [
      { name: "Akshardham Temple", desc: "Magnificent temple, gardens, water show and spiritual exhibition halls.", type: "Temple / Pilgrimage" },
      { name: "Indroda Dinosaur & Fossil Park", desc: "India's 'Jurassic Park' with life-size dinosaur models, zoo and fossil beds.", type: "Leisure & Family" },
      { name: "Mahatma Mandir", desc: "State-of-the-art international convention centre inspired by Gandhi's philosophy.", type: "Heritage & Monument" },
      { name: "Dandi Kutir", desc: "World's largest museum dedicated solely to Mahatma Gandhi's life and salt march.", type: "Heritage & Monument" },
      { name: "Sarita Udyan", desc: "Picturesque park on the Sabarmati riverfront popular for peacocks and picnic walks.", type: "Scenic Nature" },
      { name: "GIFT City Promenade", desc: "Ultra-modern financial hub showcasing futuristic architecture and towers.", type: "Shopping & Culture" }
    ],
    airports: ["Sardar Vallabhbhai Patel Int'l Airport (AMD - 18 km)"],
    railwayStations: ["Gandhinagar Capital (GNC)"]
  },

  somnath: {
    localAreas: [
      "Somnath Temple Precinct", "Prabhas Patan", "Veraval Town", "Bypass Highway",
      "Triveni Sangam Ghat", "Chowpati Beach Road", "Veraval Port"
    ],
    touristPlaces: [
      { name: "Somnath Jyotirlinga Temple", desc: "First of the twelve sacred Jyotirlingas of Lord Shiva on the Arabian Sea coast.", type: "Temple / Pilgrimage" },
      { name: "Triveni Sangam", desc: "Holy confluence of Hiran, Kapila and mythical Saraswati rivers for sacred rituals.", type: "Temple / Pilgrimage" },
      { name: "Bhalka Tirtha", desc: "Sacred spot where Lord Krishna was struck by an arrow before ascending to heavenly abode.", type: "Temple / Pilgrimage" },
      { name: "Somnath Beach & Promenade", desc: "Breezy coastal walkway offering stunning views of temple lighting and ocean waves.", type: "Scenic Nature" },
      { name: "Sound & Light Show (Jay Somnath)", desc: "Evening multimedia projection narrating the epic resurrection history of Somnath.", type: "Heritage & Monument" },
      { name: "Gita Mandir & Laxminarayan Temple", desc: "Beautiful marble shrine with 18 chapters of Bhagavad Gita engraved on pillars.", type: "Temple / Pilgrimage" }
    ],
    airports: ["Keshod Airport (45 km)", "Diu Airport (85 km)", "Rajkot Airport (195 km)"],
    railwayStations: ["Somnath (SMNH)", "Veraval Junction (VRL)"]
  },

  dwarka: {
    localAreas: [
      "Dwarkadhish Temple Area", "Gomti Ghat", "Siddheshwar Colony", "Shivrajpur Beach Road",
      "Rupen Harbour", "Okha Bypass", "Dwaraka Railway Station Colony"
    ],
    touristPlaces: [
      { name: "Dwarkadhish Temple (Jagat Mandir)", desc: "Char Dham pilgrimage shrine dedicated to Lord Krishna with a 5-storey spire.", type: "Temple / Pilgrimage" },
      { name: "Beyt Dwarka (Island)", desc: "Island sanctuary believed to be the original residence of Lord Krishna, reached via Sudarshan Setu.", type: "Temple / Pilgrimage" },
      { name: "Sudarshan Setu (Okha-Beyt Bridge)", desc: "India's longest cable-stayed bridge spanning 2.32 km across the Gulf of Kutch.", type: "Heritage & Monument" },
      { name: "Nageshwar Jyotirlinga", desc: "Revered Jyotirlinga temple housing a massive 80-foot towering statue of Lord Shiva.", type: "Temple / Pilgrimage" },
      { name: "Shivrajpur Beach", desc: "Prestigious Blue Flag certified beach with crystal clear waters and watersports.", type: "Scenic Nature" },
      { name: "Gomti Ghat & Sudama Setu", desc: "Holy river steps for sacred snan and suspension bridge leading to coastal sands.", type: "Temple / Pilgrimage" },
      { name: "Rukmini Devi Temple", desc: "Charming 12th-century stone temple known for ornate exterior carvings.", type: "Temple / Pilgrimage" }
    ],
    airports: ["Jamnagar Airport (130 km)", "Porbandar Airport (105 km)", "Rajkot Airport (225 km)"],
    railwayStations: ["Dwarka (DWK)", "Okha (OKHA)"]
  },

  kevadia: {
    localAreas: [
      "Statue of Unity Complex", "Ekta Nagar Railway Station Colony", "Tent City 1 & 2",
      "Garudeshwar", "Rajpipla Road", "Shreshtha Bharat Bhavan", "Narmada Dam Viewpoint"
    ],
    touristPlaces: [
      { name: "Statue of Unity (182m)", desc: "World's tallest monument honoring Sardar Vallabhbhai Patel with high-speed viewing gallery.", type: "Heritage & Monument" },
      { name: "Sardar Sarovar Dam", desc: "One of the world's largest gravity concrete dams on the holy Narmada River.", type: "Scenic Nature" },
      { name: "Valley of Flowers (Bharat Van)", desc: "Sprawling 24-acre landscaped floral garden alongside the Narmada.", type: "Scenic Nature" },
      { name: "Jungle Safari & Zoological Park", desc: "State-of-the-art geo-fenced zoo housing exotic global fauna and bird aviaries.", type: "Leisure & Family" },
      { name: "Glow Garden (Ekta Glow Garden)", desc: "Illuminated nighttime wonderland with glowing botanical figures and LED sculptures.", type: "Leisure & Family" },
      { name: "Miyawaki Forest & Maze Garden", desc: "Dense Japanese micro-forest and labyrinth maze adjacent to the statue.", type: "Scenic Nature" },
      { name: "Narmada Aarti at Gora Ghat", desc: "Mesmerizing evening river aarti ritual accompanied by Vedic chants.", type: "Temple / Pilgrimage" }
    ],
    airports: ["Vadodara Airport (85 km)", "Surat Airport (155 km)", "Ahmedabad Airport (195 km)"],
    railwayStations: ["Ekta Nagar (EKNR)"]
  },

  "mount-abu": {
    localAreas: [
      "Nakki Lake Promenade", "Dilwara Road", "Sunset Point Road", "Achalgarh",
      "Guru Shikhar Foothills", "Palanpur Highway Checkpost", "Main Mall Bazaar"
    ],
    touristPlaces: [
      { name: "Dilwara Jain Temples", desc: "World-renowned 11th-century marble marvel with breathtakingly delicate ceiling carvings.", type: "Temple / Pilgrimage" },
      { name: "Nakki Lake", desc: "Sacred picturesque hill station lake with pedal boating and Toad Rock hike.", type: "Scenic Nature" },
      { name: "Guru Shikhar", desc: "Highest peak of the Aravalli range (1,722m) offering 360-degree panoramic valley views.", type: "Scenic Nature" },
      { name: "Sunset Point & Honeymoon Point", desc: "Spectacular vantage point overlooking twilight hills and sun descending into the horizon.", type: "Scenic Nature" },
      { name: "Achalgarh Fort & Achaleshwar Mahadev", desc: "Paramara-era citadel with a foot-toe shrine of Lord Shiva and brass Nandi.", type: "Heritage & Monument" },
      { name: "Trevor's Tank & Mount Abu Sanctuary", desc: "Secluded forest nature spot famous for birdwatching and crocodile sightings.", type: "Scenic Nature" }
    ],
    airports: ["Udaipur Maharana Pratap Airport (165 km)", "Ahmedabad Airport (225 km)"],
    railwayStations: ["Abu Road (ABR - 28 km)"]
  },

  udaipur: {
    localAreas: [
      "Panchwati", "Fateh Sagar Lake Road", "Sukhadia Circle", "Hiran Magri",
      "Shobhagpura", "Bhuwana", "Old City (Lal Ghat / Gangaur Ghat)", "Udaipole"
    ],
    touristPlaces: [
      { name: "City Palace Complex", desc: "Majestic palace complex perched on the eastern bank of Lake Pichola.", type: "Heritage & Monument" },
      { name: "Lake Pichola & Jag Mandir", desc: "Historic romantic lake featuring boat rides to the island water palace.", type: "Scenic Nature" },
      { name: "Fateh Sagar Lake & Nehru Park", desc: "Scenic artificial lake with lakeside promenade and island café.", type: "Scenic Nature" },
      { name: "Saheliyon Ki Bari", desc: "Historic royal garden of maids adorned with marble fountains and lotus pools.", type: "Heritage & Monument" },
      { name: "Jagdish Temple", desc: "Grand 1651 Indo-Aryan temple with towering carved pillars in the heart of old town.", type: "Temple / Pilgrimage" },
      { name: "Monsoon Palace (Sajjangarh)", desc: "Hilltop citadel overlooking city lakes, famous for panoramic sunset vistas.", type: "Scenic Nature" },
      { name: "Bagore Ki Haveli (Gangaur Ghat)", desc: "Lakeside 18th-century mansion hosting Dharohar folk dance and puppet shows.", type: "Shopping & Culture" }
    ],
    airports: ["Maharana Pratap Airport (UDR)"],
    railwayStations: ["Udaipur City (UDZ)", "Rana Pratap Nagar (RPZ)"]
  },

  mumbai: {
    localAreas: [
      "Bandra West & BKC", "Andheri East & West", "Juhu", "Colaba & Fort", "Powai",
      "Lower Parel", "Borivali & Kandivali", "Goregaon", "Dadar", "Thane West",
      "Vashi & Navi Mumbai", "Malad Mindspace", "Chembur", "Kurla"
    ],
    touristPlaces: [
      { name: "Gateway of India", desc: "Iconic basalt arch monument erected to commemorate King George V's landing.", type: "Heritage & Monument" },
      { name: "Marine Drive (Queen's Necklace)", desc: "3.6 km C-shaped coastal boulevard offering dazzling evening city lights.", type: "Scenic Nature" },
      { name: "Chhatrapati Shivaji Maharaj Terminus (CSMT)", desc: "UNESCO World Heritage Gothic Revival architectural landmark.", type: "Heritage & Monument" },
      { name: "Siddhivinayak Temple (Prabhadevi)", desc: "Revered Hindu temple dedicated to Lord Ganesha, visited by millions.", type: "Temple / Pilgrimage" },
      { name: "Haji Ali Dargah", desc: "Historic mosque and tomb located on an islet off the coast of Worli.", type: "Temple / Pilgrimage" },
      { name: "Juhu Beach & Bandstand", desc: "Lively coastal promenades famous for street food, celebrity homes and sunsets.", type: "Scenic Nature" },
      { name: "Elephanta Caves", desc: "UNESCO rock-cut cave temples dedicated to Shiva on Elephanta Island.", type: "Heritage & Monument" },
      { name: "Bandra-Worli Sea Link", desc: "Cable-stayed 8-lane expressway bridge spanning the Arabian Sea.", type: "Heritage & Monument" }
    ],
    airports: ["Chhatrapati Shivaji Maharaj International Airport (BOM)"],
    railwayStations: ["Mumbai Central (MMCT)", "Bandra Terminus (BDTS)", "CSMT (CSMT)", "Lokmanya Tilak Terminus (LTT)", "Dadar (DDR)"]
  },

  pune: {
    localAreas: [
      "Koregaon Park", "Kothrud", "Baner & Balewadi", "Viman Nagar", "Hinjawadi IT Park",
      "Wakad", "Aundh", "Shivajinagar", "Hadapsar & Magarpatta", "Kalyani Nagar",
      "Pimpri-Chinchwad (PCMC)", "Camp / MG Road", "Senapati Bapat Road"
    ],
    touristPlaces: [
      { name: "Shaniwar Wada", desc: "Historic 18th-century fortification seat of the Peshwa rulers of the Maratha Empire.", type: "Heritage & Monument" },
      { name: "Aga Khan Palace", desc: "Majestic palace with Italian arches where Mahatma Gandhi was interned in 1942.", type: "Heritage & Monument" },
      { name: "Sinhagad Fort", desc: "Hill fortress 30 km from Pune famous for Tanaji Malusare's battle and views.", type: "Heritage & Monument" },
      { name: "Dagadusheth Halwai Ganapati Temple", desc: "Celebrated Hindu temple renowned for its grand gold idol of Lord Ganesha.", type: "Temple / Pilgrimage" },
      { name: "Osho Teerth Park & Ashram", desc: "Zen meditation gardens and tranquil lush landscaped sanctuary in Koregaon Park.", type: "Scenic Nature" },
      { name: "Pataleshwar Cave Temple", desc: "8th-century rock-cut monolithic shrine dedicated to Lord Shiva on JM Road.", type: "Temple / Pilgrimage" },
      { name: "Lonavala & Khandala (Nearby)", desc: "Scenic Western Ghats hill stations with waterfalls, viewpoints and chikki shops.", type: "Scenic Nature" }
    ],
    airports: ["Pune International Airport (PNQ)"],
    railwayStations: ["Pune Junction (PUNE)", "Shivajinagar (SVJR)"]
  },

  delhi: {
    localAreas: [
      "Connaught Place", "South Extension & Hauz Khas", "Dwarka (Sectors 1-24)",
      "Rohini", "Saket & Vasant Kunj", "Karol Bagh & Patel Nagar", "Janakpuri",
      "Lajpat Nagar & Defence Colony", "Aerocity", "Pitampura", "Mayur Vihar"
    ],
    touristPlaces: [
      { name: "India Gate & Kartavya Path", desc: "All India War Memorial arch and majestic ceremonial boulevard.", type: "Heritage & Monument" },
      { name: "Red Fort (Lal Qila)", desc: "UNESCO World Heritage Mughal fortress constructed in red sandstone.", type: "Heritage & Monument" },
      { name: "Qutub Minar Complex", desc: "World's tallest brick minaret (72.5m) and ancient Iron Pillar of Delhi.", type: "Heritage & Monument" },
      { name: "Humayun's Tomb", desc: "First garden-tomb on the Indian subcontinent, architectural precursor to Taj Mahal.", type: "Heritage & Monument" },
      { name: "Akshardham Temple", desc: "Sprawling traditional stone temple campus showcasing 10,000 years of Indian culture.", type: "Temple / Pilgrimage" },
      { name: "Lotus Temple (Bahá'í House of Worship)", desc: "Flowerlike lotus-shaped sanctuary welcoming people of all faiths for silent meditation.", type: "Temple / Pilgrimage" },
      { name: "Chandni Chowk & Jama Masjid", desc: "Historic 17th-century marketplace, street food stalls, and India's largest mosque.", type: "Shopping & Culture" }
    ],
    airports: ["Indira Gandhi International Airport (DEL) - T1, T2, T3"],
    railwayStations: ["New Delhi (NDLS)", "Old Delhi (DLI)", "Hazrat Nizamuddin (NZM)", "Anand Vihar (ANVT)", "Delhi Sarai Rohilla (DEE)"]
  },

  jaipur: {
    localAreas: [
      "Malviya Nagar", "Vaishali Nagar", "Mansarovar", "C-Scheme", "Raja Park",
      "Tonk Road", "Jagatpura", "Bani Park", "Ajmer Road", "Civil Lines"
    ],
    touristPlaces: [
      { name: "Hawa Mahal (Palace of Winds)", desc: "Iconic 5-storey honeycomb facade with 953 jharokhas built in pink sandstone.", type: "Heritage & Monument" },
      { name: "Amber Fort (Amer Fort)", desc: "Majestic hilltop fort with Sheesh Mahal (Mirror Palace) overlooking Maota Lake.", type: "Heritage & Monument" },
      { name: "City Palace", desc: "Grand royal palace complex featuring Chandra Mahal, Mubarak Mahal and courtyards.", type: "Heritage & Monument" },
      { name: "Jantar Mantar", desc: "UNESCO World Heritage 18th-century astronomical observatory with world's largest sundial.", type: "Heritage & Monument" },
      { name: "Nahargarh & Jaigarh Forts", desc: "Rugged Aravalli ridge fortresses housing the massive Jaivana cannon on wheels.", type: "Heritage & Monument" },
      { name: "Jal Mahal (Water Palace)", desc: "Picturesque Rajput palace floating in the centre of Man Sagar Lake.", type: "Scenic Nature" },
      { name: "Birla Mandir & Albert Hall Museum", desc: "Pure white marble Laxmi Narayan temple and Indo-Saracenic museum palace.", type: "Temple / Pilgrimage" }
    ],
    airports: ["Jaipur International Airport (Sanganer - JAI)"],
    railwayStations: ["Jaipur Junction (JP)", "Gandhinagar Jaipur (GADJ)"]
  },

  agra: {
    localAreas: [
      "Tajganj", "Fatehabad Road Hotel Belt", "Sanjay Place", "Civil Lines",
      "Kamla Nagar", "Sikandra", "Dayalbagh", "Shastripuram", "Shahganj"
    ],
    touristPlaces: [
      { name: "Taj Mahal", desc: "UNESCO World Heritage ivory-white marble mausoleum on the Yamuna riverbank.", type: "Heritage & Monument" },
      { name: "Agra Fort", desc: "Massive 16th-century Mughal imperial red sandstone citadel and royal residence.", type: "Heritage & Monument" },
      { name: "Fatehpur Sikri (Nearby)", desc: "Ghost Mughal capital city featuring Buland Darwaza and Salim Chishti Dargah.", type: "Heritage & Monument" },
      { name: "Mehtab Bagh", desc: "Charbagh garden complex offering sunset silhouette views of the Taj across the river.", type: "Scenic Nature" },
      { name: "Itmad-ud-Daulah (Baby Taj)", desc: "Exquisite marble tomb adorned with pietra dura inlay work and tranquil gardens.", type: "Heritage & Monument" },
      { name: "Sikandra (Akbar's Tomb)", desc: "Deep red sandstone and white marble architectural masterpiece honoring Akbar.", type: "Heritage & Monument" }
    ],
    airports: ["Agra Airport (Kheria - AGR)"],
    railwayStations: ["Agra Cantt (AGC)", "Agra Fort (AF)", "Raja Ki Mandi (RKM)"]
  },

  mathura: {
    localAreas: [
      "Krishna Janmabhoomi Area", "Vrindavan Bypass", "Dampier Nagar", "Highway Plaza Area",
      "Chhatikara Road", "Govardhan Road", "Raman Reti Vrindavan", "Bhuteshwar"
    ],
    touristPlaces: [
      { name: "Shri Krishna Janmasthan Temple", desc: "Sacred temple complex built around the prison cell where Lord Krishna was born.", type: "Temple / Pilgrimage" },
      { name: "Bankey Bihari Temple (Vrindavan)", desc: "Most famous temple of Vrindavan with enchanting curtains and lively darshan.", type: "Temple / Pilgrimage" },
      { name: "Prem Mandir (Vrindavan)", desc: "Magnificent white Italian marble temple with illuminated evening musical fountain.", type: "Temple / Pilgrimage" },
      { name: "ISKCON Temple (Sri Sri Krishna Balaram)", desc: "Vibrant Hare Krishna international spiritual centre with melodious kirtans.", type: "Temple / Pilgrimage" },
      { name: "Vishram Ghat & Yamuna Aarti", desc: "Historic bathing ghat where Lord Krishna rested after slaying Kansa; serene evening aarti.", type: "Temple / Pilgrimage" },
      { name: "Govardhan Hill (Parikrama)", desc: "Holy sandstone hill lifted by Krishna on his little finger to shield Braj residents.", type: "Scenic Nature" },
      { name: "Barsana Shri Radha Rani Temple", desc: "Hilltop palace-temple honoring Radha Rani, famous for Lathmar Holi celebrations.", type: "Temple / Pilgrimage" }
    ],
    airports: ["Indira Gandhi Int'l Airport (DEL - 150 km)", "Agra Airport (55 km)"],
    railwayStations: ["Mathura Junction (MTJ)", "Mathura Cantt (MRT)"]
  },

  varanasi: {
    localAreas: [
      "Godowlia & Dashashwamedh", "Assi Ghat & Lanka (BHU)", "Sigra & Mahmoorganj",
      "Varanasi Cantt Station Area", "Bhelupur", "Shivpur & Babatpur Airport Road",
      "Sarnath Colony", "Pandeypur", "Durgakund", "Nadesar"
    ],
    touristPlaces: [
      { name: "Kashi Vishwanath Temple & Corridor", desc: "Golden-spired Jyotirlinga shrine and newly renovated riverside corridor on Ganga.", type: "Temple / Pilgrimage" },
      { name: "Dashashwamedh Ghat Ganga Aarti", desc: "World-renowned ritual of brass lamps, incense and conch shells at twilight.", type: "Temple / Pilgrimage" },
      { name: "Assi Ghat", desc: "Southernmost ghat famous for Subah-e-Banaras morning music, yoga and boat rides.", type: "Scenic Nature" },
      { name: "Sarnath Deer Park & Dhamek Stupa", desc: "Sacred Buddhist site where Gautama Buddha delivered his first sermon (Dhammacakkappavattana).", type: "Heritage & Monument" },
      { name: "Manikarnika & Harishchandra Ghats", desc: "Eternal sacred cremation ghats symbolizing moksha (liberation from cycle of rebirth).", type: "Heritage & Monument" },
      { name: "Banaras Hindu University (BHU) & New Vishwanath Temple", desc: "Vast green campus housing Bharat Kala Bhavan museum and tall marble Shiva temple.", type: "Shopping & Culture" },
      { name: "Ramnagar Fort & Museum", desc: "18th-century sandstone fortress on the eastern bank displaying royal vintage cars and weapons.", type: "Heritage & Monument" }
    ],
    airports: ["Lal Bahadur Shastri International Airport (Babatpur - VNS)"],
    railwayStations: ["Varanasi Junction (Cantt - BSB)", "Banaras (Manduadih - BSBS)", "Pt. Deen Dayal Upadhyaya Junction (Mughalsarai - DDU)"]
  },

  gaya: {
    localAreas: [
      "Vishnupad Temple Precinct", "Phalgu River Devghat", "Gaya Junction Station Colony",
      "Rampur & Civil Lines", "AP Colony", "Bodh Gaya Road", "Gautam Buddha Airport Road"
    ],
    touristPlaces: [
      { name: "Vishnupad Temple", desc: "Sacred granite temple on Phalgu riverbank enshrining 40 cm footprint of Lord Vishnu.", type: "Temple / Pilgrimage" },
      { name: "Mahabodhi Temple (Bodh Gaya)", desc: "UNESCO World Heritage site marking the exact spot where Prince Siddhartha attained enlightenment.", type: "Temple / Pilgrimage" },
      { name: "Bodhi Tree & Vajrasana", desc: "Direct descendant of the sacred fig tree under which Gautama Buddha sat in meditation.", type: "Temple / Pilgrimage" },
      { name: "Great Buddha Statue (80-foot)", desc: "Imposing seated stone Buddha statue unveiled by the 14th Dalai Lama.", type: "Heritage & Monument" },
      { name: "Mangla Gauri Temple", desc: "One of the 18 Shaktipeethas mentioned in Padma Purana atop Bhasmakoot hill.", type: "Temple / Pilgrimage" },
      { name: "Phalgu River & Pretshila Hill", desc: "Venerated sites for performing sacred Pind Daan rituals for peace of ancestors' souls.", type: "Temple / Pilgrimage" },
      { name: "Barabar Caves (Nearby)", desc: "Oldest surviving rock-cut caves in India dating back to the Maurya Empire.", type: "Heritage & Monument" }
    ],
    airports: ["Gaya Airport (GAY)", "Patna Airport (105 km)"],
    railwayStations: ["Gaya Junction (GAYA)"]
  },

  bengaluru: {
    localAreas: [
      "Indiranagar", "Koramangala", "Whitefield & ITPL", "HSR Layout", "Electronic City",
      "Jayanagar & JP Nagar", "Hebbal & Bellary Road", "Marathahalli", "MG Road & Brigade Road",
      "Yelahanka", "Bannerghatta Road", "Malleshwaram", "Rajajinagar"
    ],
    touristPlaces: [
      { name: "Lalbagh Botanical Garden", desc: "Historic 240-acre botanical haven with Victorian Glass House and flower shows.", type: "Scenic Nature" },
      { name: "Bangalore Palace", desc: "Tudor-style royal estate with fortified towers, woodcarvings and vintage portraits.", type: "Heritage & Monument" },
      { name: "Cubbon Park & Vidhana Soudha", desc: "300-acre green lung and majestic Neo-Dravidian state legislative monument.", type: "Scenic Nature" },
      { name: "ISKCON Temple Bangalore (Rajajinagar)", desc: "Stunning modern temple on a hillock featuring gold-plated flagstaff and deities.", type: "Temple / Pilgrimage" },
      { name: "Bannerghatta Biological Park", desc: "Safari sanctuary with lions, tigers, butterfly conservatory and rescue zoo.", type: "Leisure & Family" },
      { name: "Visvesvaraya Industrial & Technological Museum", desc: "Interactive science engines, flight simulators and aerospace technology gallery.", type: "Leisure & Family" },
      { name: "Nandi Hills (Day Getaway)", desc: "Picturesque hill fortress known for misty cloud sunrises and Tipu's Drop cliff.", type: "Scenic Nature" }
    ],
    airports: ["Kempegowda International Airport (BLR)"],
    railwayStations: ["KSR Bengaluru City (SBC)", "Yesvantpur (YPR)", "Bengaluru Cantt (BNC)", "SMVT Bengaluru (SMVB)"]
  },

  chandigarh: {
    localAreas: [
      "Sector 17 City Centre", "Sector 35 & 22", "Sector 8 & 9 (Geri Route)", "Manimajra",
      "IT Park Kishangarh", "Zirakpur Bypass", "Sector 43 ISBT Colony", "Mohali Phase 1 to 11"
    ],
    touristPlaces: [
      { name: "Rock Garden of Chandigarh", desc: "Visionary 40-acre sculpture garden built entirely from urban waste by Nek Chand.", type: "Heritage & Monument" },
      { name: "Sukhna Lake", desc: "Serene 3 sq km artificial reservoir at Shivalik foothills with boating and jogging track.", type: "Scenic Nature" },
      { name: "Zakir Hussain Rose Garden", desc: "Asia's largest rose garden in Sector 16 boasting 50,000 rose bushes of 1,600 varieties.", type: "Scenic Nature" },
      { name: "Capitol Complex (UNESCO)", desc: "Le Corbusier's architectural triumph housing Secretariat, High Court and Open Hand monument.", type: "Heritage & Monument" },
      { name: "Sector 17 Plaza", desc: "Pedestrianized shopping, dining and commercial heart with musical fountains.", type: "Shopping & Culture" },
      { name: "Pinjore Gardens (Yadavindra Gardens)", desc: "17th-century Mughal terraced garden with water fountains and fruit orchards.", type: "Scenic Nature" }
    ],
    airports: ["Shaheed Bhagat Singh International Airport (IXC)"],
    railwayStations: ["Chandigarh Junction (CDG)"]
  }
};

// Also alias common spellings & nearby cities
CITY_INTELLIGENCE["ahmedabad-airport"] = CITY_INTELLIGENCE["ahmedabad"];
CITY_INTELLIGENCE["mumbai-airport"] = CITY_INTELLIGENCE["mumbai"];
CITY_INTELLIGENCE["delhi-airport"] = CITY_INTELLIGENCE["delhi"];
CITY_INTELLIGENCE["bodhgaya"] = CITY_INTELLIGENCE["gaya"];
CITY_INTELLIGENCE["bodh-gaya"] = CITY_INTELLIGENCE["gaya"];
CITY_INTELLIGENCE["bangalore"] = CITY_INTELLIGENCE["bengaluru"];
CITY_INTELLIGENCE["vadodara-airport"] = CITY_INTELLIGENCE["vadodara"];
CITY_INTELLIGENCE["surat-airport"] = CITY_INTELLIGENCE["surat"];
CITY_INTELLIGENCE["rajkot-airport"] = CITY_INTELLIGENCE["rajkot"];


// ============================================================
// POPULAR HIGHWAY CORRIDORS
// ============================================================

interface CorridorData {
  highway: string;
  roadCondition: string;
  tollPlazas: number;
  tollEstimate: number;
  majorStops: TransitStop[];
  foodStops: FoodStop[];
}

export const CORRIDOR_INTELLIGENCE: Record<string, CorridorData> = {
  "ahmedabad-vadodara": {
    highway: "National Expressway 1 (NE-1 / Mahatma Gandhi Expressway)",
    roadCondition: "6-lane access-controlled concrete expressway with 100 km/h cruising speed and dedicated emergency lanes.",
    tollPlazas: 2,
    tollEstimate: 135,
    majorStops: [
      { name: "Nadiad Expressway Junction", desc: "Historic town junction known for Santram Mandir and express fuel stations." },
      { name: "Anand (Milk City)", desc: "World-famous AMUL dairy headquarters with wayside convenience rest areas." },
      { name: "Vasad & Mahi River Bridge", desc: "Scenic crossing over the Mahi River with bridge-side highway food joints." }
    ],
    foodStops: [
      { name: "Express Highway Food Plaza (Near Anand)", location: "NE-1 Midway", specialty: "Honest Restaurant pav bhaji, Havmor ice creams and Subway." },
      { name: "Santram Highway Food Mall", location: "Nadiad Toll Plaza", specialty: "Authentic Gujarati fafda-jalebi, hot tea and south Indian breakfast." }
    ]
  },

  "ahmedabad-surat": {
    highway: "National Expressway 1 & National Highway 48 (NE-1 & NH-48)",
    roadCondition: "Multi-lane high-speed expressway and 6-lane NH-48 corridor with flyovers bypassing city congestions.",
    tollPlazas: 4,
    tollEstimate: 420,
    majorStops: [
      { name: "Vadodara Golden Cross Bypass", desc: "Major ring-road interchange connecting northern and southern industrial belts." },
      { name: "Bharuch & Narmada Cable Bridge", desc: "Spectacular 4-lane extradosed cable-stayed bridge over the sacred Narmada River." },
      { name: "Ankleshwar Chemical Hub", desc: "Asia's largest industrial township bypass with round-the-clock petrol bunks." }
    ],
    foodStops: [
      { name: "Sugar N Spice Food Plaza", location: "NH-48 Bharuch Bypass", specialty: "Multicuisine family dining, clean washrooms, barista coffee and Gujarati snacks." },
      { name: "Honest Highway Restaurant", location: "Anand - Vadodara Stretch", specialty: "Vegetarian thali, paneer butter masala, grilled sandwiches and fresh tea." },
      { name: "Kathiyawadi Village Dhaba", location: "Navsari-Surat Highway", specialty: "Sev tameta, baingan bharta, bajra rotla with fresh butter and buttermilk." }
    ]
  },

  "ahmedabad-mumbai": {
    highway: "National Highway 48 (Western Golden Quadrilateral Corridor)",
    roadCondition: "6-to-8 lane heavily paved commercial artery with electronic Fastag toll plazas and wayside rest stops.",
    tollPlazas: 8,
    tollEstimate: 780,
    majorStops: [
      { name: "Vadodara Bypass", desc: "Key milestone connecting Central Gujarat to southern export corridors." },
      { name: "Bharuch & Narmada River", desc: "Scenic river crossing with famous 1.4 km cable bridge." },
      { name: "Surat Kamrej & Kadodara", desc: "Textile and diamond capital entry bypass with massive service stations." },
      { name: "Vapi & Valsad", desc: "Southern Gujarat border towns known for chemical estates and coastal proximity." },
      { name: "Manor & Ghodbunder Road", desc: "Gateway to Mumbai Metropolitan Region via Thane and Western Express Highway." }
    ],
    foodStops: [
      { name: "Sugar N Spice Restaurant", location: "NH-48 Ankleshwar", specialty: "Famous Gujarati kathiyawadi platters, dosas and clean sanitized family restrooms." },
      { name: "Vittal Kamats Original Family Restaurant", location: "NH-48 Vapi / Manor", specialty: "Crisp Mysore masala dosa, filter coffee, upma and north Indian meals." },
      { name: "Hotel Decent & Honest Food Court", location: "NH-48 Bharuch", specialty: "Fresh parathas, hot tea, snacks and 24x7 express grab-and-go counters." }
    ]
  },

  "ahmedabad-rajkot": {
    highway: "National Highway 47 (Ahmedabad-Rajkot 6-Lane Corridor)",
    roadCondition: "Newly widened 6-lane express highway featuring multiple grade separators, bypasses and flyovers.",
    tollPlazas: 3,
    tollEstimate: 280,
    majorStops: [
      { name: "Bagodara Junction", desc: "Central Saurashtra fork connecting Bhavnagar and Rajkot routes." },
      { name: "Limbdi Highway Bypass", desc: "Popular stopover town for highway travellers and heritage stopovers." },
      { name: "Chotila Hill Temple Town", desc: "Pilgrimage hub famous for Chamunda Mata hilltop shrine visible from highway." },
      { name: "Bamanbore Industrial Zone", desc: "Final approach into Rajkot city bypassing local suburban traffic." }
    ],
    foodStops: [
      { name: "Honest Food Court Chotila", location: "NH-47 Chotila Bypass", specialty: "Pav bhaji, south Indian platters, dal tadka and fresh tea." },
      { name: "Hotel Tulsi Kathiyawadi", location: "NH-47 Limbdi", specialty: "Authentic Saurashtra thali with ringna no olo, bajra rotla, and gur-ghee." },
      { name: "Chamunda Kripa Highway Dhaba", location: "Near Bagodara", specialty: "Hot tea, thepla, poha and fresh highway snacks." }
    ]
  },

  "ahmedabad-somnath": {
    highway: "National Highway 47 & National Highway 151 (via Rajkot & Junagadh)",
    roadCondition: "Smooth 4-to-6 lane highway passing through Saurashtra heartland and scenic Gir foothills.",
    tollPlazas: 4,
    tollEstimate: 390,
    majorStops: [
      { name: "Rajkot Ring Road", desc: "Major urban transit hub midway into Saurashtra." },
      { name: "Gondal Heritage Town", desc: "Historic princely state famous for Naulakha Palace and vintage royal car museum." },
      { name: "Junagadh Girnar Gateway", desc: "Ancient foot of Mount Girnar known for Ashoka edicts, Uparkot Fort and ropeway." },
      { name: "Veraval Coastal Port", desc: "Historic fishing harbour and twin city adjacent to Somnath Temple." }
    ],
    foodStops: [
      { name: "Hotel Bapa Sitaram Kathiyawadi", location: "Gondal-Junagadh Highway", specialty: "Traditional Sev Usal, Gujarati kadhi, khichdi and fresh buttermilk." },
      { name: "Radhe Dhaba & Restaurant", location: "Junagadh Bypass", specialty: "Pure vegetarian north Indian and Gujarati meals with ample parking." }
    ]
  },

  "ahmedabad-dwarka": {
    highway: "National Highway 47 & National Highway 947 (via Rajkot & Jamnagar)",
    roadCondition: "Well-paved multi-lane coastal highway crossing the Gulf of Kutch peninsular route.",
    tollPlazas: 4,
    tollEstimate: 410,
    majorStops: [
      { name: "Morbi Ceramic Hub Bypass", desc: "World-renowned ceramic manufacturing cluster along the transit corridor." },
      { name: "Jamnagar (Brass & Refinery City)", desc: "Famous for Lakhota Fort lake, marine national park, and oil refineries." },
      { name: "Khambhalia Ghee Town", desc: "Famous regional stop for pure desi ghee sweets and snacks." },
      { name: "Bhatiya Junction", desc: "Final stretch leading into the sacred coastal holy land of Lord Krishna." }
    ],
    foodStops: [
      { name: "Celebration Food Zone Jamnagar", location: "Jamnagar Bypass", specialty: "Ghughra snacks, dry fruit kachori, south Indian dishes and fresh tea." },
      { name: "Dwarkadhish Highway Restaurant", location: "Khambhalia - Dwarka Highway", specialty: "Clean family dining serving hot parathas, dal fry, jeera rice and lassi." }
    ]
  },

  "ahmedabad-udaipur": {
    highway: "National Highway 48 (via Himmatnagar & Shamlaji)",
    roadCondition: "Picturesque 4-to-6 lane highway winding through the scenic Aravalli foothills across Gujarat-Rajasthan border.",
    tollPlazas: 4,
    tollEstimate: 350,
    majorStops: [
      { name: "Himmatnagar", desc: "Sabar Kantha district headquarters with busy commercial market bypass." },
      { name: "Shamlaji Pilgrim Shrine", desc: "Revered Vishnu temple located amidst lush Aravalli valleys." },
      { name: "Ratanpur Border", desc: "Gujarat-Rajasthan interstate border checkpoint with smooth commercial lanes." },
      { name: "Kherwara Aravalli Pass", desc: "Scenic hilly roadway with panoramic views of ancient granite peaks." }
    ],
    foodStops: [
      { name: "Hotel Hilltop & Resort", location: "Shamlaji Border", specialty: "Rajasthani dal baati churma, paneer gravies, tandoori rotis and kulfi." },
      { name: "Shree Krishna Highway Dhaba", location: "Himmatnagar Bypass", specialty: "Hot pyaz kachoris, fresh masala chai, sandwiches and pure ghee sweets." }
    ]
  },

  "ahmedabad-mount-abu": {
    highway: "National Highway 27 & Abu Road Hill Highway",
    roadCondition: "Fast 4-lane highway across North Gujarat plains, followed by 28 km well-engineered mountain ghat road.",
    tollPlazas: 3,
    tollEstimate: 260,
    majorStops: [
      { name: "Mehsana Dairy Hub", desc: "Known for Dudhsagar Dairy and Sun Temple Modhera access road." },
      { name: "Siddhpur Heritage Town", desc: "Sacred Matru Gaya site known for historic Bohra haveli wooden architecture." },
      { name: "Palanpur (City of Diamonds)", desc: "Gateway to Rajasthan with commercial shopping junctions and hotels." },
      { name: "Abu Road Foothills", desc: "Base railway junction where the scenic mountain climb to Mount Abu begins." }
    ],
    foodStops: [
      { name: "Hotel Toran (Gujarat Tourism)", location: "Mehsana Highway", specialty: "Sanitized cafeteria, traditional snacks, hot beverages and ice creams." },
      { name: "Palanpur Highway Palace Dhaba", location: "Palanpur Bypass", specialty: "Gujarati farsan, rabdi jalebi, dal bati and north Indian thalis." }
    ]
  },

  "delhi-agra": {
    highway: "Yamuna Expressway (Taj Express Highway - 165 km)",
    roadCondition: "6-lane access-controlled rigid concrete expressway with 100 km/h speed limit and zero city traffic.",
    tollPlazas: 3,
    tollEstimate: 435,
    majorStops: [
      { name: "Greater Noida Zero Point", desc: "Starting milestone of Yamuna Expressway with massive cloverleaf interchange." },
      { name: "Jewar International Airport Site", desc: "Upcoming mega aviation capital of NCR situated midway along the highway." },
      { name: "Mathura-Vrindavan Interchange", desc: "Express cut-off leading to the holy pilgrimage temples of Braj Bhoomi." }
    ],
    foodStops: [
      { name: "Yamuna Expressway Food Plaza (Toll 1)", location: "Milestone 42 (Jewar)", specialty: "Starbucks, Subway, Vaango, Bikanerwala, Costa Coffee and clean baby care rooms." },
      { name: "Highway Midway Rest Area (Toll 2)", location: "Milestone 98 (Mathura Cut)", specialty: "Haldiram's, McDonald's, Chai Point and authentic north Indian parathas." }
    ]
  },

  "delhi-jaipur": {
    highway: "National Highway 48 & Delhi-Mumbai Expressway (NE-4)",
    roadCondition: "High-speed 6-to-8 lane access-controlled corridor with automated tolling and modern wayside amenities.",
    tollPlazas: 4,
    tollEstimate: 510,
    majorStops: [
      { name: "Gurugram Cyber City & Rajiv Chowk", desc: "Major corporate and technology hub of NCR." },
      { name: "Dharuhera & Manesar Industrial Belt", desc: "Automobile manufacturing hub of northern India." },
      { name: "Neemrana Japanese Zone", desc: "Home to 15th-century Neemrana Fort Palace and industrial estates." },
      { name: "Behror Midway & Shahpura", desc: "Traditional highway transit town renowned for heritage stops and Rajasthani dhabas." }
    ],
    foodStops: [
      { name: "Old Rao Hotel & Restaurant", location: "NH-48 Dharuhera", specialty: "Legendary Haryana roadside dhaba famous for stuffed tandoori parathas with white butter and lassi." },
      { name: "RTDC Midway Behror", location: "NH-48 Behror", specialty: "State tourism rest stop with sprawling gardens, Rajasthani thali, pyaz kachoris and tea." },
      { name: "Mannat Dhaba & Food Court", location: "Shahpura", specialty: "Dal makhani, shahi paneer, garlic naan, cold shakes and 24x7 clean washrooms." }
    ]
  },

  "delhi-mathura": {
    highway: "Yamuna Expressway / NH-19 (Delhi-Agra Highway)",
    roadCondition: "Seamless 6-lane access-controlled expressway cutting direct travel time down to under 2.5 hours.",
    tollPlazas: 2,
    tollEstimate: 260,
    majorStops: [
      { name: "Noida / Greater Noida Express Highway", desc: "Modern urban expressway connecting central Delhi to Yamuna Expressway." },
      { name: "Jewar Toll Interchange", desc: "Central landmark of Yamuna Expressway with modern emergency and medical booths." },
      { name: "Raya-Mathura Cut", desc: "Dedicated toll slip road leading directly to Krishna Janmasthan and Vrindavan." }
    ],
    foodStops: [
      { name: "Bikanerwala Express Food Court", location: "Yamuna Expressway Mile 40", specialty: "Chhole bhature, raj kachori, rasmalai, south Indian dosas and hot filter coffee." },
      { name: "Vaango & Costa Coffee", location: "Jewar Rest Area", specialty: "Idli-vada combos, gourmet espresso coffees, sandwiches and cold coolers." }
    ]
  },

  "mumbai-pune": {
    highway: "Yashwantrao Chavan Mumbai-Pune Expressway (94.5 km)",
    roadCondition: "India's first 6-lane access-controlled concrete expressway winding through dramatic Western Ghats tunnels.",
    tollPlazas: 2,
    tollEstimate: 320,
    majorStops: [
      { name: "Kalamboli Entry Gate", desc: "Navi Mumbai gateway starting point of the Mumbai-Pune Expressway." },
      { name: "Khalapur Toll Plaza & Food Court", desc: "Primary mid-way pitstop before ascending the scenic Bhor Ghat." },
      { name: "Khandala & Lonavala Ghat Pass", desc: "Mist-covered ghat passes with breathtaking valley drop-offs and viaduct tunnels." },
      { name: "Talegaon & Dehu Road", desc: "Industrial and IT corridor entry point into Pune Metropolitan Region." }
    ],
    foodStops: [
      { name: "Khalapur Food Mall", location: "Expressway Km 45", specialty: "McDonald's, Starbucks, Shiv Sagar pav bhaji, misal pav and Maganlal Chikki." },
      { name: "Food Plaza Talegaon", location: "Expressway Km 80", specialty: "Fresh hot vada pav, kanda bhaji, south Indian snacks, cutting chai and mineral water." }
    ]
  },

  "varanasi-gaya": {
    highway: "National Highway 19 (Grand Trunk Road / AH-1)",
    roadCondition: "Smooth 6-lane national highway spanning eastern UP and southern Bihar with modern bypasses.",
    tollPlazas: 4,
    tollEstimate: 360,
    majorStops: [
      { name: "Chandauli (Rice Bowl of UP)", desc: "Eastern Uttar Pradesh agrarian district headquarters." },
      { name: "Karmanasa (UP-Bihar Border)", desc: "Interstate commercial border checkpoint with dedicated taxi lanes." },
      { name: "Mohania & Sasaram", desc: "Historic town on the GT Road famous for the octagonal tomb of Emperor Sher Shah Suri." },
      { name: "Dehri-on-Sone", desc: "Engineering marvel crossing the 3 km long Nehru Setu across the vast Sone River sandbed." },
      { name: "Aurangabad & Dobhi", desc: "Major highway junction where travelers turn off toward Gaya and Bodh Gaya." }
    ],
    foodStops: [
      { name: "Highway Milan Dhaba & Restaurant", location: "Mohania Bypass", specialty: "Pure vegetarian thalis, paneer butter masala, tandoori roti and spiced sattu parathas." },
      { name: "Sher Shah Suri Highway Food Court", location: "Sasaram NH-19", specialty: "Traditional litti chokha with pure desi ghee, fresh tea, dal fry and jeera rice." }
    ]
  }
};


// ============================================================
// HELPER: NORMALIZE CITY STRINGS
// ============================================================

export function normalizeCityName(raw: string): string {
  if (!raw) return "origin";
  return raw
    .toLowerCase()
    .trim()
    .replace(/-cab|-taxi|-car|-fare|-service/g, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanDisplayCity(city: string): string {
  return city
    .replace(/-/g, " ")
    .replace(/\w/g, (c) => c.toUpperCase())
    .replace(/And/g, "&")
    .replace(/Of/g, "of");
}


// ============================================================
// HEURISTIC / GENERATIVE ENGINE FOR ANY INDIAN ROUTE
// ============================================================

function inferHighway(startCity: string, endCity: string, distance: number): string {
  const s = startCity.toLowerCase();
  const e = endCity.toLowerCase();

  // Check Gujarat routes
  if (
    (s.includes("ahmedabad") || s.includes("gandhinagar")) &&
    (e.includes("vadodara") || e.includes("anand") || e.includes("nadiad"))
  ) {
    return "National Expressway 1 (NE-1 / Mahatma Gandhi Expressway)";
  }

  if (
    (s.includes("ahmedabad") || s.includes("surat") || s.includes("vadodara") || s.includes("mumbai")) &&
    (e.includes("surat") || e.includes("mumbai") || e.includes("vapi") || e.includes("valsad") || e.includes("bharuch"))
  ) {
    return "National Highway 48 (Western Golden Quadrilateral Corridor)";
  }

  if (s.includes("delhi") && (e.includes("agra") || e.includes("mathura") || e.includes("vrindavan"))) {
    return "Yamuna Expressway (Taj Express Corridor)";
  }

  if (s.includes("delhi") && (e.includes("jaipur") || e.includes("gurgaon") || e.includes("neemrana"))) {
    return "NH-48 (Delhi-Jaipur Highway) & Delhi-Mumbai Expressway";
  }

  if (s.includes("delhi") && (e.includes("chandigarh") || e.includes("amritsar") || e.includes("panipat") || e.includes("karnal"))) {
    return "National Highway 44 (Grand Trunk Road Corridor)";
  }

  if (s.includes("mumbai") && e.includes("pune")) {
    return "Mumbai-Pune Expressway (Yashwantrao Chavan Expressway)";
  }

  if (s.includes("bengaluru") || s.includes("bangalore")) {
    if (e.includes("mysore") || e.includes("mysuru")) return "Bengaluru-Mysuru Expressway (NH-275)";
    if (e.includes("hyderabad")) return "National Highway 44 (Bangalore-Hyderabad Corridor)";
    if (e.includes("chennai")) return "National Highway 48 (Bangalore-Chennai Corridor)";
  }

  if (s.includes("varanasi") || s.includes("prayagraj") || s.includes("gaya") || s.includes("sasaram") || s.includes("kolkata")) {
    return "National Highway 19 (Grand Trunk Road Corridor)";
  }

  // Fallbacks by distance
  if (distance > 300) {
    return "National Highway Corridor (4 to 6 Lane National Express Tollway)";
  }
  return "National & State Highway Corridor (Well-Paved Multi-Lane Toll Road)";
}

function generateTransitStops(startCity: string, endCity: string, distance: number): TransitStop[] {
  return [
    {
      name: `${startCity} Outer Bypass Junction`,
      desc: `Smooth expressway interchange avoiding ${startCity} inner city congestion and peak-hour traffic.`
    },
    {
      name: "Midway Commercial Rest Hub",
      desc: "Clean multi-brand food mall, automated Fastag toll plaza, sanitized washrooms, and 24x7 fuel station."
    },
    {
      name: `${endCity} City Gateway Circle`,
      desc: `Direct access highway feeder road connecting straight to residential, commercial, and tourist areas of ${endCity}.`
    }
  ];
}

function generateFoodStops(startCity: string, endCity: string): FoodStop[] {
  return [
    {
      name: "Highway Grand Family Food Plaza",
      location: `Midway on ${startCity} to ${endCity} Highway`,
      specialty: "Multicuisine pure vegetarian meals, hot parathas, dosas, tea, coffee, and clean sanitized washrooms."
    },
    {
      name: "Highway Heritage Dhaba & Tea Point",
      location: `En route ${startCity} to ${endCity}`,
      specialty: "Fresh authentic regional thalis, dal makhani, paneer butter masala, lassi, and quick snacks."
    }
  ];
}

function generateDestinationSightseeing(endCity: string): SightseeingSpot[] {
  return [
    {
      name: `${endCity} Historic City Heritage Centre`,
      desc: `Renowned historical landmarks, iconic public architecture, and cultural monuments of ${endCity}.`,
      type: "Heritage & Monument"
    },
    {
      name: `${endCity} Prominent Temple & Spiritual Shrine`,
      desc: `Revered spiritual sanctuaries visited by thousands of pilgrims and devotees throughout the year.`,
      type: "Temple / Pilgrimage"
    },
    {
      name: `${endCity} Scenic Nature Lake & Garden Park`,
      desc: `Lush green waterfront promenade and beautifully landscaped municipal botanical gardens.`,
      type: "Scenic Nature"
    },
    {
      name: `${endCity} Vibrant Local Traditional Market`,
      desc: `Celebrated traditional handicraft bazaars, regional textile shops, and authentic street dining spots.`,
      type: "Shopping & Culture"
    },
    {
      name: `${endCity} Family Entertainment & Amusement Hub`,
      desc: `Modern recreational plazas, children's park, museums, and family leisure facilities.`,
      type: "Leisure & Family"
    }
  ];
}

function generatePickupLocalities(city: string): string[] {
  return [
    `${city} Main Railway Junction Terminal`,
    `${city} Domestic / International Airport Area`,
    `${city} Central Bus Station & City Circle`,
    `${city} Civil Lines & Administrative District`,
    `${city} Prominent Star Hotels & Resort Hub`,
    `${city} Prime Residential Sectors & High-Rise Townships`,
    `${city} Commercial IT & Business Park Zone`,
    `${city} Highway Bypass & Ring Road Interchange`
  ];
}

function generateDropPoints(city: string): string[] {
  return [
    `${city} City Centre & Main Commercial Market`,
    `${city} Major Railway Station Gate`,
    `${city} Airport Terminal Arrivals / Departures`,
    `${city} Renowned Heritage Temples & Pilgrimage Shrines`,
    `${city} Leading Luxury Hotels & Heritage Resorts`,
    `${city} Doorstep Residential Address Drop Anywhere in ${city}`
  ];
}

function generateTravelPurposes(startCity: string, endCity: string): TravelPurpose[] {
  return [
    {
      title: "Airport Transfers & Flights",
      desc: `On-time guaranteed pickup from ${startCity} doorstep with timely drop at ${endCity} or transit airport terminals. Never miss a flight with our flight-tracked chauffeurs.`,
      icon: "✈️",
      tag: "Guaranteed Punctuality"
    },
    {
      title: "Corporate & Business Travel",
      desc: `Professional chauffeur-driven sedans and Innova Crysta cabs for corporate meetings, industrial plant visits, client conferences, and inter-city business delegations.`,
      icon: "💼",
      tag: "GST Invoice Available"
    },
    {
      title: "Family Vacations & Sightseeing",
      desc: `Spacious, clean 6-seater Ertiga, 7-seater Innova, or 12-seater Tempo Travellers with ample luggage room for peaceful family getaways and weekend tours.`,
      icon: "👨‍👩‍👧‍👦",
      tag: "Spacious & Sanitized"
    },
    {
      title: "Pilgrimage & Sacred Yatras",
      desc: `Dedicated spiritual tours from ${startCity} to holy shrines in and around ${endCity}. Enjoy smooth temple visits, elderly care assistance, and zero-hurry holy snan breaks.`,
      icon: "🕉️",
      tag: "Elderly Friendly"
    },
    {
      title: "Weddings, Events & Outstation Functions",
      desc: `Book multiple synchronized outstation cabs or luxury Tempo Travellers for wedding baraats, family reunions, festival gatherings, and destination celebrations.`,
      icon: "🎉",
      tag: "Group Travel"
    }
  ];
}

function generateFaqs(
  startCity: string,
  endCity: string,
  distance: number,
  hours: number,
  highway: string,
  sedanFare: number,
  suvFare: number,
  innovaFare: number,
  tempoFare: number
): FAQItem[] {
  return [
    {
      q: `What is the ${startCity} to ${endCity} cab fare for one-way and round-trip?`,
      a: `The ${startCity} to ${endCity} one-way cab fare starts from ₹${sedanFare.toLocaleString("en-IN")} for an executive AC Sedan (Dzire or Amaze at ₹9/km). Spacious 6-seater SUVs (Maruti Ertiga) start from ₹${suvFare.toLocaleString("en-IN")} (₹13/km), premium 7-seater Toyota Innova Crysta starts from ₹${innovaFare.toLocaleString("en-IN")} (₹16/km), and 9 to 12-seater Tempo Travellers start from ₹${tempoFare.toLocaleString("en-IN")} (₹20–28/km). Round-trip bookings enjoy up to 10% discount on total return mileage.`
    },
    {
      q: `What is the exact road distance and driving time from ${startCity} to ${endCity}?`,
      a: `The road distance between ${startCity} and ${endCity} is approximately ${distance} km via ${highway}. Under normal highway traffic conditions with standard dining and bio pauses, the journey takes around ${hours} to ${hours + 1} hours. Journey time can vary slightly depending on city exit times, toll booth queues, and seasonal weather.`
    },
    {
      q: `Can I book a dedicated one-way taxi from ${startCity} to ${endCity} without paying return fare?`,
      a: `Yes, 100%. Chiku Cabs guarantees dedicated point-to-point one-way taxi booking on the ${startCity} to ${endCity} route. You only pay for the one-way distance of ${distance} km from your doorstep pickup location to your destination address. You are never billed for the driver's return trip or empty return mileage.`
    },
    {
      q: `Which highway is taken from ${startCity} to ${endCity} and what are the road conditions?`,
      a: `The route is primarily navigated via ${highway}. This highway corridor is a multi-lane, well-engineered arterial roadway featuring dedicated flyovers, bypasses around crowded transit towns, well-lit signboards, and electronic Fastag toll plazas, ensuring a smooth and safe long-distance journey.`
    },
    {
      q: `Are highway toll taxes, state border permits, and GST included in the fare?`,
      a: `Our base quotes transparently cover vehicle hire, fuel expenses, driver allowance (batta), and applicable 5% GST. Highway toll charges across electronic toll plazas on the route are billed at actuals via Fastag receipts. If traveling across state borders, commercial road entry permits and parking fees (if any) are payable at actuals with zero hidden surcharges.`
    },
    {
      q: `Which car is best recommended for travel from ${startCity} to ${endCity}?`,
      a: `For solo travelers, couples, or small families with 1–2 suitcases, an AC Sedan (Maruti Dzire or Honda Amaze) offers the most economical and comfortable ride. For families with elderly parents, children, or 3–4 luggage bags, the 6-seater Maruti Ertiga offers superior legroom. For executive comfort, business travel, or long journeys, the 7-seater Toyota Innova Crysta is top-tier. For groups of 9 to 16 passengers, our luxury Force Tempo Travellers are best suited.`
    },
    {
      q: `Does Chiku Cabs provide doorstep pickup in ${startCity} and drop across ${endCity}?`,
      a: `Yes. We provide 100% doorstep pickup from any residential colony, hotel, airport terminal, or railway station across ${startCity}, and drop you directly at your specific hotel, residence, temple, or office address in ${endCity} with zero hidden local pick-up or drop surcharges.`
    },
    {
      q: `Can we stop for meals, tea, and washrooms along the ${startCity} to ${endCity} route?`,
      a: `Yes, absolutely. Our experienced highway chauffeurs are familiar with the best family highway food plazas, hygienic dhabas, and clean washroom facilities along ${highway}. You can pause whenever needed for breakfast, lunch, or tea at your convenience without extra waiting charges during transit.`
    },
    {
      q: `What is the cancellation and refund policy for a ${startCity} to ${endCity} taxi booking?`,
      a: `Chiku Cabs offers a 100% risk-free cancellation policy. You can cancel your ${startCity} to ${endCity} cab booking up to 24 hours prior to your scheduled pickup time for a full 100% refund with zero cancellation penalty. Refunds are processed back to your original payment mode within 24 to 48 hours.`
    },
    {
      q: `Is 24x7 and late-night cab booking available from ${startCity} to ${endCity}?`,
      a: `Yes. Chiku Cabs operates 24 hours a day, 7 days a week. You can book an early morning, late-evening, or midnight cab from ${startCity} to ${endCity}. A standard night driving allowance (₹250) applies only if the trip is actively running between 10:00 PM and 6:00 AM.`
    },
    {
      q: `Can I book an Innova Crysta or Tempo Traveller from ${startCity} to ${endCity}?`,
      a: `Yes. Toyota Innova Crysta (6+1 and 7+1 configurations) and Force Tempo Travellers (9, 10, 12, 15, 16, 18, 20, and 26 seaters) can be booked easily for ${startCity} to ${endCity}. These vehicles feature pushback luxury seats, powerful dual AC, large luggage boots, and certified highway drivers.`
    },
    {
      q: `How do I book a cab from ${startCity} to ${endCity} and what payment options are accepted?`,
      a: `Booking takes less than 2 minutes online via our booking form, or directly via WhatsApp (+91-916280820037) and phone (+91-8448445504). We accept UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, Net Banking, and cash or digital balance payment to the chauffeur upon arrival.`
    }
  ];
}

function generateBookingInfo(startCity: string, endCity: string): RouteBookingInfo {
  return {
    cancellationPolicy: "100% Free Cancellation up to 24 hours prior to scheduled pickup. Instant full refund with zero cancellation charges.",
    waitingPolicy: "Free 45 minutes complimentary waiting time for airport pickups. Zero waiting charges during highway meal and washroom pauses.",
    luggagePolicy: "Sedan: 2 Large Suitcases + 2 Handbags. SUV/Ertiga: 3-4 Suitcases. Innova Crysta: 4-5 Suitcases. Tempo Traveller: Dedicated roof luggage carrier & boot for 8-15 bags.",
    nightCharges: "Standard driver night allowance of ₹250 applies only if journey extends between 10:00 PM and 6:00 AM.",
    bookingSteps: [
      {
        step: "01",
        title: "Select Route & Date",
        desc: `Enter pickup in ${startCity}, drop in ${endCity}, date, time, and one-way or round-trip choice.`,
        icon: "📍"
      },
      {
        step: "02",
        title: "Pick Your Vehicle",
        desc: "Choose from AC Sedan (Dzire/Amaze), SUV (Ertiga), Luxury SUV (Innova Crysta), or Tempo Traveller.",
        icon: "🚘"
      },
      {
        step: "03",
        title: "Instant Confirmation",
        desc: "Get upfront transparent fare quotation via WhatsApp or phone with immediate driver & cab dispatch details.",
        icon: "💬"
      },
      {
        step: "04",
        title: "Enjoy Your Journey",
        desc: `Chauffeur arrives at your ${startCity} doorstep on time. Relax and travel safely to ${endCity}.`,
        icon: "✅"
      }
    ]
  };
}


// ============================================================
// MAIN EXPORTED FUNCTION: getRouteDetails()
// ============================================================

export function getRouteDetails(
  rawStartCity: string,
  rawEndCity: string,
  distance: number
): RouteIntelligence {
  const startKey = normalizeCityName(rawStartCity);
  const endKey = normalizeCityName(rawEndCity);

  const startCity = cleanDisplayCity(rawStartCity);
  const endCity = cleanDisplayCity(rawEndCity);

  const estimatedHours = Math.max(1, Math.ceil(distance / 55));

  // Check explicit corridor
  const corridorKey1 = `${startKey}-${endKey}`;
  const corridorKey2 = `${endKey}-${startKey}`;
  const explicitCorridor = CORRIDOR_INTELLIGENCE[corridorKey1] || CORRIDOR_INTELLIGENCE[corridorKey2];

  const highway = explicitCorridor ? explicitCorridor.highway : inferHighway(startCity, endCity, distance);
  const roadCondition = explicitCorridor
    ? explicitCorridor.roadCondition
    : "Multi-lane national highway corridor with smooth asphalt, electronic Fastag toll plazas, and well-maintained bypass routes.";

  const tollPlazas = explicitCorridor
    ? explicitCorridor.tollPlazas
    : Math.max(1, Math.round(distance / 70));

  const tollEstimate = explicitCorridor
    ? explicitCorridor.tollEstimate
    : Math.round(distance * 1.35);

  const majorStops = explicitCorridor
    ? explicitCorridor.majorStops
    : generateTransitStops(startCity, endCity, distance);

  const foodStops = explicitCorridor
    ? explicitCorridor.foodStops
    : generateFoodStops(startCity, endCity);

  // City Intelligence Lookups
  const startIntel = CITY_INTELLIGENCE[startKey] || (localDominanceData as any)[startKey];
  const endIntel = CITY_INTELLIGENCE[endKey] || (localDominanceData as any)[endKey];

  // Pickup Localities
  let pickupLocalities: string[] = [];
  if (startIntel && Array.isArray(startIntel.localAreas) && startIntel.localAreas.length > 0) {
    pickupLocalities = startIntel.localAreas.slice(0, 12);
  } else {
    pickupLocalities = generatePickupLocalities(startCity);
  }

  // Destination Sightseeing ("Destination ke aas-paas ke locations")
  let destinationSightseeing: SightseeingSpot[] = [];
  if (endIntel && Array.isArray(endIntel.touristPlaces) && endIntel.touristPlaces.length > 0) {
    const rawPlaces = endIntel.touristPlaces as any[];
    if (typeof rawPlaces[0] === "object" && rawPlaces[0] !== null && "name" in rawPlaces[0]) {
      destinationSightseeing = (rawPlaces as SightseeingSpot[]).slice(0, 8);
    } else {
      // If strings from localDominanceData
      destinationSightseeing = rawPlaces
        .filter((t: any) => typeof t === "string" && t.trim() !== "" && t !== "-")
        .slice(0, 8)
        .map((t: string) => ({
          name: t,
          desc: `Top rated tourist attraction and sightseeing spot in and around ${endCity}.`,
          type: "Scenic Nature" as const
        }));
    }
  }
  if (destinationSightseeing.length === 0) {
    destinationSightseeing = generateDestinationSightseeing(endCity);
  }

  // Drop Points
  let dropPoints: string[] = [];
  if (endIntel) {
    const areas = Array.isArray(endIntel.localAreas) ? endIntel.localAreas : [];
    const stations = Array.isArray(endIntel.railwayStations) ? endIntel.railwayStations : [];
    const airports = Array.isArray(endIntel.airports) ? endIntel.airports : [];

    dropPoints = [
      ...airports.slice(0, 1),
      ...stations.slice(0, 1),
      ...areas.slice(0, 4)
    ].filter(Boolean);
  }
  if (dropPoints.length === 0) {
    dropPoints = generateDropPoints(endCity);
  }

  // Travel Purposes
  const travelPurposes = generateTravelPurposes(startCity, endCity);

  // Fares calculation for FAQs
  const DRIVER_ALLOWANCE = 500;
  const sedanFare = Math.round(distance * 1.5 * 9 + DRIVER_ALLOWANCE);
  const suvFare = Math.round(distance * 1.5 * 13 + DRIVER_ALLOWANCE);
  const innovaFare = Math.round(distance * 1.5 * 16 + DRIVER_ALLOWANCE);
  const tempoFare = Math.round(distance * 1.5 * 20 + DRIVER_ALLOWANCE);

  // FAQs
  const faqs = generateFaqs(
    startCity,
    endCity,
    distance,
    estimatedHours,
    highway,
    sedanFare,
    suvFare,
    innovaFare,
    tempoFare
  );

  // Booking Info
  const bookingInfo = generateBookingInfo(startCity, endCity);

  return {
    startCity,
    endCity,
    distance,
    estimatedHours,
    highway,
    roadCondition,
    tollPlazas,
    tollEstimate,
    majorStops,
    foodStops,
    pickupLocalities,
    dropPoints,
    destinationSightseeing,
    travelPurposes,
    faqs,
    bookingInfo
  };
}
