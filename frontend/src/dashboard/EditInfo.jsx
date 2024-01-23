import { Button, Select, Label, TextInput, Datepicker } from "flowbite-react";
import { useParams, useLoaderData } from "react-router-dom";
import { useState } from "react";
import barangays from "../areas/barangays";
import municipalities from "../areas/municipalities";

const EditInfo = () => {
  const { id } = useParams();
  const {
    prison_number,
    last_name,
    middle_name,
    first_name,
    age,
    gender,
    municipality,
    province,
    barangay,
    religion,
    release_date,
    sentence_length,
    sentence_date,
    offense_type,
    birthday,
    case_number,
    status,
    weight,
    height,
    marital_status,
  } = useLoaderData();

  const loaderData = useLoaderData();
  console.log(loaderData);
  /* function for selecting municipality */
  const [selectMunicipality, setSelectedMunicipality] = useState(
    municipalities[0],
  );
  const handleMunicipality = (e) => {
    setSelectedMunicipality(e.target.value);
  };

  // function for handling image upload
  const [image, setImage] = useState(null);
  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  //function for selecting status
  const [selectStatus, setSelectedStatus] = useState();
  const handleStatus = (e) => {
    setSelectedStatus(e.target.value);
  };

  /* function for selecting municipality */
  const [selectBarangay, setSelectedBarangay] = useState(barangays[0]);
  const handleBarangay = (e) => {
    setSelectedBarangay(e.target.value);
  };

  // function for submitting the form
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const form = e.target;
      const prison_number = form.prison_number.value;
      const last_name = form.last_name.value;
      const first_name = form.first_name.value;
      const middle_name = form.middle_name.value;
      const gender = form.gender.value;
      const municipality = form.municipality.value;
      const province = form.province.value;
      const barangay = form.barangay.value;
      const birthday = form.birthday.value;
      const age = form.age.value;
      const status = form.status.value;
      const marital_status = form.marital_status.value;
      const religion = form.religion.value;
      const sentence_date = form.sentence_date.value;
      const sentence_length = form.sentence_length.value;
      const offense_type = form.offense_type.value;
      const case_number = form.case_number.value;

      const updatePersonInfo = {
        prison_number,
        last_name,
        first_name,
        middle_name,
        gender,
        municipality,
        province,
        barangay,
        birthday,
        age,
        status,
        marital_status,
        religion,
        sentence_length,
        sentence_date,
        offense_type,
        case_number,
      };

      // Create FormData and append the image
      const formData = new FormData();
      formData.append("image", image);
      formData.append("updatePersonInfo", JSON.stringify(updatePersonInfo));

      // Fetch to upload image to Cloudinary and update person info
      const response = await fetch(`http://localhost:5000/person/${id}`, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Person info updated successfully!");
      } else {
        console.error("Error updating person info:", response.statusText);
        alert("Failed to update person info.");
      }
    } catch (error) {
      console.error("Error updating person info:", error);
      alert("Internal Server Error");
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-stone-100 capitalize">
      <div className="pl-20 my-12 capitalize">
        <h2 className="mb-8 text-3xl font-bold">Update Person Information</h2>
        <form
          className="flex lg:w-[1180px] flex-col flex-wrap"
          onSubmit={handleUpdate}
        >
          {/* input container */}
          <div className="flex space-x-52">
            <div>
              <div className="lg:w-full">
                <div className="mb-2 block">
                  <Label htmlFor="prison_number" value="Prison Number" />
                </div>
                <TextInput
                  className="capitalize"
                  id="prison_number"
                  name="prison_number"
                  type="text"
                  placeholder="Enter Prison Number"
                  required
                  defaultValue={prison_number}
                  autoComplete="off"
                />
              </div>
              {/* last name */}
              <div className="lg:w-full capitalize">
                <div className="mb-2 block">
                  <Label htmlFor="last_name" value="Last Name" />
                </div>
                <TextInput
                  className="capitalize"
                  id="last_name"
                  name="last_name"
                  type="text"
                  defaultValue={last_name}
                  placeholder="Enter Last Name"
                  required
                  autoComplete="off"
                />
              </div>
              {/* first name */}
              <div className="lg:w-full capitalize">
                <div className="mb-2 block">
                  <Label htmlFor="first_name" value="First Name" />
                </div>
                <TextInput
                  className="capitalize"
                  id="first_name"
                  defaultValue={first_name}
                  name="first_name"
                  type="text"
                  placeholder="Enter First Name"
                  required
                  autoComplete="off"
                />
              </div>

              {/* middle name */}
              <div className="lg:w-full capitalize">
                <div className="mb-2 block">
                  <Label htmlFor="middle_name" value="Middle Name" />
                </div>
                <TextInput
                  className="capitalize"
                  id="middle_name"
                  defaultValue={middle_name}
                  name="middle_name"
                  type="text"
                  placeholder="Enter Middle Name"
                  autoComplete="off"
                />
              </div>

              {/* age */}
              <div className="lg:w-full">
                <div className="mb-2 block">
                  <Label htmlFor="age" value="Age" />
                </div>
                <TextInput
                  className="capitalize"
                  id="age"
                  defaultValue={age}
                  name="age"
                  type="text"
                  placeholder="Enter Age"
                  required
                  autoComplete="off"
                />
              </div>

              {/* marital_status */}
              <div className="lg:w-full">
                <div className="mb-2 block">
                  <Label htmlFor="marital_status" value="Marital Status" />
                </div>
                <TextInput
                  className="capitalize"
                  id="marital_status"
                  defaultValue={marital_status}
                  name="marital_status"
                  type="text"
                  placeholder="Enter Marital Status"
                  required
                  autoComplete="off"
                />
              </div>

              {/* select gender */}
              <div className="max-w-xs">
                <div className="mb-2 block">
                  <Label htmlFor="gender" value="Select your gender" />
                </div>
                <Select id="gender" defaultValue={gender} required>
                  <option>Male</option>
                  <option>Female</option>
                </Select>
              </div>
            </div>

            <div>
              {/* municipality */}
              <div className="lg:w-full">
                <div className="mb-2 block">
                  <Label htmlFor="inputState" value="Municipality" />
                </div>
                <Select
                  id="inputState"
                  name="municipality"
                  defaultValue={municipality}
                  className="w-full rounded"
                  value={selectMunicipality}
                  onChange={handleMunicipality}
                >
                  {municipalities.map((municipality) => (
                    <option key={municipality}>{municipality}</option>
                  ))}
                </Select>
              </div>

              {/* barangay */}
              <div className="lg:w-full">
                <div className="mb-2 block">
                  <Label htmlFor="inputState" value="Barangay" />
                </div>
                <Select
                  id="inputState"
                  defaultValue={barangay}
                  name="barangay"
                  className="w-full rounded"
                  value={selectBarangay}
                  onChange={handleBarangay}
                >
                  {barangays.map((barangay) => (
                    <option key={barangay}>{barangay}</option>
                  ))}
                </Select>
              </div>

              {/* province */}
              <div className="lg:w-full">
                <div className="mb-2 block">
                  <Label htmlFor="inputState" value="Province" />
                </div>
                <Select
                  defaultValue={province}
                  id="inputState"
                  name="province"
                  className="w-full rounded"
                  value="Cavite"
                >
                  <option>Cavite</option>
                </Select>
              </div>

              {/* status */}
              <div className="lg:w-full">
                <div className="mb-2 block">
                  <Label htmlFor="inputState" value="Status" />
                </div>
                <Select
                  id="inputState"
                  name="status"
                  defaultValue={status}
                  className="w-full rounded"
                  value={selectStatus}
                  onChange={handleStatus}
                >
                  <option>Prisoner</option>
                  <option>Released</option>
                </Select>
              </div>

              {/* weight */}
              <div className="lg:w-full">
                <div className="mb-2 block">
                  <Label htmlFor="weight" value="Weight" />
                </div>
                <TextInput
                  className="capitalize"
                  id="weight"
                  defaultValue={weight}
                  name="weight"
                  type="text"
                  placeholder="Enter Weight in kilograms"
                  required
                  autoComplete="off"
                />
              </div>

              {/* height */}
              <div className="lg:w-full">
                <div className="mb-2 block">
                  <Label htmlFor="height" value="Height" />
                </div>
                <TextInput
                  className="capitalize"
                  id="height"
                  defaultValue={height}
                  name="height"
                  type="text"
                  placeholder="Enter Height in feet"
                  required
                  autoComplete="off"
                />
              </div>

              {/* religion */}
              <div className="lg:w-full">
                <div className="mb-2 block">
                  <Label htmlFor="religion" value="Religion" />
                </div>
                <TextInput
                  className="capitalize"
                  id="religion"
                  defaultValue={religion}
                  name="religion"
                  type="text"
                  placeholder="Enter Religion"
                  required
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Birthdate Section */}
            <div>
              {/* release date */}
              <div className="lg:w-full">
                <div className="mb-2 block">
                  <Label htmlFor="release_date" value="Release Date" />
                </div>
                <TextInput
                  className="capitalize"
                  id="release_date"
                  name="release_date"
                  defaultValue={release_date}
                  type="text"
                  placeholder="Enter Release Date"
                  required
                  autoComplete="off"
                />
              </div>

              {/* sentence date */}
              <div className="lg:w-full">
                <div className="mb-2 block">
                  <Label htmlFor="sentence_date" value="Sentence Date" />
                </div>
                <TextInput
                  className="capitalize"
                  id="sentence_date"
                  defaultValue={sentence_date}
                  name="sentence_date"
                  type="text"
                  placeholder="Enter Sentence Date"
                  required
                  autoComplete="off"
                />
              </div>

              {/* sentence length */}
              <div className="lg:w-full">
                <div className="mb-2 block">
                  <Label htmlFor="sentence_length" value="Sentence Length" />
                </div>
                <TextInput
                  className="capitalize"
                  defaultValue={sentence_length}
                  id="sentence_length"
                  name="sentence_length"
                  type="text"
                  placeholder="Enter Sentence Length"
                  required
                  autoComplete="off"
                />
              </div>

              {/* offense_type  */}
              <div className="lg:w-full">
                <div className="mb-2 block">
                  <Label htmlFor="offense_type" value="Offense Type" />
                </div>
                <TextInput
                  className="capitalize"
                  id="offense_type"
                  defaultValue={offense_type}
                  name="offense_type"
                  type="text"
                  placeholder="Enter Offense Type"
                  required
                  autoComplete="off"
                />
              </div>

              {/* case_number  */}
              <div className="lg:w-full">
                <div className="mb-2 block">
                  <Label htmlFor="case_number" value="Case Number" />
                </div>
                <TextInput
                  className="capitalize"
                  id="case_number"
                  name="case_number"
                  defaultValue={case_number}
                  type="text"
                  placeholder="Enter Case Number"
                  required
                  autoComplete="off"
                />
              </div>

              <h3>Birthdate</h3>
              <div className="mt-4 mb-10">
                <Datepicker
                  name="birthday"
                  id="birthday"
                  defaultValue={birthday}
                />
              </div>

              <div className="lg:w-full">
                <div className="mb-2 block">
                  <Label htmlFor="image" value="Upload Image" />
                </div>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-48 mt-10 bg-stone-800">
            Update Info
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditInfo;
