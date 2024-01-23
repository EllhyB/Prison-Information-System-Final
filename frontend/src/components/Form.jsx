import bgImage from "../assets/bg.png";
import bjmpgma from "../assets/BJMPGMA.jpg";
import bjmplogo from "../assets/BJMP LOGO.png";
import { HiExclamation } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import TermsAndConditionsModal from "./Terms";
import image1 from "../assets/Group 1.png";
import image2 from "../assets/Group 2.png";
import image3 from "../assets/Group 3.png";

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { AuthContext } from "../contacts/AuthProvider";
import Filter from "./Filter";

const Form = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [agree, setAgree] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [searchOptions, setSearchOptions] = useState("Name");
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [duplicates, setDuplicates] = useState([]);
  const [applyFilter, setApplyFilter] = useState(false);
  const [formData, setFormData] = useState({
    prison_number: "",
    last_name: "",
    // middle_name: "",
    first_name: "",
  });

  const handleSearchOptions = (option) => {
    setSearchOptions(option);
  };

  const handleSelectPerson = (selectedPerson) => {
    navigate("/results", { state: { data: selectedPerson } });
  };

  const handleSearch = () => {
    const searchData = {
      prison_number: formData.prison_number.toLowerCase(),
      last_name: formData.last_name.toLowerCase(),
      // middle_name: formData.middle_name.toLowerCase(),
      first_name: formData.first_name.toLowerCase(),
    };

    if (!agree) {
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return;
    }

    fetch("http://localhost:5000/all-data", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter((person) => {
          if (searchOptions === "Name") {
            return (
              person.last_name.toLowerCase() === searchData.last_name &&
              // person.middle_name.toLowerCase() === searchData.middle_name &&
              person.first_name.toLowerCase() === searchData.first_name
            );
          } else if (searchOptions === "Prison Number") {
            return (
              person.prison_number.toLowerCase() === searchData.prison_number
            );
          }
          return false;
        });

        console.log("Filtered Data:", filteredData);

        const duplicateEntries = filteredData.filter(
          (person, index, self) =>
            self.filter(
              (p) =>
                p.first_name === person.first_name &&
                // p.middle_name === person.middle_name &&
                p.last_name === person.last_name,
            ).length > 1,
        );

        console.log("duplicate entries: ", duplicateEntries);

        if (duplicateEntries.length > 0) {
          setDuplicates(duplicateEntries);
          setApplyFilter(true); // Set applyFilter to true to show the Filter component
        } else if (filteredData.length > 0) {
          // If there are no duplicate entries, navigate to results
          navigate("/results", { state: { data: filteredData[0] } });
        } else {
          // Handle the case when no data matches the search criteria
          setApplyFilter(false); // Reset applyFilter
          navigate("/results", { state: { noDataFound: true } });
        }
      });
  };

  const handlePrisonNumber = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      prison_number: e.target.value,
    }));
  };

  const handleLastNameChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      last_name: e.target.value,
    }));
  };

  // const handleMiddleNameChange = (e) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     middle_name: e.target.value,
  //   }));
  // };

  const handleFirstNameChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      first_name: e.target.value,
    }));
  };

  const handleTerms = () => {
    setShowTerms(!showTerms);
    setShowModal(!showModal);
  };

  const handleAgreement = () => {
    setAgree(!agree);
  };

  useEffect(() => {
    //simulate initial loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  //styles the button of what option wants
  const isSelected = (options) => {
    return searchOptions === options ? "border-b-2 border-yellow-500" : "";
  };

  return (
    <>
      <div>
        {loading ? (
          <div className="flex items-center justify-center w-full h-screen transition duration-500 bg-sky-800">
            <Loader />
          </div>
        ) : (
          <div
            className="flex flex-col min-h-screen md:bg-cover overflow-hidden"
            style={{
              backgroundImage: `url(${bjmpgma})`,
            }}
          >
            <div
              className="absolute inset-0 z-10"
              style={{
                background: "linear-gradient(to top, #71717a , #164e63)",
                opacity: "0.7",
                mixBlendMode: "normal",
              }}
            ></div>
            <header className="w-full md:h-48 h-32 bg-sky-950 z-30 ">
              <div className="flex space-x-24 absolute overflow-hidden">
                <img src={image1} />
                <img src={image2} />
                <img src={image3} />
              </div>
              <div className="w-96 md:mt-24 mt-10 md:ml-28 ml-5 absolute top-0">
                <h2 className="md:text-lg text-sm text-zinc-400">
                  PERSONS DEPRIVED OF LIBERTY
                </h2>
                <h1 className="md:text-4xl text-3xl text-white font-semibold">
                  Inmate Search
                </h1>
              </div>
              {user && (
                <Link
                  to="/admin"
                  className="absolute top-8 left-28 text-2xl text-black rounded p-2 bg-yellow-300 hover:bg-yellow-600"
                >
                  Dashboard
                </Link>
              )}
              <img
                src={bjmplogo}
                className="absolute md:top-[50px] md:right-14 w-64 md:w-64 right-0 top-[-15px] "
              />
            </header>
            <div className="flex items-center justify-center z-30 mt-10">
              <div className="form-control w-1/2 md:ml-20 ml-5 mt-10 z-10 relative bg-stone-100/90 rounded-md">
                <h1 className="text-3xl font-semibold text-center my-3">
                  BJMP-GMA Inmate Search
                </h1>
                <h3 className="text-center mr-4 my-2">Search By:</h3>
                <div className="flex justify-center space-x-44 my-5 font-semibold">
                  <button
                    className={`uppercase focus:outline-none focus:ring-0 ${isSelected(
                      "Name",
                    )}`}
                    onClick={() => handleSearchOptions("Name")}
                  >
                    Name
                  </button>
                  <button
                    className={`uppercase focus:outline-none focus:ring-0 ${isSelected(
                      "Prison Number",
                    )}`}
                    onClick={() => handleSearchOptions("Prison Number")}
                  >
                    Prison Number
                  </button>
                </div>
                <div className="flex items-center justify-center px-5 space-x-14">
                  {searchOptions === "Name" ? (
                    <>
                      <div>
                        <input
                          autoComplete="off"
                          type="text"
                          name="last_name"
                          placeholder="Last Name"
                          className="input input-primary lg:w-full w-2/2 max-w-xs p-2 border-2 border-zinc-400 rounded-md"
                          value={formData.last_name}
                          onChange={handleLastNameChange}
                        />
                      </div>
                      <div>
                        <input
                          autoComplete="off"
                          type="text"
                          name="first_name"
                          placeholder="First Name"
                          className="input input-primary lg:w-full w-2/2 max-w-xs p-2 border-2 border-zinc-400 rounded-md"
                          value={formData.first_name}
                          onChange={handleFirstNameChange}
                        />
                      </div>
                    </>
                  ) : (
                    <div>
                      <input
                        autoComplete="off"
                        type="text"
                        name="prison_number"
                        placeholder="Enter Prison Number"
                        className="input input-bordered input-primary lg:w-full w-2/2 max-w-xs p-2 border-2 border-zinc-300 rounded-md"
                        value={formData.prison_number}
                        onChange={handlePrisonNumber}
                      />
                    </div>
                  )}
                  <button
                    onClick={handleSearch}
                    className="relative px-8 py-2 inline-flex rounded-md bg-amber-300 isolation-auto z-10 border-2 border-gray-500
        before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-amber-400 before:border-amber-300 before:-z-10  before:aspect-square before:hover:scale-150 gap-2 overflow-hidden before:hover:duration-700"
                  >
                    <BiSearchAlt size={25} />
                    <span className="text-lg">Search</span>
                  </button>
                </div>

                <div className="flex items-center justify-center mt-4">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 md:text-blue-500 text-yellow-300 focus:ring-current"
                    checked={agree}
                    onChange={handleAgreement}
                  />
                  <label htmlFor="agree" className="ml-2">
                    I agree to the{" "}
                    <button
                      onClick={handleTerms}
                      className="md:text-stone-600 text-yellow-300 hover:text-yellow-200 md:hover:text-sky-400 font-bold py-2 rounded"
                    >
                      User Agreements
                    </button>
                  </label>
                </div>
                {showAlert && (
                  <div className="fixed top-0 left-0 right-0 z-50 inline-flex items-center justify-center font-semibold bg-red-200 text-red-800 px-4 py-2">
                    <HiExclamation className="w-10" size={24} />
                    Please agree to the User Agreements.
                  </div>
                )}
                {showModal && <TermsAndConditionsModal onClose={handleTerms} />}
                <h3 className="text-center my-4">
                  For more information you may be obtained by requesting to
                  <span className="font-semibold"> PDL.bjmp@gmail.com</span>
                </h3>
                {/* {PrisonNumber searching} */}
                {/* Users Agreement checkbox and inline link */}
                {/* end of Users Agreement */}
                {/* end of dropdowns */}

                <div className="flex items-center justify-center mb-5">
                  {applyFilter && duplicates.length > 0 ? (
                    <Filter
                      duplicates={duplicates}
                      onSelect={handleSelectPerson}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="absolute bottom-10 text-center left-[650px] text-white px-5 space-x-5 z-10">
              <h2 className="font-bold text-2xl">Contact Us</h2>
              <span className="inline-flex items-center gap-1">
                <FaLocationDot color="#fbbf24" />
                General Mariano Alvarez, Cavite
              </span>
              <span className="inline-flex items-center gap-1">
                <FaPhoneAlt color="#fbbf24" />
                +639981319207
              </span>
              <span className="inline-flex items-center gap-1">
                <IoIosMail color="#fbbf24" />
                PDL.bjmp@gmail.com
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Form;
