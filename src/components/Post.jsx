import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import "./Post.css";


const categories = ["Phone", "Watch", "Laptop", "Earbuds", "Other"];

function Post() {
  const [itemDescription, setItemDescription] = useState("");
  const [locationFound, setLocationFound] = useState("");
  const [dateFound, setDateFound] = useState("");
  const [founderName, setFounderName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [pictureURL, setPictureURL] = useState(""); // To store the image URL
  const [postType, setPostType] = useState("found"); // To store the selected post type (found or lost)
  const [isLostItemSubmitted, setIsLostItemSubmitted] = useState(false);

  const auth = getAuth();
  const db = getDatabase();
  const storage = getStorage();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Create a reference to the storage location where the file will be uploaded
      const storageLocation = storageRef(storage, `images/${file.name}`);

      // Upload the file to Firebase Storage
      uploadBytes(storageLocation, file)
        .then((snapshot) => {
          console.log("Image uploaded successfully");
          getDownloadURL(snapshot.ref) // Get the download URL of the uploaded image
            .then((downloadURL) => {
              setPictureURL(downloadURL); // Store the download URL in state
            })
            .catch((error) => {
              console.error("Error getting download URL: ", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading image: ", error);
        });
    }
  };

  const openCameraCapture = () => {
    const inputElement = document.querySelector('input[type="file"]');
    if (inputElement) {
      inputElement.setAttribute("capture", "camera");
      inputElement.click();
    }
  };


  const handleSubmit = () => {
    const requiredFields = {
      itemDescription,
      locationFound,
      dateFound,
      founderName,
      email,
      phoneNumber,
      address,
    };

    // Check if any of the required fields are empty
    const emptyFields = Object.keys(requiredFields).filter((field) => !requiredFields[field]);

    if (emptyFields.length > 0) {
      const emptyFieldNames = emptyFields.map((field) => field.charAt(0).toUpperCase() + field.slice(1));
      const errorMessage = `Please fill in the following fields: ${emptyFieldNames.join(", ")}.`;
      alert(errorMessage);
    } else {
      // All required fields are filled, proceed with posting the item
      const categoryPath = postType === "found" ? "foundItems" : "lostItems";
      const itemsRef = ref(db, categoryPath);
      const newItemRef = push(itemsRef);

      // Create the itemData object with all fields
      const itemData = {
        itemDescription,
        locationFound,
        dateFound,
        founderName,
        email,
        phoneNumber,
        address,
        category,
        pictureURL, // Use the stored image URL
      };

      set(newItemRef, itemData)
        .then(() => {
          // Successfully added to the database
          document.getElementById("post-item-form").reset();
          setItemDescription("");
          setLocationFound("");
          setDateFound("");
          setFounderName("");
          setEmail("");
          setPhoneNumber("");
          setAddress("");
          setCategory(categories[0]);
          setPictureURL(""); // Clear the picture URL
          if (postType === "lost") {
            // If a Lost item is submitted, set the state variable to show the message
            setIsLostItemSubmitted(true);
          }
        })
        .catch((error) => {
          console.error("Error adding item: ", error);
        });
    }
  };

  return (
    <div className="post">
     {auth.currentUser ? (
      <div className="post-an-item">
        
        <h2>Post a Found or Lost Item</h2>

          <div>
            <div className="radio-buttons">
              <label>
                <input
                  type="radio"
                  value="found"
                  checked={postType === "found"}
                  onChange={() => setPostType("found")}
                />
                Post Found Item
              </label>
              <label>
                <input
                  type="radio"
                  value="lost"
                  checked={postType === "lost"}
                  onChange={() => setPostType("lost")}
                />
                Post Lost Item
              </label>
            </div>
            <form id="post-item-form">
              <div className="form-group">
                <label>Item Description</label>
                <input type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Location Found</label>
                <input type="text" value={locationFound} onChange={(e) => setLocationFound(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Date Found</label>
                <input type="date" value={dateFound} onChange={(e) => setDateFound(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Founder Name</label>
                <input type="text" value={founderName} onChange={(e) => setFounderName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Upload Picture of Found Item</label>
                <input type="file" accept="image/*" onChange={handleFileUpload} />
                <button onClick={() => openCameraCapture()} className="captureCamera">Capture with Camera</button>

              </div>
            </form>
            <button className="post-button" onClick={handleSubmit}>
              Post
            </button>
            {isLostItemSubmitted && postType === "lost" && (
              <p>
                If your item is not found within 5 days, you can visit the website or<a href="https://saanjh49.ppsaanjh.in:4458/ppsaanjh/fir2_new.php"> click here </a>to register your FIR.
              </p>
            )}
          </div>
       
      </div>
       ) : (
        <p>Please Log in to post an item.</p>
      )}
    </div>
  );
}

export default Post;
