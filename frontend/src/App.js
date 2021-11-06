import { BiCalendar } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAppointment from "./components/AddAppointment";
import { AppointmentInfo } from "./components/AppointmentInfo";
import Search from "./components/Search";
import { useState, useEffect, useCallback } from "react";
import {
  deleteAptmnt,
  getAppointments,
  saveAppointment,
} from "./appointment/helper/appointmentApi";
import { CustomToast } from "./components/CustomToast";

function App() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("petName");
  const [orderBy, setOrderBy] = useState("asc");

  let filteredAppointmentList = appointmentList
    .filter((item) => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  const fetchData = useCallback(() => {
    getAppointments().then((data) => {
      if (data.error) {
        setAppointmentList([]);
        CustomToast(false, data.error);
      } else {
        setAppointmentList(data);
        CustomToast(true, data.msg);
      }
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /// Other methods

  const deleteAppointment = async (appointmentId) => {
    await deleteAptmnt(appointmentId).then((data) => {
      if (data.error) {
        CustomToast(false, data.error);
      } else {
        fetchData();
        CustomToast(true, data.msg);
      }
    });
  };

  const saveApt = async (myAppointment) => {
    return await saveAppointment(myAppointment).then((data) => {
      if (data.error) {
        CustomToast(false, data.msg);
        return false;
        // setAppointmentList([]);
      } else {
        console.log(data.msg);
        CustomToast(true, data.msg);
        fetchData();
        return true;
      }
    });
  };

  const onQueryChange = (myQuery) => {
    setQuery(myQuery);
  };

  /// Main UI
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <div className="mx-4">
        <ToastContainer autoClose={3000} limit={3} />

        <h1 className="text-5xl mb-3 flex justify-center">
          <BiCalendar className="inline-block align-top text-red-400" />
          Your Pet Appointments.
        </h1>
        <AddAppointment
          onSendAppointment={(myAppointment) => saveApt(myAppointment)}
        />
        <Search
          query={query}
          onQueryChange={onQueryChange}
          orderBy={orderBy}
          onOrderByChange={(mySort) => setOrderBy(mySort)}
          sortBy={sortBy}
          onSortByChange={(mySort) => setSortBy(mySort)}
        />

        <ul className="divide-y divide-gray-200">
          {filteredAppointmentList.length > 0
            ? filteredAppointmentList.map((appointment) => (
                <AppointmentInfo
                  key={appointment._id}
                  appointment={appointment}
                  deleteAppointment={deleteAppointment}
                />
              ))
            : "No Data Found"}
        </ul>
      </div>
    </div>
  );
}

export default App;
