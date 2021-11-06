import { API } from "../../backend";

export const getAppointments = async () => {
  //   cPrint(JSON.stringify(user));
  //   console.log(`${API}/apt`);
  try {
    const response = await fetch(`${API}/apt`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    // console.log(response.json());
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const saveAppointment = async (apt) => {
  try {
    const response = await fetch(`${API}/saveApt`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(apt),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const deleteAptmnt = async (id) => {
  try {
    const response = await fetch(`${API}/delete/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
