/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {initializeApp, cert} from "firebase-admin/app";
import {getFirestore, FieldValue} from "firebase-admin/firestore";

// Initialize the Firebase Admin SDK
const serviceAccount = require("../config/serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

import {destinationArray, fareArray, originArray} from "./lineData";

const db = getFirestore();

// Function to create a collection and add a document
async function createCollectionAndDocument(collectionName: string, documentData: FirebaseFirestore.WithFieldValue<FirebaseFirestore.DocumentData>) {
  try {
    const collectionRef = db.collection(collectionName);
    const documentRef = await collectionRef.add(documentData);
    console.log(`Added document to ${collectionName}`);
    return documentRef;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    return null;
  }
}

// Function to add a location document to the "Locations" collection
async function addLocationDocument(name: string) {
  try {
    const locationsCollection = db.collection("Locations");
    await locationsCollection.add({
      name: name,
      country: "Rwanda",
    });
    console.log("Location document added successfully");
  } catch (error) {
    console.error("Error adding location document:", error);
  }
}

// Function to add a line document to the "Lines" collection
async function addLineDocument(origin: string, destination: string, fare: number) {
  try {
    const linesCollection = db.collection("Lines");
    await linesCollection.add({
      origin: origin,
      destination: destination,
      fare: fare,
    });
    console.log("Line document added successfully");
  } catch (error) {
    console.error("Error adding line document:", error);
  }
}

// Function to add a country document
async function addCountryDocument() {
  try {
    const countriesCollection = db.collection("Countries");
    await countriesCollection.doc("rwanda").set({
      name: "Rwanda",
    });
    console.log("Country document added successfully");
  } catch (error) {
    console.error("Error adding country document:", error);
  }
}

// Create collections and add documents
async function createCollections() {
  try {
    // Create User document
    const user = {
      firstName: "Emmanuel",
      lastName: "Dodoo",
      email: "emmanueldodoo94@gmail.com",
      username: "manuel_dev",
      phoneNumber: 233241489576,
    };
    const userRef = await createCollectionAndDocument("User", user);

    // Create Bus_Company document
    const busCompany = {
      name: "Example Bus Company",
      buses: [],
      verification: "verification file",
      number_of_buses: 10,
      office_location: "Office Address",
      routes: [],
      drivers: [],
    };
    const busCompanyRef = await createCollectionAndDocument("Bus_Company", busCompany);

    // Create Driver document
    const driver = {
      firstName: "Driver",
      lastName: "Smith",
      ratings: 5,
      Bus_Company: busCompanyRef,
      contact: "1234567890",
    };
    await createCollectionAndDocument("Driver", driver);

    // Create Country document
    await addCountryDocument();

    // Add Location documents
    for (let i = 0; i < originArray.length; i++) {
      await addLocationDocument(originArray[i]);
    }

    // Add Line documents
    for (let i = 0; i < originArray.length; i++) {
      await addLineDocument(originArray[i], destinationArray[i], fareArray[i]);
    }

    // Create Trip document
    const trip = {
      user: userRef,
      Bus_company: busCompanyRef,
    };
    await createCollectionAndDocument("Trip", trip);

    // Create Bus document
    const bus = {
      license_plate: "ABC123",
      insurance: "Valid",
      color: "Blue",
      year_of_make: new Date(),
      number_of_seats: 50,
      model: "Bus Model",
      Bus_company_id: busCompanyRef?.id,
      created_at: FieldValue.serverTimestamp(),
    };
    const busRef = await createCollectionAndDocument("Bus", bus);

    // Create Bus_Tickets document
    const busTicket = {
      user: userRef?.id,
      ticket_code: "TICKET123",
      departure_date: new Date(),
      destination: "Destination",
      date_of_purchase: new Date(),
      bus_id: busRef?.id,
      seat_number: 1,
      qr_code: "QR Code",
      departure_station_address: "Departure Station Address",
      departure_station_location: "Departure Station Location",
    };
    await createCollectionAndDocument("Bus_Tickets", busTicket);

    console.log("Dummy data added to collections successfully.");
  } catch (error) {
    console.error("Error creating collections and documents:", error);
  }
}

// Call the function to create collections and add documents
createCollections();
