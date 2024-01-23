import bjmplogo from "../assets/BJMP LOGO.png";
import ndficon from "../assets/NoData.jpg";
import Logo from "../assets/Logo.png";
import image1 from "../assets/Group 1.png";
import image2 from "../assets/Group 2.png";
import image3 from "../assets/Group 3.png";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const { data, noDataFound = false } = location.state || {};
  const navigate = useNavigate();

  const resultStyle = {
    biometrics: `ml-[135px] mr-4 font-semibold capitalize`,
    numberDetail: `ml-[75px] mr-4 font-semibold`,
    nameDetail: `ml-[145px] mr-4 font-semibold capitalize`,
    genderDetail: `ml-[135px] mr-4 font-semibold`,
    birthDetail: `ml-[120px] mr-4 font-semibold`,
    municipalDetail: `ml-[100px] mr-4 font-semibold`,
    provinceDetail: `ml-[128px] mr-4 font-semibold`,
    barangayDetail: `ml-[123px] mr-4 font-semibold`,
    maritalDetail: `ml-[90px] mr-4 font-semibold capitalize`,
    ageDetail: `ml-[160px] mr-4 font-semibold`,
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <header className="w-full md:h-48 h-32 bg-sky-950 z-30">
        <div className="flex space-x-24 absolute overflow-hidden">
          <img src={image1} alt="Group 1" />
          <img src={image2} alt="Group 2" />
          <img src={image3} alt="Group 3" />
        </div>
        <div className="w-10/12 md:mt-24 mt-10 md:ml-28 ml-5 absolute top-0">
          <h2 className="text-lg text-zinc-400">
            PERSONS DEPRIVED OF LIBERTY MONITORING SYSTEM
          </h2>
          <h1 className="text-4xl text-white font-semibold">Inmate Search</h1>
        </div>
        <img
          src={bjmplogo}
          className="absolute md:top-[50px] md:right-14 w-64 md:w-72 right-0 top-[-15px]"
          alt="Logo"
        />
      </header>
      <div className="w-96 h-full ml-14 mt-20 ">
        <button
          className="absolute top-52 left-10 flex items-center"
          onClick={handleBackClick}
        >
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M13.707 16.293a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 1 1 1.414 1.414L8.414 10l5.293 5.293a1 1 0 0 1 0 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="text-xl">Back to Search</span>
        </button>
        {noDataFound ? (
          <div className="w-full h-full overflow-hidden flex flex-col items-center justify-center ml-20">
            <h1 className="text-5xl text-gray-500 mt-20 mb-3">
              No Data Found.
            </h1>
            <p className="text-2xl text-gray-500">Please try searching again</p>
          </div>
        ) : data && Object.keys(data).length > 0 ? (
          <ul className="flex flex-col gap-4 ml-14 w-full capitalize">
            <li className="capitalize">
              <span className={resultStyle.numberDetail}>Prison Number</span>#
              {data.prison_number}
            </li>
            <li className="capitalize">
              <span className={resultStyle.nameDetail}>Name</span>
              {`${data.last_name}, ${data.first_name}${
                data.middle_name ? ` ${data.middle_name[0]}.` : ""
              }`}
            </li>
            <li className="capitalize">
              <span className={resultStyle.ageDetail}>Age</span>
              {data.age}
            </li>
            <li className="capitalize">
              <span className={resultStyle.biometrics}>Height</span>
              {data.height} ft
            </li>
            <li className="capitalize">
              <span className={resultStyle.biometrics}>Weight</span>
              {data.weight} kg
            </li>
            <li className="capitalize">
              <span className={resultStyle.birthDetail}>Birthdate</span>
              {data.birthday}
            </li>
            <li className="capitalize">
              <span className={resultStyle.genderDetail}>Gender</span>
              {data.gender}
            </li>
            <li className="capitalize">
              <span className={resultStyle.provinceDetail}>Province</span>
              {data.province}
            </li>
            <li className="capitalize">
              <span className={resultStyle.municipalDetail}>Municipality</span>
              {data.municipality}
            </li>
            <li className="capitalize">
              <span className={resultStyle.barangayDetail}>Barangay</span>
              {data.barangay}
            </li>
            <li className="capitalize">
              <span className={resultStyle.maritalDetail}>Marital Status</span>
              {data.marital_status}
            </li>
            <div className="w-52 h-52 bg-sky-900 absolute top-60 right-1/4 flex flex-col justify-center items-center">
              <img
                src={data.image_url}
                alt="Inmate"
                className="w-full h-full object-cover"
              />
              <h1 className="absolute top-60 text-xl w-64 font-bold">
                Current Status{" "}
                <span className="text-red-600 font-semibold uppercase">
                  {data.status}
                </span>
              </h1>
              <div className="absolute flex items-center gap-5 top-72 w-72">
                <h1 className="text-xl font-bold">Release Date </h1>
                <h2 className="font-semibold">{data.release_date}</h2>
              </div>
            </div>
            <div className="absolute bottom-28 left-0 text-2xl w-screen">
              <h1 className="relative ml-[25rem]">
                Current Prison Sentence History
              </h1>
              <div className="bg-gray-200 text-gray-600 flex items-center justify-between text-sm px-10 uppercase font-semibold w-7/12 overflow-hidden mx-auto h-8 mt-2">
                <h1 className="">Sentence Date</h1>
                <h1 className="">Sentence Length</h1>
                <h1 className="">Case #</h1>
                <h1 className="">Offense Type</h1>
              </div>
              <div className="flex items-center justify-between text-md px-10 font-semibold w-7/12 overflow-hidden mx-auto h-8 mt-2">
                <h1 className="absolute left-[26rem]">{data.sentence_date}</h1>
                <h1 className="absolute left-[51rem]">
                  {data.sentence_length}
                </h1>
                <h1 className="absolute left-[71rem]">{data.case_number}</h1>
                <h1 className="absolute left-[88rem]">{data.offense_type}</h1>
              </div>
            </div>
          </ul>
        ) : (
          <h1 className="absolute left-32 text-xl">
            We found <span className="font-semibold">0 matches</span> for that
            inmate name.
          </h1>
        )}
      </div>
    </div>
  );
};

export default Results;
