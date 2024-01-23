import { useState } from "react";
import Form from "./Form";
import Results from "./Results";
import inmateData from "./Data";

const SearchContainer = () => {
  const [searchQuery, setSearchQuery] = useState({
    prison_number: "",
    last_name: "",
    first_name: "",
    middle_name: "",
    gender: "",
    birthdate: "",
    municipality: "",
    province: "",
    barangay: "",
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const resetForm = () => {
    setSearchQuery({
      prison_number: "",
      last_name: "",
      first_name: "",
      middle_name: "",
      gender: "",
      birthdate: "",
      municipality: "",
      province: "",
      barangay: "",
    });
    setSearchResults([]); // Clear search results
    setIsSearched(false); // Reset the search flag
  };

  const handleSearch = () => {
    const isEmptyQuery =
      Object.values(searchQuery).filter(Boolean).length === 0;

    if (isEmptyQuery) {
      setSearchResults([]); // Set empty array to trigger "No Data Found" message
      setIsSearched(true); // Set search flag to true
      return;
    }

    const results = inmateData.filter((inmate) => {
      for (let key in searchQuery) {
        if (
          searchQuery[key] &&
          key !== "birthdate" &&
          (!Object.prototype.hasOwnProperty.call(inmate, key) ||
            inmate[key]
              .toString()
              .toLowerCase()
              .indexOf(searchQuery[key].toLowerCase()) === -1)
        ) {
          return false;
        }

        if (key === "birthdate" && searchQuery[key]) {
          const formattedQueryDate = searchQuery[key].replace(/\//g, "");
          const formattedInmateDate = inmate[key].replace(/\//g, "");
          if (formattedInmateDate !== formattedQueryDate) {
            return false;
          }
        }
      }
      return true;
    });

    setSearchResults(results);
    setIsSearched(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "birthdate") {
      setSearchQuery((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setSearchQuery((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleBackToSearch = () => {
    setIsSearched(false);
    setSearchResults([]);
  };

  return (
    <div>
      {!isSearched ? (
        <Form
          searchQuery={searchQuery}
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
        />
      ) : (
        <Results
          searchResults={searchResults}
          handleBackToSearch={handleBackToSearch}
          resetForm={resetForm}
        />
      )}
    </div>
  );
};

export default SearchContainer;
