const styles = {
  filterContainer: {
    backgroundColor: "#fff",
    color: "white",
    padding: "1rem",
    borderRadius: "0.5rem",
    marginTop: "1rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    width: "800px",
  },
  listItem: {
    flexDirection: "column",
    cursor: "pointer",
    padding: "0.5rem",
    borderBottom: "1px solid #E2E8F0",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#F7FAFC",
    },
  },
};

const Filter = ({ duplicates, onSelect }) => {
  return (
    <div style={styles.filterContainer} className="filter-container">
      <h3 className="text-xl font-semibold mb-4 text-black">
        Multiple Matches Found
      </h3>
      <div className="flex flex-col">
        <div className="flex bg-sky-950">
          <span className="flex-1 text-center font-semibold">Name</span>
          <span className="flex-1 text-center font-semibold">
            Prison Number
          </span>
          <span className="flex-1 text-center font-semibold">Photo</span>
          <span className="flex-1 text-center font-semibold">Status</span>
          <span className="flex-1 text-center font-semibold">Age</span>
        </div>
        <ul>
          {duplicates.map((person, index) => (
            <li
              key={`person_key${person.id || index}`}
              style={styles.listItem}
              onClick={() => onSelect(person)}
              className="capitalize text-black hover:text-blue-900"
            >
              {/* Render the details for each person */}
              <div className="flex hover:bg-amber-300 rounded-md">
                <span className="flex-1 flex items-center justify-center">
                  {`${person.first_name} ${person.middle_name || ""} ${
                    person.last_name
                  }`}
                </span>
                <span className="flex-1 flex items-center justify-center">
                  {person.prison_number}
                </span>
                <span className="flex-1 flex items-center justify-center">
                  <img src={person.image_url} />
                </span>
                <span className="flex-1 flex items-center justify-center">
                  {person.status}
                </span>
                <span className="flex-1 flex items-center justify-center">
                  {person.age}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;
