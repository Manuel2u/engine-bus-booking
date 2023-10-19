const axios = require("axios");

const locations = [
  {
    country: "RW",
    name: "GASEKE",
  },
  {
    country: "RW",
    name: "RUKOMO",
  },
  {
    country: "RW",
    name: "GICUMBI",
  },
  {
    country: "RW",
    name: "MIYOVE",
  },
  {
    country: "RW",
    name: "RUSHAKI",
  },
  {
    country: "RW",
    name: "KARAMA",
  },
  {
    country: "RW",
    name: "NGARAMA",
  },
  {
    country: "RW",
    name: "GATUNA",
  },
  {
    country: "RW",
    name: "BASE",
  },
  {
    country: "RW",
    name: "GAKENKE",
  },
  {
    country: "RW",
    name: "MUSANZE",
  },
  {
    country: "RW",
    name: "NYAGATARE",
  },
  {
    country: "RW",
    name: "TABAGWE",
  },
  {
    country: "RW",
    name: "BUTARO",
  },
  {
    country: "RW",
    name: "KIVUYE",
  },
  {
    country: "RW",
    name: "KAYONZA",
  },
  {
    country: "RW",
    name: "KIRAMURUZI",
  },
  {
    country: "RW",
    name: "KIZIGURO",
  },
  {
    country: "RW",
    name: "RWAGITIMA",
  },
  {
    country: "RW",
    name: "KABARORE",
  },
  {
    country: "RW",
    name: "GABIRO",
  },
  {
    country: "RW",
    name: "KARANGAZI",
  },
  {
    country: "RW",
    name: "RYABEGA",
  },
  {
    country: "RW",
    name: "BUGARAGARA",
  },
  {
    country: "RW",
    name: "RWIMIYAGA",
  },
  {
    country: "RW",
    name: "MATIMBA",
  },
  {
    country: "RW",
    name: "KAGITUMBA",
  },
  {
    country: "RW",
    name: "MIMURI",
  },
  {
    country: "RW",
    name: "MUHURA",
  },
  {
    country: "RW",
    name: "BUHABWA",
  },
  {
    country: "RW",
    name: "GABIRO",
  },
  {
    country: "RW",
    name: "RUKARA",
  },
  {
    country: "RW",
    name: "NYAGASAMBU",
  },
  {
    country: "RW",
    name: "RWAMAGANA",
  },
  {
    country: "RW",
    name: "KABARONDO",
  },
  {
    country: "RW",
    name: "NGOMA",
  },
  {
    country: "RW",
    name: "GATORE",
  },
  {
    country: "RW",
    name: "NYAKARAMBI",
  },
  {
    country: "RW",
    name: "RUSUMO",
  },
  {
    country: "RW",
    name: "KABUGA",
  },
  {
    country: "RW",
    name: "KARENGE",
  },
  {
    country: "RW",
    name: "CYILI",
  },
  {
    country: "RW",
    name: "MUYUMBU",
  },
  {
    country: "RW",
    name: "NTUNGA",
  },
];

const userId = "650f6029847fe8fbbe964ec6";

const insertLocations = async () => {
  try {
    for (const locationName of locations.map((location) => location.name)) {
      const locationData = {
        country: "RW",
        name: locationName,
        createdBy: userId,
      };
      console.log(locationName);

      const response = await axios.post(
        `http://localhost:5000/api/v1/locations`,
        {
          ...locationData,
        }
      );

      console.log(response);

      if (response) {
        console.log(`Location "${locationName}" inserted successfully.`);
      } else {
        console.error(
          `Failed to insert location "${locationName}". Error:`,
          response.message
        );
      }
    }
    console.log("All locations inserted successfully.");
  } catch (error) {
    console.error("Error inserting locations:", error.message);
  }
};

insertLocations();
