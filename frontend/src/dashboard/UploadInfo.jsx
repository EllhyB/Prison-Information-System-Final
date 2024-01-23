import { Button, Select, Label, TextInput, Datepicker } from "flowbite-react";
import municipalities from "../areas/municipalities";
import barangays from "../areas/barangays";
import { useState } from "react";

const UploadInfo = () => {
  /* function uploading image*/
  const [image, setImage] = useState(null);
  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  /* function for selecting municipality */
  const [selectMunicipality, setSelectedMunicipality] = useState(
    municipalities[0],
  );

  const handleMunicipality = (e) => {
    setSelectedMunicipality(e.target.value);
  };

  /* function for selecting municipality */
  const [selectBarangay, setSelectedBarangay] = useState(barangays[0]);

  const handleBarangay = (e) => {
    setSelectedBarangay(e.target.value);
  };

  //function for selecting status
  const [selectStatus, setSelectedStatus] = useState();
  const handleStatus = (e) => {
    setSelectedStatus(e.target.value);
  };

  // function for submitting the form
  const submitForm = (e) => {
    e.preventDefault();

    const form = e.target;
    const last_name = form.last_name.value;
    const first_name = form.first_name.value;
    const middle_name = form.middle_name.value;
    const prison_number = form.prison_number.value;
    const age = form.age.value;
    const status = form.status.value;
    const gender = form.gender.value;
    const municipality = form.municipality.value;
    const province = form.province.value;
    const barangay = form.barangay.value;
    const weight = form.weight.value;
    const height = form.height.value;
    const marital_status = form.marital_status.value;
    const religion = form.religion.value;
    const release_date = form.release_date.value;
    const sentence_date = form.sentence_date.value;
    const sentence_length = form.sentence_length.value;
    const birthday = form.birthday.value;
    const offense_type = form.offense_type.value;
    const case_number = form.case_number.value;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("prison_number", prison_number);
    formData.append("last_name", last_name);
    formData.append("first_name", first_name);
    if (middle_name.trim() !== "") {
      formData.append("middle_name", middle_name);
    }
    formData.append("age", age);
    formData.append("status", status);
    formData.append("gender", gender);
    formData.append("municipality", municipality);
    formData.append("province", province);
    formData.append("barangay", barangay);
    formData.append("birthday", birthday);
    formData.append("religion", religion);
    formData.append("marital_status", marital_status);
    formData.append("weight", weight);
    formData.append("height", height);
    formData.append("release_date", release_date);
    formData.append("sentence_date", sentence_date);
    formData.append("sentence_length", sentence_length);
    formData.append("offense_type", offense_type);
    formData.append("case_number", case_number);

    console.log(formData);

    // fetching the data
    fetch("http://localhost:5000/upload-info", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Person info uploaded successfully!");
        // Clear the form and reset image state
        e.target.reset();
        setImage(null);
      })
      .catch((error) => {
        console.error("Error uploading person info:", error);
      });
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-stone-100 capitalize">
      <div className="pl-20 my-12 capitalize">
        <h2 className="mb-8 text-3xl font-bold">Upload Person Information</h2>
        <form
          className="flex lg:w-[1180px] flex-col flex-wrap"
          onSubmit={submitForm}
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
                <Select id="gender" required>
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
                  name="weight"
                  type="text"
                  placeholder="Enter Weight in kilograms(kg)"
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
                  name="height"
                  type="text"
                  placeholder="Enter Height in feet(ft)"
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
                  type="text"
                  placeholder="Enter Case Number"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="md:w-full absolute bottom-60 left-80">
                <div className="mb-2 block">
                  <Label
                    htmlFor="image"
                    value="Upload Image"
                    className="text-lg"
                  />
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

            <div className="absolute right-28 mb-10">
              <h3>Birthdate</h3>
              <Datepicker name="birthday" id="birthday" />
            </div>
          </div>

          <Button
            type="submit"
            className="w-48 mt-10 absolute bottom-44 bg-sky-900"
          >
            Upload Info
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UploadInfo;
