import { Link } from "react-router-dom";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";

const ManageInfo = () => {
  const [allInfo, setAllInfo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-data")
      .then((res) => res.json())
      .then((data) => setAllInfo(data));
  }, []);

  //delete a person data
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/person/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((person) => {
        alert("Person's data has been deleted.");
        // setAllInfo(person);
      });
  };

  const sortedAllInfo = allInfo.sort((a, b) => {
    // Assuming prison_number is a string containing numbers with leading zeros
    const prisonNumberA = parseInt(a.prison_number, 10);
    const prisonNumberB = parseInt(b.prison_number, 10);

    return prisonNumberA - prisonNumberB;
  });

  return (
    <div className="pl-20 w-screen h-screen bg-stone-100">
      <div className="px-4 my-12">
        <h2 className="mb-8 text-3xl font-bold">Manage Information</h2>
        {/* table for inmate informations */}
        <Table className="lg:w-[1180px]">
          <Table.Head>
            <Table.HeadCell>Prison Number</Table.HeadCell>
            <Table.HeadCell>Photo</Table.HeadCell>
            <Table.HeadCell>Last Name</Table.HeadCell>
            <Table.HeadCell>First Name</Table.HeadCell>
            <Table.HeadCell>Middle Name</Table.HeadCell>
            <Table.HeadCell>Gender</Table.HeadCell>
            <Table.HeadCell>Birth Date</Table.HeadCell>
            <Table.HeadCell>Municipality</Table.HeadCell>
            <Table.HeadCell>Province</Table.HeadCell>
            <Table.HeadCell>Barangay</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit or Manage</span>
            </Table.HeadCell>
          </Table.Head>
          {sortedAllInfo.map((data) => (
            <Table.Body className="divide-y" key={data._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                  {data.prison_number}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                  <img src={data.image_url} />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                  {data.last_name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                  {data.first_name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                  {data.middle_name ? data.middle_name : "N/A"}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                  {data.gender}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                  {data.birthday}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                  {data.municipality}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                  {data.province}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                  {data.barangay}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                  {data.status}
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/admin/dashboard/edit/${data._id}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600"
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
          <Table.Body className="divide-y"></Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default ManageInfo;
