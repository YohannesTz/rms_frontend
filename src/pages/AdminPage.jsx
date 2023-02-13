import React, { useEffect, useState, useRef } from "react";
import { Table, Tabs, Button, Checkbox } from "flowbite-react";
import { useAuthStore } from "../store/authStore";
import util from "../util/util.json";
import Lottie from "lottie-react";
import notFoundAnimation from "../assets/empty_ghost.json";
import unAuthorizedAnimation from "../assets/unauthorized_error.json";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";

const style = {
  height: 350,
  width: 350,
};

const AdminPage = () => {
  const authData = useAuthStore((state) => state.authData);
  const baseUrl = util.baseUrl;
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isRoomsLoading, setIsRoomsLoading] = useState(false);
  const [isReservationsLoading, setIsReservationsLoading] = useState(false);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef(null);

  if (Object.keys(authData).length == 0 || authData.role != "admin") {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <div className="flex flex-row justify-center">
            <Lottie
              animationData={unAuthorizedAnimation}
              style={style}
              loop={true}
            />
          </div>

          <p className="text-2xl text-gray-800 text-center">
            Oops! seems like your are not allowed to see this page
          </p>
          <div className="flex flex-row my-6 justify-center">
            <div className="py-0">
              <Button size="xs" pill href="/get-started">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const EmptyComponent = () => {
    return (
      <div className="m-auto">
        <Lottie animationData={notFoundAnimation} style={style} loop={true} />
        <p className="text-xl text-gray-800 text-center">
          Oops! seems like you don't have any rooms listed
        </p>
        <div className="flex flex-row my-6 justify-center">
          <div className="py-0">
            <Button size="xs" pill href="/">
              Return Home
            </Button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (activeTab === 0) {
      setIsUsersLoading(true);
      axios
        .get(baseUrl + "/api/users?skip=0&take=20")
        .then((response) => {
          setUsers(response.data.data.users);
          setIsUsersLoading(false);
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
          setIsUsersLoading(false);
        });
    } else if (activeTab === 1) {
      setIsRoomsLoading(true);
      axios
        .get(baseUrl + "/api/rooms?skip=0&take=20")
        .then((response) => {
          setRooms(response.data.data.rooms);
          setIsRoomsLoading(false);
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
          setIsRoomsLoading(false);
        });
    } else if (activeTab === 2) {
      setIsReservationsLoading(true);
      axios
        .get(baseUrl + "/api/reservations?skip=0&take=20")
        .then((response) => {
          setReservations(response.data.data.reservations);
          setIsReservationsLoading(false);
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
          setIsReservationsLoading(false);
        });
    } else if (activeTab === 3) {
      setIsContactLoading(true);
      axios
        .get(baseUrl + "/api/contacts?skip=0&take=20")
        .then((response) => {
          setContacts(response.data.data.contacts);
          setIsContactLoading(false);
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
          setIsContactLoading(false);
        });
    }
  }, [activeTab]);

  return (
    <div>
      <div className="flex flex-row gap-3 flex-wrap my-6 justify-center">
        <div className="text-gray-700 text-left whitespace-break-normal justify-center ">
          <p className="text-2xl">Hi Admin, Welcome...</p>
        </div>
      </div>

      <div className="flex-1 flex-col md:px-10">
        <Tabs.Group
          aria-label="Pills"
          style="underline"
          ref={tabsRef}
          onActiveTabChange={(tab) => setActiveTab(tab)}
        >
          <Tabs.Item active={true} title="Users">
            <div className="flex flex-col h-screen">
              {isUsersLoading && (
                <div className="flex flex-row my-10 justify-center">
                  <SpinnerCircular
                    size={58}
                    thickness={100}
                    speed={100}
                    color="rgba(58, 0, 162, 1)"
                    secondaryColor="rgba(0, 0, 0, 0.44)"
                  />
                </div>
              )}
              {!isUsersLoading && users.length == 0 ? (
                <EmptyComponent />
              ) : (
                <Table>
                  <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>First Name</Table.HeadCell>
                    <Table.HeadCell>Last Name</Table.HeadCell>
                    <Table.HeadCell>Phone number</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {users.length > 0 &&
                      users.map((userItem) => {
                        return (
                          <Table.Row key={userItem.id.toString()}>
                            <Table.Cell>{userItem.id}</Table.Cell>
                            <Table.Cell>{userItem.firstName}</Table.Cell>
                            <Table.Cell>{userItem.lastName}</Table.Cell>
                            <Table.Cell>{userItem.phonenumber}</Table.Cell>
                            <Table.Cell>{userItem.role}</Table.Cell>
                          </Table.Row>
                        );
                      })}
                  </Table.Body>
                </Table>
              )}
            </div>
          </Tabs.Item>
          <Tabs.Item title="Rooms">
            <div className="flex flex-col h-screen">
              {isRoomsLoading && (
                <div className="flex flex-row my-10 justify-center">
                  <SpinnerCircular
                    size={58}
                    thickness={100}
                    speed={100}
                    color="rgba(58, 0, 162, 1)"
                    secondaryColor="rgba(0, 0, 0, 0.44)"
                  />
                </div>
              )}
              {!isRoomsLoading && rooms.length == 0 ? (
                <EmptyComponent />
              ) : (
                <Table>
                  <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Home Type</Table.HeadCell>
                    <Table.HeadCell>Total Occupancy</Table.HeadCell>
                    <Table.HeadCell>Price</Table.HeadCell>
                    <Table.HeadCell>Address</Table.HeadCell>
                    <Table.HeadCell>Is Available?</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {rooms.length > 0 &&
                      rooms.map((roomItem) => {
                        return (
                          <Table.Row key={roomItem.id.toString()}>
                            <Table.Cell>{roomItem.id}</Table.Cell>
                            <Table.Cell>{roomItem.home_type}</Table.Cell>
                            <Table.Cell>{roomItem.total_occupancy}</Table.Cell>
                            <Table.Cell>{roomItem.price}</Table.Cell>
                            <Table.Cell>{roomItem.address}</Table.Cell>
                            <Table.Cell>
                              <Checkbox
                                disabled={true}
                                checked={roomItem.is_available}
                              />
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                  </Table.Body>
                </Table>
              )}
            </div>
          </Tabs.Item>
          <Tabs.Item title="Reservations">
            <div className="flex flex-col h-screen">
              {isReservationsLoading && (
                <div className="flex flex-row my-10 justify-center">
                  <SpinnerCircular
                    size={58}
                    thickness={100}
                    speed={100}
                    color="rgba(58, 0, 162, 1)"
                    secondaryColor="rgba(0, 0, 0, 0.44)"
                  />
                </div>
              )}
              {!isReservationsLoading && reservations.length == 0 ? (
                <EmptyComponent />
              ) : (
                <Table>
                  <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>User Id</Table.HeadCell>
                    <Table.HeadCell>Room Id</Table.HeadCell>
                    <Table.HeadCell>Total price</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Lord Id</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {reservations.length > 0 &&
                      reservations.map((reservationsItem) => {
                        return (
                          <Table.Row key={reservationsItem.id.toString()}>
                            <Table.Cell>{reservationsItem.id}</Table.Cell>
                            <Table.Cell>{reservationsItem.userId}</Table.Cell>
                            <Table.Cell>{reservationsItem.roomId}</Table.Cell>
                            <Table.Cell>
                              {reservationsItem.total_price}
                            </Table.Cell>
                            <Table.Cell>
                              {reservationsItem.status.split(";")[0]}
                            </Table.Cell>
                            <Table.Cell>{reservationsItem.lordId}</Table.Cell>
                          </Table.Row>
                        );
                      })}
                  </Table.Body>
                </Table>
              )}
            </div>
          </Tabs.Item>
          <Tabs.Item title="Support Requests">
            <div className="flex flex-col h-screen">
              {isContactLoading && (
                <div className="flex flex-row my-10 justify-center">
                  <SpinnerCircular
                    size={58}
                    thickness={100}
                    speed={100}
                    color="rgba(58, 0, 162, 1)"
                    secondaryColor="rgba(0, 0, 0, 0.44)"
                  />
                </div>
              )}
              {!isContactLoading && contacts.length == 0 ? (
                <EmptyComponent />
              ) : (
                <Table>
                  <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>PhoneNumber</Table.HeadCell>
                    <Table.HeadCell>Telegram UserName</Table.HeadCell>
                    <Table.HeadCell>Note</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {contacts.length > 0 &&
                      contacts.map((contactsItem) => {
                        return (
                          <Table.Row key={contactsItem.id.toString()}>
                            <Table.Cell>{contactsItem.id}</Table.Cell>
                            <Table.Cell>{contactsItem.name}</Table.Cell>
                            <Table.Cell>{contactsItem.email}</Table.Cell>
                            <Table.Cell>{contactsItem.phonenumber}</Table.Cell>
                            <Table.Cell>
                              {contactsItem.telegram_username}
                            </Table.Cell>
                            <Table.Cell>{contactsItem.note}</Table.Cell>
                          </Table.Row>
                        );
                      })}
                  </Table.Body>
                </Table>
              )}
            </div>
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  );
};

export default AdminPage;
