import { useState } from "react";
import { Table, Badge, Dropdown } from "flowbite-react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaEye, FaBan, FaTimes, FaDollarSign, FaComments } from "react-icons/fa";

const UsersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 20;

  const usersData = Array.from({ length: 50 }, (_, index) => ({
    userId: `U-${index + 1}`,
    username: `User${index + 1}`,
    email: `user${index + 1}@example.com`,
    country: ["USA", "Canada", "UK", "Germany", "India"][index % 5],
    status: index % 2 === 0 ? "Verified" : "Not Verified",
    joined: `202${index % 10}-01-01`,
    dob: `199${index % 10}-05-15`,
    fullName: `Full Name ${index + 1}`,
  }));

  const totalPages = Math.ceil(usersData.length / itemsPerPage);
  const paginatedData = usersData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  type User = {
    userId: string;
    username: string;
    email: string;
    country: string;
    status: string;
    joined: string;
    dob: string;
    fullName: string;
  };
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    window.history.pushState({}, "", `?tab=${user.userId}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    window.history.pushState({}, "", window.location.pathname);
  };

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex justify-between items-center mb-4">
        <h5 className="card-title">USERS</h5>
        <input
          type="text"
          placeholder="Search user by Id"
          className="border border-gray-300 dark:border-darkborder rounded-lg p-2 w-[250px]"
        />
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>UserId</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Country</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-border dark:divide-darkborder">
            {paginatedData.map((user, index) => (
              <Table.Row key={index}>
                <Table.Cell>{user.userId}</Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.country}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <Badge
                    className={`${
                      user.status === "Verified"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                        <HiOutlineDotsVertical size={22} />
                      </span>
                    )}
                  >
                    <Dropdown.Item
                      className="flex gap-2 items-center"
                      onClick={() => handleViewUser(user)}
                    >
                      <FaEye />
                      <span>View</span>
                    </Dropdown.Item>
                    <Dropdown.Item className="flex gap-2 items-center">
                      <FaBan />
                      <span>Disable</span>
                    </Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white"
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white"
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-darkgray rounded-xl p-6 w-[500px] relative shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              <FaTimes size={20} />
            </button>
            <h5 className="text-center text-lg font-bold mb-4">PROFILE DETAILS</h5>
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-xl font-bold">{selectedUser.username[0]}</span>
              </div>
              <h6 className="text-lg font-semibold">{selectedUser.username}</h6>
            </div>
            {/* Cards Section */}
            <div className="flex justify-between gap-4 mb-6 bg-gray-100 dark:bg-darkgray p-4 rounded-lg shadow">
              <div className="flex items-center gap-2">
                <FaDollarSign size={20} className="text-green-500" />
                <div className="text-center">
                  <p className="text-sm font-semibold">Wager</p>
                  <p className="text-lg font-bold">$1,200</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaDollarSign size={20} className="text-blue-500" />
                <div className="text-center">
                  <p className="text-sm font-semibold">Total Balance</p>
                  <p className="text-lg font-bold">$500</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaComments size={20} className="text-purple-500" />
                <div className="text-center">
                  <p className="text-sm font-semibold">Total Chats</p>
                  <p className="text-lg font-bold">45</p>
                </div>
              </div>
            </div>
            {/* Full Card Section */}
            <div className="bg-gray-100 dark:bg-darkgray p-4 rounded-lg shadow mb-4">
              <div className="flex justify-between">
                <p className="font-semibold">Full Name</p>
                <p>{selectedUser.fullName}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Email</p>
                <p>{selectedUser.email}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Date of Birth</p>
                <p>{selectedUser.dob}</p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-darkgray p-4 rounded-lg shadow">
              <div className="flex justify-between">
                <p className="font-semibold">Country</p>
                <p>{selectedUser.country}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Status</p>
                <p>{selectedUser.status}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Joined</p>
                <p>{selectedUser.joined}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;