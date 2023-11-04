
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import "./Lost.css"; // Import your CSS file
import DetailsDialog from "./DetailsDialog";

const auth = getAuth();

function Lost() {
  const [foundItems, setFoundItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortedByDate, setSortedByDate] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const db = getDatabase();
        const itemsRef = ref(db, "foundItems");

        get(itemsRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const itemsArray = Object.values(data);

              const filteredItems = selectedCategory === "All"
                ? itemsArray
                : itemsArray.filter(item => item.category === selectedCategory);

              const sortedItems = sortedByDate
                ? filteredItems.sort((a, b) => (new Date(a.dateFound) > new Date(b.dateFound) ? 1 : -1))
                : filteredItems;

              setFoundItems(sortedItems);
            }
          })
          .catch((error) => {
            console.error("Error fetching lost items: ", error);
          });
      } else {
        setUser(null);
        setFoundItems([]);
      }
    });
  }, [selectedCategory, sortedByDate]);

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
    setOpenDialog(false);
  };

  return (
    <div className="lost">
      {user ? (
        <div>
          <div className="filter-bar">
            <label>
              Filter by Category:
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Phone">Phone</option>
                <option value="Watch">Watch</option>
                <option value="Laptop">Laptop</option>
                <option value="Earbuds">Earbuds</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Sort by Date:
              <input
                type="checkbox"
                checked={sortedByDate}
                onChange={() => setSortedByDate(!sortedByDate)}
              />
            </label>
          </div>
          <div className="list-items">
            {foundItems.map((item, index) => (
              <div className="card" key={index}>
                <img src={item.pictureURL} alt="lost Item" />
                <p>{item.itemDescription}</p>
                <button onClick={() => handleOpenDialog(item)}>Details</button>
              </div>
            ))}
          </div>
          <DetailsDialog open={openDialog} onClose={handleCloseDialog} item={selectedItem} />
        </div>
      ) : (
        <p>Please login to view Found items.</p>
      )}
    </div>
  );
}

export default Lost;
